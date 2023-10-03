// Establish a WebSocket connection to the server
const socket = io.connect('http://' + document.domain + ':' + location.port);
const hand = document.querySelector(".hand");
const handImg = document.querySelector(".hand img");

let handPosX = 0;
let handPosY = 0;

const min = 0; // Minimum value of the original range
// 2900 is more or less the central positions for joystick, so max is 2 times that
const max = 6000; // Maximum value of the original range
const mapMin = 0; // Minimum value of the new range
const mapMax = 100; // Maximum value of the new range

const clenchUrl = "{{ url_for('static', filename='../images/fist.png') }}";
const punchUrl = "{{ url_for('static', filename='../images/pow.png') }}";
const defaultUrl = "{{ url_for('static', filename='../images/hand.png') }}";
const pickedUrl = "{{ url_for('static', filename='../images/hand_pickup.png') }}";

// const imageUrls = {{ image_urls | tojson | safe }};

socket.emit('my_event', { message: 'Hello, server!' });

// Event handler for receiving data from the server

socket.on('button_update', function(data) {
    // Update the webpage based on the data received
    //  object.style.filter = data.filter;
}); 

socket.on('switch_update', function(data) {
    // Update the webpage based on the data received
    //  object.style.borderRadius = data.border;
});

console.log(imageUrls)

socket.on('update', function(data) {
    const vrxValue = data.vrxValue;
    const vryValue = data.vryValue;
    const switchState = data.switchState;
    const buttonState = data.buttonState;

    console.log(vrxValue, vryValue, switchState, buttonState);
    
    if (switchState == "ON" && buttonState == "RELEASED") {
        console.log("clenched")
        handImg.src = imageUrls[0];
    }
    else if (switchState == "ON" && buttonState == "PRESSED") {
        console.log("punched")
        handImg.src = imageUrls[1];
    }
    else if (switchState == "OFF" && buttonState == "RELEASED") {
        handImg.src = imageUrls[2];
        console.log("default")
    }
    else if (switchState == "OFF" && buttonState == "PRESSED") {
        handImg.src = imageUrls[3];
        console.log("picked")
    }
    else {
        handImg.src = defaultUrl;
    }

    handPosX = map(vrxValue, min, max, mapMin, mapMax);
    handPosY = map(vryValue, min, max, mapMin, mapMax);

    hand.style.left = `${handPosX}vw`;
    hand.style.top = `${handPosY}vh`;

    // console.log(handPosX, handPosY);

});


socket.on('server_response', function(message) {
    console.log(message);
})


function map(value, fromMin, fromMax, toMin, toMax) {
    // First, normalize the input value to be in the range [0, 1]
    const normalizedValue = (value - fromMin) / (fromMax - fromMin);

    // Then, map the normalized value to the new range [toMin, toMax]
    const mappedValue = normalizedValue * (toMax - toMin) + toMin;

    return mappedValue;
}