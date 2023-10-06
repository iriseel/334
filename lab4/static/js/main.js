// Establish a WebSocket connection to the server
const socket = io.connect('http://' + document.domain + ':' + location.port);
const hand = document.querySelector(".hand");
const handImg = document.querySelector(".hand img");

let handPosX = 0;
let handPosY = 0;

const min = 0; // Minimum value of the original range
// 2900 is more or less the central positions for joystick, so max is 2 times that
const max = 2900 * 2; // Maximum value of the original range
const mapMin = 0; // Minimum value of the new range
const mapMax = 100; // Maximum value of the new range

const clenchUrl = "/static/images/fist.png";
const punchUrl = "/static/images/pow.png";
const defaultUrl = "/static/images/hand.png";
const pickedUrl = "/static/images/hand_pickup.png";

const audioFiles = {
    "flower_cry": "/static/audio/flower_cry.mp3",
    "flower_happy": "/static/audio/flower_happy.mp3",
    "death": "/static/audio/death.mp3",
    "game_over": "/static/audio/game_over.mp3"
};

// const imageUrls = {{ image_urls | tojson | safe }};

socket.emit('my_event', { message: 'Hello, server!' });

//For some reason this emit is necessary or else the website only receives data from the pi at irregular, long intervals, in mass batches. I have no idea why.
//There doesn't even need to be a @socketio.on('ping') in the python script.
//Apparently this "effectively keeps the WebSocket connection more active and reduces the chance of it becoming idle." But the WebSocket should ideally maintain an active connection without requiring periodic "ping" messages!!!
// Periodically send ping messages to the server
setInterval(function () {
    socket.emit('ping');  // Send a ping message to the server
    // console.log("ping from website")
}, 500);  // Adjust the interval as needed

// Event handler for receiving data from the server

// console.log(imageUrls)

socket.on('update', function(data) {
    const vrxValue = data.vrxValue;
    const vryValue = data.vryValue;
    const switchState = data.switchState;
    const buttonState = data.buttonState;

    // console.log(vrxValue, vryValue, switchState, buttonState);

    handPosX = map(vrxValue, min, max, mapMin, mapMax);
    handPosY = map(vryValue, min, max, mapMin, mapMax);

    hand.style.left = `${handPosX}vw`;
    hand.style.top = `${handPosY}vh`;

    console.log(handPosX, handPosY);

    //flowers
    const topLeft = handPosY < 10 && handPosX < 10;
    const topMiddle = handPosY < 10 && handPosX > 40 && handPosX < 60;
    const bottomRight = handPosY > 65 && handPosX > 65;

    //plants
    const topRight = handPosY < 10 && handPosX > 65;
    const bottomLeft = handPosY > 65  && handPosX < 10;
    const middleLeft = handPosY < 60 && handPosY > 30 && handPosX < 10;
    
    if (switchState == "ON" && buttonState == "RELEASED") {
        handImg.src = clenchUrl;
    }
    else if (switchState == "ON" && buttonState == "PRESSED") {
        handImg.src = punchUrl;
        if (topLeft || topMiddle || bottomRight) {
            play_audio("flower_cry");
        }
        else if (topRight || bottomLeft || middleLeft) {
            play_audio("death");
        }
    }
    else if (switchState == "OFF" && buttonState == "RELEASED") {
        handImg.src = defaultUrl;
    }
    else if (switchState == "OFF" && buttonState == "PRESSED") {
        handImg.src = pickedUrl;
        if (topLeft || topMiddle || bottomRight) {
            console.log("flower picked")
            play_audio("flower_happy");
        }
        else if (topRight || bottomLeft || middleLeft) {
            console.log("plant picked")
            play_audio("game_over");
        }
    }
    else {
        handImg.src = defaultUrl;
    }

});


socket.on('server_response', function(message) {
    console.log(message);
})



function play_audio(file) {
    const audio = new Audio();
    audio.src = audioFiles[file];
    audio.play();
    console.log("played")
}

function map(value, fromMin, fromMax, toMin, toMax) {
    // First, normalize the input value to be in the range [0, 1]
    const normalizedValue = (value - fromMin) / (fromMax - fromMin);

    // Then, map the normalized value to the new range [toMin, toMax]
    const mappedValue = normalizedValue * (toMax - toMin) + toMin;

    return mappedValue;
}
