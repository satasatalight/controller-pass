let userId;

window.Twitch.ext.onAuthorized(function(auth) {
    userId = auth.userId;
    console.log("Connected!");

    window.Twitch.ext.listen("whisper-" + userId, function(message) {
        console.log("Recieved!");
        console.log(message);
    });
});