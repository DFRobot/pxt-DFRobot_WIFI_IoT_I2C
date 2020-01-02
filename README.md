# micro:IoT-micro:bit IoT Expansion Board 
[This micro:bit-based IoT expansion board is pretty cute and delicate, on which we integrated Wi-Fi, OLED, 2-way motor drive, 6-way IO port, 2-way IIC, 1-way serial port, 1-way buzzer, 3-way RGB, 2-way servo, Li-ion battery holder, charging circuit, emergency power interface etc.](https://www.dfrobot.com/product-1926.html?tracking=5d9d760421f87)

So many resources for you to programme! Even without much background knowledge, you can build your IoT applications in few steps!

## Basic usage

* Display parameters on OLED
```blocks
microIoT.microIoT_initDisplay()
basic.forever(function () {
    microIoT.microIoT_showUserText(0, "DFRobot")
    microIoT.microIoT_showUserNumber(1, 2019)
    basic.pause(1000)
    microIoT.microIoT_clear()
    basic.pause(1000)
})

```

* Press button A to send data to IoT

```blocks
input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_SendMessage("mess", microIoT.TOPIC.topic_0)
})
microIoT.microIoT_WIFI("yourSSID", "yourPASSWORD")
microIoT.microIoT_MQTT(
"yourIotId",
"yourIotPwd",
"yourIotTopic",
microIoT.SERVERS.China
)
basic.forever(function () {
	
})
```

* Press button A to send data to ThingSpeak

```blocks
input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_http_TK_GET(
    "your write api key",
    "DFRobot",
    "2020",
    "",
    "",
    "",
    "",
    "",
    0
    )
})
microIoT.microIoT_WIFI("yourSSID", "yourPASSWORD")
basic.forever(function () {
	
})

```

* Press A to send data to IFTTT

```blocks
input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_http_post(
    "",
    "",
    "",
    10000
    )
})
microIoT.microIoT_WIFI("yourSSID", "yourPASSWORD")
microIoT.microIoT_http_IFTTT("yourEvent", "yourKey")
basic.forever(function () {
	
})

```

* Press button A to light up RGB LEDs 0 to 3 in yellow

```blocks
input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_setIndexColor(microIoT.microIoT_ledRange(0, 3), 0xffff00)
})
basic.forever(function () {
	
})

```

* Control servo and motor
```blocks
microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
microIoT.microIoT_MotorRun(microIoT.aMotors.M1, microIoT.Dir.CW, 0)
basic.forever(function () {
	
})
```

## License

MIT

Copyright (c) 2020, microbit/micropython Chinese community  


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

