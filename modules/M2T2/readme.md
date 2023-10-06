This repo contains the code for Module 2, Task 2 for CPSC334, Fall 2023. The project, "Pluck & Punch," is a website + raspberry pi + esp32 + physical controls setup where the player can affect elements on the website by manipulating the physical controls (joystick, switch, and button).

<h1>Setting the Scene</h1>
You find yourself as a hand in a landscape of vegetation. Movements on the joystick control your movement around the page, while the button and switch toggle your various states — default, clenched, punching, and picking. Basically, you can switch between “appreciative” and “aggressive” modes (idle states) by toggling the switch, and then can “execute” the move associated with that mode by pressing the button. If you execute the move while positioned on or near a plant, said plant is then either plucked or punched, depending on if it's a sweet or spicy plant (not clinically precise terminology). Belatedly, I realize the irony that either way, the plant is killed. So much for appreciation.

<h1>Materials</h1>
To replicate this setup, you will need:
- A Raspberry Pi
- An ESP32
- A joystick
- A switch
- A button
- A bread board
- Wires
- A computer
- Materials to build your enclosure (I used cardboard)

<h1>Installation</h1>
To get this code to work on your setup, you will first need to upoad the following Arduino code onto your ESP32:

```python
    int VRX_PIN = 12; // Analog pin for joystick VRx
    int VRY_PIN = 14; // Analog pin for joystick VRy
    int SWITCH_PIN = 17; // Digital pin for the switch
    const int BUTTON_PIN = 23;   // Digital pin for the button


    void setup() {
    // put your setup code here, to run once:
    Serial.begin(9600);
    pinMode(SWITCH_PIN, INPUT_PULLUP); // Configure the switch pin as an input with internal pull-up resistor
    pinMode(BUTTON_PIN, INPUT_PULLUP); // Configure the button pin as an input with internal pull-up resistor
    }


    void loop() {
    // Read analog values from the joystick
    int vrxValue = analogRead(VRX_PIN);
    int vryValue = analogRead(VRY_PIN);

    // Read the state of the switch
    int switchState = digitalRead(SWITCH_PIN);

    // Read the state of the button
    int buttonState = digitalRead(BUTTON_PIN);

    // Send the values over the USB-to-Serial connection
    // Send joystick, button, and switch data in a structured format
        Serial.print(vrxValue);
        Serial.print(",");
        Serial.print(vryValue);
        Serial.print(",");
        Serial.print(switchState == HIGH ? "ON" : "OFF");
        Serial.print(",");
        Serial.println(buttonState == HIGH ? "RELEASED" : "PRESSED");

    delay(500);  // Add a delay to control the data rate
    }

```
Note: Make sure that when you are uploading the code, any circuit you have on the ESP32 is NOT complete. Otherwise the code will not successfully upload. In my case, I just unplugged the power wire from my ESP32 to the breadboard, and then plugged it back in once the code was uploaded.

Second Note: Make sure your GPIOs are the same as the ones in the above arduino code, or modify the code to match yours. Just make sure your GPIO for the joystick has ADC since the joystick outputs analog values and the pi can only read digital.

Then, you can unplug the ESP32 from your computer and plug it into your Raspberry Pi. However, again, make sure the power circuit is NOT already complete until after you have plugged the ESP32 to the Pi. Otherwise the data gets corrupted.

Then, with all the code in this repo on your pi, you can just run the esp32_to_web.py, and access the website on any computer on the same network as your pi at the address of ip_address:8080. (this can be another number if you change the port in the python script.)

Pluck and punch away!