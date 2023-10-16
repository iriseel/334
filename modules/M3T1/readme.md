For this lab, we initially tried to send data via TCP, but due to difficulties with that we ultimately went with UDP.

A minor note: it seems our ESP32s were already registered on the Yale network from previous classes, as when we tried to register them we both got the message, "Registering device: Registration request duplicates existing registration for this user and will not be processed."

To get this code working, you just need to upload the "334-esp32-udp-float-to-python.ino" code to your ESP32, and then run the python code on your computer. The result should match the documentation video.

One thing to note: Although we were told that we would need to use Yale Wireless (not YaleSecure) for both the ESP32 and the laptop, I actually managed to get the two devices to communicate successfully with just the ESP32 on Yale Wireless, and my computer still on Yale Secure. Was this because the devices remained connected via USB while the code was running? (since the ESP32 needed a power source, I just connected it to my computer.)