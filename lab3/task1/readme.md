<h1>Joystick Circuit on Raspberry Pi</h1>
    Ground --> Resistor --> Joystick (ground) --> Joystick (+5V) --> 5V Power
    Joystick (URY) --> GPIO

<h1>Switch Circuit on Raspberry Pi</h1>
    Ground --> Resistor --> Switch --> GPIO

    ?? Somehow the joystick needs to be connected to power to work (i.e. for python to print the status to the terminal), while the switch does not need to be connected to power?