#include <stdio.h>
int power = 13;
String inputString = "";         // a String to hold incoming data
boolean stringComplete = false;  // whether the string is complete

void setup() {
  Serial.begin(9600);
  pinMode(power, OUTPUT);
  inputString.reserve(200);
}

void loop() {
  //Read values only when asked by the Rpi
  if (stringComplete) {
    writeDataSerial();
    // clear the string:
    inputString = "";
    stringComplete = false;
  }
  delay(1000);
}

int convertEnPercent(int value){
 int ValeurPorcentage = 0;
 ValeurPorcentage = map(value,550,0,0,100);
 return ValeurPorcentage;
}

void writeDataSerial() {
  //Power the sensor only when getting data to reduce oxydation
  digitalWrite(power, HIGH);
  delay(5000);
  int haricots = convertEnPercent(analogRead(A0));
  int poivrons = convertEnPercent(analogRead(A1));
  digitalWrite(power, LOW);

  Serial.print(haricots);
  Serial.print(",");
  Serial.println(poivrons);
}

void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag so the main loop can
    // do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
