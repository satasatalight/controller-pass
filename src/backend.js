// import { ExtensionAuthProvider } from "@twurple/auth-ext";
// import { AppTokenAuthProvider } from '@twurple/auth';
import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from "@twurple/chat";

let authProvider;
let chatClient;

let clientId        = import.meta.env.VITE_CONTROLLER_PASS_CLIENT_ID;
let clientSecret    = import.meta.env.VITE_CONTROLLER_PASS_CLIENT_SECRET;
let accessToken     = import.meta.env.VITE_DEV_ACCESS_TOKEN;

window.onload = (event) => {
    authProvider    = new StaticAuthProvider(clientId, accessToken);
    chatClient      = new ChatClient({authProvider, channels: ['satalight_'] });
    chatClient.connect();
    chatClient.say('satalight_', "CONNECTED!");

    console.log(authProvider);
    console.log(chatClient);
}

function send(){
    let parsecLink      = document.getElementById("parsec").value;
    let twitchUsername  = document.getElementById("username").value;


}