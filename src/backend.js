import { ExtensionAuthProvider } from "@twurple/auth-ext";
import { ApiClient } from "@twurple/api";
// import { AppTokenAuthProvider } from '@twurple/auth';

let clientId        = import.meta.env.VITE_CONTROLLER_PASS_CLIENT_ID;
let clientSecret    = import.meta.env.VITE_CONTROLLER_PASS_CLIENT_SECRET;

let authProvider    = new ExtensionAuthProvider(clientId);
let apiClient       = new ApiClient({authProvider});

globalThis.send     = send;

window.Twitch.ext.onAuthorized(function(auth) {
    // console.log('The Helix JWT is ', auth.helixToken);
    // console.log('The Helix JWT is ', auth.helixToken);
    clientId = auth.clientId;
});
  

function send(){
    let parsecLink      = document.getElementById("parsec").value;
    let twitchUsername  = document.getElementById("username").value;

    window.Twitch.ext.send("broadcast", "application/json", {user: twitchUsername, parsec: parsecLink});
}