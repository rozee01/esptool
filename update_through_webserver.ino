#include <AsyncEventSource.h>
#include <AsyncJson.h>
#include <AsyncWebSocket.h>
#include <AsyncWebSynchronization.h>
#include <ESPAsyncWebSrv.h>
#include <SPIFFSEditor.h>
#include <StringArray.h>
#include <WebAuthentication.h>
#include <WebHandlerImpl.h>
#include <WebResponseImpl.h>

#include <WiFi.h>
#include <Update.h>

//update.h allows us to update the firmware of the microcontroller by uploading a new binary file over a network connection

//these are my wifi credentials
const char* ssid="TOPNET_1D18";
const char* password="0sb0go6047";

//server port, this is useful for when the board gets an ip address we can access the interface via ip address:port
AsyncWebServer server(80);

void setup() {
  //baud rate, the rate at which the data is transmitted per second over the serial communication interface
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);//to connect on the wifi wifi
  WiFi.begin(ssid, password);

  //while the board is still trying to connect to the wifi 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  //prints the board's ip address to the monitor
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  //this function is used to define the behavior of the server for http request (from asyncwebserver library)
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/html", "<form method='POST' action='/update' enctype='multipart/form-data'><input type='file' name='update'><input type='submit' value='Upload'></form>");
  });
//first lambda function is the request handler and the 2nd is the upload handler
  server.on("/update", HTTP_POST, [](AsyncWebServerRequest *request) {
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", (Update.hasError()) ? "Update failed" : "Update successful");
    response->addHeader("Connection", "close");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  }, [](AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final) {
    // data variable is the file selected by the user, uint8_t is a data type
    if (!index) {
      //this means that when the index is 0 (w're pointing on value 0 of the file), the upload to the board is about to start 
      Serial.println("Update started");
      Update.begin(UPDATE_SIZE_UNKNOWN); //this means we don't already know the size of the file to upload
    }

    if (Update.write(data, len) != len) {
      Serial.println("Update error");
    }

    if (final) {
      //final is a parameter that is valued true when the last part of data is received
      if (Update.end(true)) {
        Serial.println("Update successful");
      } else {
        Serial.println("Update failed");
      }
    }
  });

  server.begin();
}

void loop() {
}
