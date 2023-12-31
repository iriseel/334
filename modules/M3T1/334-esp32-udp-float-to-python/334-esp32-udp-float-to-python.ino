/*
 *  This sketch sends random data over UDP on a ESP32 device
 *
 */
#include <WiFi.h>
#include <WiFiUdp.h>

const int PHOTORESISTOR = 34;  // GPIO34
int photoresistor_val = 0;

// WiFi network name and password that ESP32 is trying to connect to:
const char * networkName = "yale wireless";
const char * networkPswd = "";

//IP address to send UDP data to:
// either use the ip address of the server or 
// a network broadcast address
const char * udpAddress = "172.27.97.46";
const int udpPort = 8092;

//Are we currently connected?
boolean connected = false;

//The udp library class
WiFiUDP udp;

byte command[27] = {0x20, 0x00, 0x00, 0x00, 0x16, 0x02, 0x62, 0x3A, 0xD5, 0xED, 0xA3, 0x01, 0xAE, 0x08, 0x2D, 0x46, 0x61, 0x41, 0xA7, 0xF6, 0xDC, 0xAF, 0xD3, 0xE6, 0x00, 0x00, 0x1E};

void setup(){
  // Initilize hardware serial:
  Serial.begin(115200);

  //Connect to the WiFi network
  connectToWiFi(networkName, networkPswd);
}

void loop(){
  photoresistor_val = analogRead(PHOTORESISTOR);
  //only send data when connected
  if(connected){
    //Send a packet
    udp.beginPacket(udpAddress,udpPort);
    udp.print(photoresistor_val);  // USES .print INSTEAD OF .write
    udp.endPacket();
  }
  //Wait for 1 second
  delay(10);
}

void connectToWiFi(const char * ssid, const char * pwd){
  Serial.println("Connecting to WiFi network: " + String(ssid));

  // delete old config
  WiFi.disconnect(true);
  //register event handler
  WiFi.onEvent(WiFiEvent);

  //Initiate connection
  WiFi.begin(ssid, pwd);

  Serial.println("Waiting for WIFI connection...");
}

//wifi event handler
void WiFiEvent(WiFiEvent_t event){
    switch(event) {
      case SYSTEM_EVENT_STA_GOT_IP:
          //When connected set 
          Serial.print("WiFi connected! IP address: ");
          Serial.println(WiFi.localIP());  
          //initializes the UDP state
          //This initializes the transfer buffer
          udp.begin(WiFi.localIP(),udpPort);
          connected = true;
          break;
      case SYSTEM_EVENT_STA_DISCONNECTED:
          Serial.println("WiFi lost connection");
          connected = false;
          break;
    }
}
