import React from 'react';
import { createRoot } from 'react-dom/client'
import { useRef } from 'react';

let panel = document.getElementById("panel");
let root  = createRoot(panel);

// materialize automatically sets background-color for body to a dark gray when set to dark mode
// workaround to always set light mode and get transparent background
let r = document.querySelector(':root');
r.style.setProperty('color-scheme', 'light');

window.Twitch.ext.onAuthorized(function(auth) {

    if(window.Twitch.ext.viewer.isLinked){
        window.Twitch.ext.listen("broadcast", function(target, contentType, messageJSON){
            let message = JSON.parse(messageJSON);
    
            if(message.header == "controller-pass" && message.status == "listening"){
                passBackJWT(auth);
            }
        });

    } else {
        window.Twitch.ext.actions.requestIdShare();
    }

    window.Twitch.ext.listen("whisper-" + window.Twitch.ext.viewer.opaqueId, function(target, contentType, messageJSON) {
        let message = JSON.parse(messageJSON);

        if(message.header == "controller-pass"){
            console.log("Recieved!");
            
            statusHandler(message);
        }
    });
});




function passBackJWT(auth){
    fetch('./backend.js', {
        method: 'POST',
        headers:{
            'Authentication': 'Bearer ' + auth.token,
        },
    }).then(() => {
       console.log("wowooww");
    });
}

function statusHandler(message){
    switch(message.status){
        case "connect":
            console.log("Connected!");
            root.render(<ConnectCard peerId={message.peerId} hostSecret={message.hostSecret}/>);
            panel.classList.add("scale-in");

            break;
        case "disconnect":
            console.log("Disconnected!");
            root.render(<div id="card" className='card'></div>);
            panel.classList.remove("scale-in");

            break;
        case "queued":
            break;
        default:
            break;
    }
}




function ConnectCard(props){
    let iconRef = useRef(null);

    let copyContent = () => {
        navigator.clipboard.writeText("https://parsec.gg/g/" + props.peerId + "/" + props.hostSecret + "/");
        iconRef.current.innerHTML = 'done';

        setTimeout(() => {iconRef.current.innerHTML = 'content_paste';}, 1000);
    }

    return (
        <div id="card" className="card py-5" style={{width: "100%", height: "100%"}}>
            <div className="card-content">
                <span className="card-title">You've been passed the controller!</span>
                <p>We recommend connecting a bluetooth / usb controller. Good Luck!</p>
            </div>

            <div className="card-action center-align my-2">
                <a tabIndex="0" className="m-3 btn filled" href={"parsec://peer_id=" + props.peerId + "&host_secret=" + props.hostSecret + "&a="} rel="noopener noreferrer" target="_blank">
                    Join on Parsec App
                </a>
                <a tabIndex="0" className="m-3 btn filled" href="https://web.parsec.app/" rel="noopener noreferrer" target="_blank">
                    Open Web App
                </a>
                <a style={{cursor: "pointer"}} onClick={copyContent}>
                    <div className="s12 m6 input-field" >
                        <div className="suffix"><i ref={iconRef} className="material-icons">content_paste</i></div>
                        <input type="text" placeholder=" " value={"https://parsec.gg/g/" + props.peerId + "/" + props.hostSecret + "/"} disabled/>
                        <label htmlFor="disabled">Join Link</label>
                    </div>
                </a>
            </div>
        </div>
    );
}

function InfoCard(){

}



window.Twitch.ext.onError(function(error) {
    console.log(error);
});