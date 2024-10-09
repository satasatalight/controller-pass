import { ExtensionAuthProvider } from "@twurple/auth-ext";
import { ApiClient } from "@twurple/api";

let apiClient;
let user;

globalThis.send = send;

window.Twitch.ext.onAuthorized(function(auth) {
    let clientId        = auth.clientId;
    let authProvider    = new ExtensionAuthProvider(clientId);
    apiClient           = new ApiClient({authProvider});

    console.log("Connected!");
});
  
async function send(){
    let parsecLink      = document.getElementById("parsec").value;
    let twitchUsername  = document.getElementById("username").value;
    
    // if user is already connected, disconnect
    if(user){
        disconnect();
    }
    
    user = await apiClient.users.getUserByName(twitchUsername); 

    // if user can't be found by twitch api, send error
    if(!user){
        error("username", "User doesn't exist!");
        return;
    }

    clearError();
    window.Twitch.ext.send("whisper-U" + user.id , "application/json", {header: "controller-pass", status: "connect", parsec: parsecLink});
}

function disconnect() {
    window.Twitch.ext.send("whisper-U" + user.id , "application/json", {header: "controller-pass", status: "disconnect"});
    user = null;
}

function error(target, message){
    document.getElementById(target + "Field").classList .add("error");
    document.getElementById(target + "Error").innerText = message;
}

function clearError(){
    document.getElementById("usernameField").classList  .remove("error");
    document.getElementById("parsecField").classList    .remove("error");
    document.getElementById("usernameError").innerText  = "";
    document.getElementById("parsecError").innerText    = "";
}

window.Twitch.ext.onError(function(error) {
    console.log(error);
});