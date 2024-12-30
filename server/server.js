import express from "express";
import jwt from "jsonwebtoken";
import { AppTokenAuthProvider } from '@twurple/auth';
import { ApiClient } from "@twurple/api";
import cors from "cors"

let clientId    = process.env.CONTROLLER_PASS_CLIENT_ID;
let extKey      = process.env.CONTROLLER_PASS_EXTENSION_SECRET;
let apiSecret   = process.env.CONTROLLER_PASS_CLIENT_SECRET;
let port        = process.env.PORT;

let extSecret       = Buffer.from(extKey, 'base64');
let app             = express();
let authProvider    = new AppTokenAuthProvider(clientId, apiSecret);
let apiClient       = new ApiClient({authProvider});
let channels        = new Map();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static('website'));





app.post('/api/getOpaqueId', (req, res) => {
    let broadcaster = verifyAuth(req, res);

    if(broadcaster){
        try{
            let opaqueId = channels.get(broadcaster.channel_id)[req.body['username']];

            if(opaqueId){
                res.json({ opaque_id: opaqueId })
            }
            else{
                res.status(401).json({error: true, message: 'Invalid request'});
            }
        }
        catch{
            res.status(401).json({error: true, message: 'Invalid request'});
        }
    }
});

app.post('/api/passAuth', (req, res) => {
    let user = verifyAuth(req, res);

    if(user){
        addUser(user);
        res.json({message: "passed"});
    }
})

app.post('/api/removeAuth', (req, res) => {
    let user = verifyAuth(req, res);

    if(user){
        removeUser(user);
        res.json({message: "removed"});
    }
})




async function addUser(user){
    if(!channels.get(user.channel_id)){
        channels.set(user.channel_id, Object.create(null));
    }

    let apiUser = await apiClient.users.getUserById(user.user_id);
    channels.get(user.channel_id)[apiUser.name] = user.opaque_user_id;
}

function verifyAuth(req, res){
    let [ type, auth ] = req.headers['authorization'].split(' ');

    if(type == "Bearer"){
        try { 
            return jwt.verify(auth, extSecret, { algorithms: ['HS256'] });
        } 
        catch {
            console.error("FAILED: ", req.headers.authorization);
            res.status(401).json({error: true, message: 'Invalid authorization'});    
        }
    }
    else {
        console.error("FAILED: ", req.headers.authorization);
        res.status(401).json({error: true, message: 'Invalid header'});
    }
}



// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});