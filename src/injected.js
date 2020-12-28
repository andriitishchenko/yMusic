    
(function () {

console.log("LOADED!");
var IDLE_TIMEOUT = 2000; 
var _idleStartTime = 0;

let events = ["click", "mousemove", "keypress"];
events.forEach( (element, index, array) => {
    document.body.addEventListener( element, (e) => {
        _idleStartTime = new Date().getTime();
    },true);
});

function isIDLE(){
    return ( new Date().getTime() - _idleStartTime ) > IDLE_TIMEOUT;
}


function initPlayerContainer(){
    console.log("initPlayerContainer");
    let timerId = setTimeout(function tick() {
        let video = document.querySelector("video");
        if (video == undefined) {
            timerId = setTimeout(tick, 2000);
            return;
        }
        console.log("initPlayerContainer - FOUND");
        addEvent(video);
    }, 2000);
}

function addEvent(videoElement) {
    console.log("PATCH VIDEO");
    videoElement.addEventListener("pause", (e) => {
        if (!isIDLE()) { 
            console.log("not idle");
            return;
        }
        
        let video = e.currentTarget;
        setTimeout(() => {
            if (video.paused) {
                console.log("Recovering");
                let ell = document.querySelector("ytmusic-you-there-renderer [is-paper-button]");
                if(ell){
                    ell.click();
                }
            }
        }, 2000);
    });
}
    
initPlayerContainer();

})();
