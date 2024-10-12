import React from 'react';
import { createRoot } from 'react-dom/client'
import { useRef } from 'react';

let panel = document.getElementById("panel");
let root  = createRoot(panel);

window.Twitch.ext.onAuthorized(function(auth) {
    let userId = auth.userId;

    window.Twitch.ext.listen("whisper-" + userId, function(target, contentType, messageJSON) {
        let message = JSON.parse(messageJSON);

        if(message.header == "controller-pass"){
            console.log("Recieved!");
            
            statusHandler(message);
        }
    });
});




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
                <p>Don't embarrass yourself up there! Good Luck!</p>
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




window.Twitch.ext.onError(function(error) {
    console.log(error);
});