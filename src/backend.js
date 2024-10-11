import { ExtensionAuthProvider } from "@twurple/auth-ext";
import { ApiClient } from "@twurple/api";

let apiClient;
let user;
let lastLink;
let errorStatus = 0; // 0 = both invalid, 1 = parsec valid, 2 = username valid, 3 = both valid

globalThis.connect      = connect;
globalThis.linkCheck    = checkParsecLink;
globalThis.userCheck    = checkUsername;

window.Twitch.ext.onAuthorized(function(auth) {
    let authProvider    = new ExtensionAuthProvider(auth.clientId);
    apiClient           = new ApiClient({authProvider});

    console.log("Connected!");
});




async function connect(){
    let parsecLink      = document.getElementById("parsec").value;
    
    // send controller after link & username checks
    if(errorStatus == 3){
        let splitLink = parsecLink.split('/');
        
        window.Twitch.ext.send("whisper-U" + user.id , "application/json", 
            {header: "controller-pass", status: "connect", peerId: splitLink[4], hostSecret: splitLink[5]});
        
        lastLink = parsecLink;
        console.log("sent to ", user.name);
    }
}

function disconnect() {
    window.Twitch.ext.send("whisper-U" + user.id , "application/json", 
        {header: "controller-pass", status: "disconnect"});
    user = null;
}




async function checkUsername(username){
    let bannedCharacters = /^[a-zA-Z0-9_]{4,25}$/g;

    // check for valid username
    if(!bannedCharacters.test(username)){
        error("username", "Invalid username!");
        return;
    }

    // if user is already connected, disconnect
    if(user){
        disconnect();
    }

    user = await apiClient.users.getUserByName(username);

    // check if user is found by twitchApi
    if(!user){
        error("username", "User doesn't exist!");
        return;
    }

    clearError("username");
}

function checkParsecLink(link){
    let weirdCharacters = /([ ,!?@#$%^&*()\\`~_\-+=[\]{};'"<>|])+/g;
    let parsecURL       = /^(https:\/\/parsec.gg\/g\/)+/g;

    // checking for weird characters
    if(weirdCharacters.test(link)){
        error("parsec", "Don't include weird characters! '\\,!?@#$%^&*()`~_-+=[]{};'\"<>|'");
    }
    // checking for 'https://parsec.gg/g/' at beginning
    else if(!parsecURL.test(link)){
        error("parsec", "Link doesn't start with 'https://parsec.gg/g/'!");
    }
    // checking for new link
    else if(link == lastLink){
        error("parsec", "Refresh your invite link!");
    }
    // checking link formatting
    else if(link.split('/').length != 7){
        error("parsec", "Invalid link format!");
    } 
    else{
        clearError("parsec");
    }
}




function error(target, message){
    if(target == "parsec")      errorStatus &= ~1;
    if(target == "username")    errorStatus &= ~2;

    document.getElementById("connectButton").classList  .add("disabled");
    document.getElementById(target + "Field").classList .add("error");
    document.getElementById(target + "Error").innerText = message;
}

function clearError(target){
    if(target == "parsec")      errorStatus |= 1;
    if(target == "username")    errorStatus |= 2;

    document.getElementById(target + "Field").classList .remove("error");
    document.getElementById(target + "Error").innerText = "";

    if(errorStatus == 3) document.getElementById("connectButton").classList.remove("disabled");
}

window.Twitch.ext.onError(function(error) {
    console.log(error);
});