
window.Twitch.ext.listen("broadcast", (target, contentType, message) => {
    console.log(target);
    console.log(contentType);
    console.log(message);
})