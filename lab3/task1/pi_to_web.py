from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from gpiozero import Button
from signal import pause
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Corresponds to GPIO
button = Button(2)
switch = Button(4)
joystick = Button(17)

counter = 0
color = ""
border = ""
filter = ""

def button_pressed():
    global filter
    filter = "blur(10px)"
    print("Button was pressed.")
    socketio.emit('button_update', {'filter': filter})
    
def button_held():
    global counter
    counter += 1
    if counter == 3:
        counter = 0
    print(f"Button was held. State is now {counter}.")

def button_released():
    global filter
    filter = "blur(0px)"
    print("Button was released")
    socketio.emit('button_update', {'filter': filter})

button.when_pressed = button_pressed
button.when_held = button_held
button.when_released = button_released

def switch_on():
    global border
    border = "10%"
    print("Switch is on.")
    socketio.emit('switch_update', {'border': border})

def switch_off():
    global border
    border = "50%"
    print("Switch is off.")
    socketio.emit('switch_update', {'border': border})

switch.when_pressed = switch_on
switch.when_released = switch_off

# Define analog thresholds for joystick directions
JOYSTICK_THRESHOLD = 0.7  # Adjust this value as needed

def joystick_pressed():
    global color
    color = "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
    print("Joystick was moved up.")
    socketio.emit('joystick_update', {'color': color})
    

def joystick_held():
    global counter
    counter += 1
    if counter == 3:
        counter = 0

    print(f"Joystick state is {counter}.")

def joystick_released():
    global color
    color = "radial-gradient(circle, rgba(255,241,183,1) 0%, rgba(180,217,202,1) 48%, rgba(165,148,233,1) 100%)"
    print("Joystick was brought back down.")
    socketio.emit('joystick_update', {'color': color})

joystick.when_pressed = joystick_pressed
joystick.when_held = joystick_held
joystick.when_released = joystick_released


@app.route('/')
def index():
    return render_template('index.html')

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

# Enter the event loop and listen for GPIO events in the main thread
try:
    while True:
        pass  # You can add additional main thread logic here if needed

except KeyboardInterrupt:
    pass