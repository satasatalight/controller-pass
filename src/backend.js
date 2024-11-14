import { ExtensionAuthProvider } from "@twurple/auth-ext";
import { ApiClient } from "@twurple/api";

let apiClient;

let currentUser;
let lastUser;
let lastLink;
let errorStatus = 0; // 0 = both invalid, 1 = parsec valid, 2 = username valid, 3 = both valid

let parsecInput;
let userInput;
let connectButton;
let disconnectButton;

window.onload = () => {
    fetch("http://localhost:3000/api/message")
        .then((response) => response.json())
            .then((json) => console.log(json.message));

    parsecInput      = document.getElementById("parsec");
    userInput        = document.getElementById("username");
    connectButton    = document.getElementById("connectButton");
    disconnectButton = document.getElementById("disconnectButton");

    parsecInput.addEventListener        ("input", checkParsecLink);
    userInput.addEventListener          ("input", checkUsername);
    connectButton.addEventListener      ("click", connect);
    disconnectButton.addEventListener   ("click", disconnect);
}

window.Twitch.ext.onAuthorized(function(auth) {
    let authProvider    = new ExtensionAuthProvider(auth.clientId);
    apiClient           = new ApiClient({authProvider});
});




async function connect(){
    if(errorStatus != 3) return; // just in case

    let parsecLink      = parsecInput.value;
    let splitLink       = parsecLink.split('/');

    if(lastUser){
        disconnect();
    }
    
    // window.Twitch.ext.send("whisper-U" + currentUser.id , "application/json", 
    //     {header: "controller-pass", status: "connect", peerId: splitLink[4], hostSecret: splitLink[5]});
    
    // lastUser = currentUser;
    // lastLink = parsecLink;
    
    // error("parsec", "refresh-your-invite-link", "Refresh your invite link!");
    // enableDisconnectButton();
}

function disconnect() {
    if(!lastUser) return; // just in case

    window.Twitch.ext.send("whisper-U" + lastUser.id , "application/json", 
        {header: "controller-pass", status: "disconnect"});
    
    lastUser = null;

    disableDisconnectButton();
}

function enableDisconnectButton(){
    disconnectButton.classList.remove("disabled");
    disconnectButton.classList.add("red");
    disconnectButton.classList.add("darken-4");
}

function disableDisconnectButton(){
    disconnectButton.blur();
    disconnectButton.classList.add("disabled");
    disconnectButton.classList.remove("red");
    disconnectButton.classList.remove("darken-4");
}




function checkParsecLink(element){
    let link            = element.currentTarget.value
    let weirdCharacters = /([ ,!?@#$%^&*()\\`~_\-+=[\]{};'"<>|])+/g;
    let parsecURL       = /^(https:\/\/parsec.gg\/g\/)+/g;
    let splitLink       = link.split('/');

    // checking for weird characters
    if(weirdCharacters.test(link)){
        error("parsec", "dont-include-weird-characters", "Don\'t include weird characters!");
    }
    // checking for 'https://parsec.gg/g/' at beginning
    else if(!parsecURL.test(link)){
        error("parsec", "link-doesnt-start-with-httpsparsecggg", "Link doesn't start with 'https://parsec.gg/g/'!");
    }
    // checking link formatting
    else if(splitLink.length != 7){
        error("parsec", "invalid-link-format", "Invalid link format!");
    }
    else if(splitLink[4].length != 27 || splitLink[5].length != 8){
        error("parsec", "invalid-link-format", "Invalid link format!");
    }
    // checking for new link
    else if(link == lastLink){
        error("parsec", "refresh-your-invite-link", "Refresh your invite link!");
    }
    else{
        clearError("parsec");
    }
}

async function checkUsername(element){
    let username         = element.currentTarget.value
    let bannedCharacters = /^[a-zA-Z0-9_]{4,25}$/g;

    // check for valid username
    if(!bannedCharacters.test(username)){
        error("username", "invalid-username", "Invalid username!");
        return;
    }

    currentUser = await apiClient.users.getUserByName(username);

    // check if user is found by twitchApi
    if(!currentUser){
        error("username", "user-doesnt-exist", "User doesn't exist!");
        return;
    }

    clearError("username");
}




function error(target, link, message){
    if(target == "parsec")      errorStatus &= ~1;
    if(target == "username")    errorStatus &= ~2;

    connectButton.blur();
    connectButton.classList.add("disabled");

    document.getElementById(target + "Field").classList .add("error");
    document.getElementById(target + "Error").href      = "https://github.com/satasatalight/controller-pass/blob/main/help/troubleshooting.md#" + link;
    document.getElementById(target + "Error").innerText = message;
}

function clearError(target){
    if(target == "parsec")      errorStatus |= 1;
    if(target == "username")    errorStatus |= 2;

    document.getElementById(target + "Field").classList .remove("error");
    document.getElementById(target + "Error").href      = "";
    document.getElementById(target + "Error").innerText = "";

    if(errorStatus == 3) connectButton.classList.remove("disabled");
}

window.Twitch.ext.onError(function(error) {
    console.log(error);
});