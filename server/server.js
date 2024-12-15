import express from "express"
import jwt from "jsonwebtoken"
import { ExtensionAuthProvider } from "@twurple/auth-ext";
import { ApiClient } from "@twurple/api";

let clientId    = process.env.CONTROLLER_PASS_CLIENT_ID;
let key         = process.env.CONTROLLER_PASS_CLIENT_SECRET;
let port        = process.env.PORT;

let secret          = Buffer.from(key, 'base64');
let app             = express();
let authProvider    = new ExtensionAuthProvider(clientId);
let apiClient       = new ApiClient({authProvider});
let channels        = new Map();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('website'));




// Defining a route for handling client communication
app.get('/api/message', (req, res) => {
    let message = 'Hello Geek. This Message is From Server';
    res.json({ message });
});

app.post('/api/getOpaqueId', (req, res) => {
    let broadcaster = verifyAuth(req, res);

    if(broadcaster){
        try{
            let opaqueId = channels.get(broadcaster.channel_id)[req.body['user_id']];

            if(opaqueId)
                res.json({ opaque_id: opaqueId })
            else
                res.status(401).json({error: true, message: 'Invalid request'});
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




function addUser(user){
    if(!channels.get(user.channel_id)){
        channels.set(user.channel_id, Object.create(null));
    }
    
    channels.get(user.channel_id)[user.user_id] = user.opaque_user_id;
}

function verifyAuth(req, res){
    let [ type, auth ] = req.headers['authorization'].split(' ');
    let returnVal;

    if(type == "Bearer"){
        jwt.verify(auth, secret, { algorithms: ['HS256'] },
            (error, decoded) => {
                if(error){
                    console.log(error);
                    res.status(401).json({error: true, message: 'Invalid JWT'});
                    returnVal = null;
                }

                returnVal = decoded;
            }
        );
    }

    else {
        console.log("FAILED: ", req.headers.authorization);
        res.status(401).json({error: true, message: 'Invalid authorization'});
        returnVal = null;
    }

    return returnVal;
}




// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});