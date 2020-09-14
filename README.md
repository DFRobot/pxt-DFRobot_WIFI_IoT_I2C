# WiFi IoT I2C

[Maqueen plus is a STEM educational robot for micro:bit. Optimized with better power management and larger capacity power supply, it can be perfectly compatible with Huskylens AI Vision Sensor.](https://www.dfrobot.com/product-2026.html)
## Basic usage

* WiFi connection configuration

```blocks
DFRobotWiFiIoTI2C.WIFISetup("yourSSID", "yourPASSWORD")
```

* Mqtt connection configuration

```blocks
DFRobotWiFiIoTI2C.mqttSetup(
"yourIotId",
"yourIotPwd",
"yourIotTopic",
DFRobotWiFiIoTI2C.SERVERS.China
)
```

* Accessing Easy_IoT using mqtt protocol

```blocks
input.onButtonPressed(Button.A, function () {
    DFRobotWiFiIoTI2C.mqttSendMessageMore("mess", DFRobotWiFiIoTI2C.TOPIC.topic_0)
})
DFRobotWiFiIoTI2C.mqttCallbackUserMore(DFRobotWiFiIoTI2C.TOPIC.topic_0, function (message) {
    serial.writeLine("" + (message))
})
DFRobotWiFiIoTI2C.WIFISetup("yourSSID", "yourPASSWORD")
DFRobotWiFiIoTI2C.mqttSetup(
"yourIotId",
"yourIotPwd",
"yourIotTopic",
DFRobotWiFiIoTI2C.SERVERS.China
)
```

* Accessing IFTTT using HTTP protocol 

```blocks
input.onButtonPressed(Button.A, function () {
    DFRobotWiFiIoTI2C.IFTTTSend("Hi", "DFRobot", "2020")
})
DFRobotWiFiIoTI2C.WIFISetup("yourSSID", "yourPASSWORD")
DFRobotWiFiIoTI2C.IFTTTConfigure("yourEvent", "yourKey")
```

* Accessing ThingSpeak using HTTP protocol 

```blocks
input.onButtonPressed(Button.A, function () {
    DFRobotWiFiIoTI2C.ThingSpeakSend("2020")
})
DFRobotWiFiIoTI2C.WIFISetup("yourSSID", "yourPASSWORD")
DFRobotWiFiIoTI2C.ThingSpeakConfigure("yourKey")
```

## License

MIT

Copyright (c) 2020, microbit/micropython Chinese community  


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
