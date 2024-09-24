import { ExtensionAuthProvider } from "../node_modules/@twurple/auth-ext/es/index.mjs";
import { ChatClient } from "../node_modules/@twurple/chat/es/index.mjs";

let parsecLink;
let twitchUsername;

let clientId = process.env.CONTROLLER_PASS_CLIENT_KEY;
let authProvider;
let chatClient;

window.onload = (event) => {
    print(clientId);
    print("oifhgoihioghofhiogh");
    authProvider    = new ExtensionAuthProvider(clientId);
    // chatClient      = new ChatClient({authProvider, })
}

function send(){
    parsecLink      = document.getElementById("parsec").value;
    twitchUsername  = document.getElementById("username").value;


}