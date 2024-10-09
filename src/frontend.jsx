import { createRoot } from 'react-dom/client'
import React from 'react';

let panel = document.getElementById("panel");
let root  = createRoot( panel );

window.Twitch.ext.onAuthorized(function(auth) {
    let userId = auth.userId;

    window.Twitch.ext.listen("whisper-" + userId, function(target, contentType, messageJSON) {
        let message = JSON.parse(messageJSON);

        if(message.header == "controller-pass"){
            console.log("Recieved!");
            statusHandler(message.status);
        }
    });
});

function statusHandler(status){
    switch(status){
        case "connect":
            console.log("Connected!");
            root.render(<ConnectCard/>);
            panel.classList.toggle("scale-in");

            break;
        case "disconnect":
            console.log("Disconnected!");
            root.render(<div id="card" className='card'></div>);
            panel.classList.toggle("scale-in");

            break;
        case "queued":
            break;
        default:
            break;
    }
}

function ConnectCard(){
    return (
        <div id="card" className="card" style={{width: "100%", height: "100%"}}>
            <div className="card-content">
                <span className="card-title">You've been passed the controller!</span>
                <p>Don't embarass youself up there! Good Luck!</p>
            </div>

            <div className="card-action">
                <a href="#">Join on Parsec App</a>
                <a href="#">Join in Browser</a>
            </div>
        </div>
    );
}