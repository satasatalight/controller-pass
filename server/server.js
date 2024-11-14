import express from "express"
import jwt from "jsonwebtoken"


let key         = process.env.CONTROLLER_PASS_CLIENT_SECRET;
let port        = process.env.PORT;
let secret      = Buffer.from(key, 'base64');
let app         = express();
let channels    = new Map();


// Serving static files (HTML, CSS, JS)
app.use(express.static('public'));

// Defining a route for handling client communication
app.get('/api/message', (req, res) => {
    let message = 'Hello Geek. This Message is From Server';
    res.json({ message });
});

app.get('/api/getOpaqueId', (req, res) => {
    let broadcaster = verifyAuth(req, res);

    console.log(req);
    if(broadcaster){
        let opaqueId = channels.get(broadcaster.channel_id)[req.body["user_id"]];

        (opaqueId) ?
            res.json({ opaque_id: opaqueId }) :
            res.status(401).json({error: true, message: 'Invalid user id'});
    }
});

app.post('/api/passAuth', (req, res) => {
    let user = verifyAuth(req, res);

    if(user){
        addUser(user);
    }
})

// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});



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

                res.json({message: "passed"});
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