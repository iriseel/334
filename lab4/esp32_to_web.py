#trying to send data from the esp32 to server via raspi

import serial
from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, emit
from gpiozero import Button
from signal import pause
import threading

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

vrxValue = 0  # Initialize vrxValue
vryValue = 0  # Initialize vryValue
switchState = ""  # Initialize switchState as an empty string
buttonState = ""  # Initialize buttonState as an empty string


@app.route('/')
def index():
    # return render_template('index.html')
    # Generate URLs for multiple static images
    image_urls = [
        url_for('static', filename='images/fist.png'),
        url_for('static', filename='images/pow.png'),
        url_for('static', filename='images/hand.png')
        url_for('static', filename='images/hand_pickup.png')
    ]
    return render_template('index.html', image_urls=image_urls)

# this is just for if the server?flask? receives a message from the html
@socketio.event
def my_event(message):
    print(message)
    emit('server_response', {'message': 'got it!'})

def run_flask():
    print("Flask server is running and listening on port 8080.")
    socketio.run(app, host='0.0.0.0', port=8080)

# Create a separate thread for the Flask server
flask_thread = threading.Thread(target=run_flask)
flask_thread.daemon = True  # Allow the thread to exit when the main script exits
flask_thread.start()  # Start the Flask application in the background

# Replace with the correct serial port name for your ESP32
ser = serial.Serial('/dev/ttyUSB0', 9600)  # Adjust the port and baud rate as needed

# Enter the event loop and listen for GPIO events in the main thread
try:
    while True:
        # Read a line from the serial port
        serial_data = ser.readline().decode('utf-8').strip()

        # Split the received data by commas
        data_list = serial_data.split(',')

        # Check if we have received the expected number of values
        if len(data_list) == 4:
            vrxValue, vryValue, switchState, buttonState = data_list

        # Send the parsed values to the server
        socketio.emit('update', {
            'vrxValue': int(vrxValue),
            'vryValue': int(vryValue),
            'switchState': switchState,
            'buttonState': buttonState
        })


except KeyboardInterrupt:
    # Close the serial port when the script is interrupted
    ser.close()

except Exception as e:
    print("An error occurred:", str(e))
