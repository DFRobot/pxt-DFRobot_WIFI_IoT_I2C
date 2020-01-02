// 在此处添加您的代码
input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_SendMessage("DFRobot", microIoT.TOPIC.topic_0)
    microIoT.microIoT_motorStop(microIoT.aMotors.M1)
})
input.onButtonPressed(Button.AB, function () {
    microIoT.microIoT_http_post(
        "DFRobot",
        "2019",
        "31",
        10000
    )
})
input.onButtonPressed(Button.B, function () {
    microIoT.microIoT_http_TK_GET(
        "your write api key",
        "DFRObot",
        "2019",
        "12",
        "31",
        "",
        "",
        "",
        0
    )
})
microIoT.microIoT_initDisplay()
microIoT.microIoT_WIFI("yourSSID", "yourPASSWORD")
microIoT.microIoT_MQTT(
    "yourIotId",
    "yourIotPwd",
    "yourIotTopic",
    microIoT.SERVERS.China
)
microIoT.microIoT_http_IFTTT("yourEvent", "yourKey")
microIoT.microIoT_setBrightness(100)
microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
microIoT.microIoT_showColor(0xff0000)
basic.pause(1000)
microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
microIoT.microIoT_ledBlank()
microIoT.microIoT_MotorRun(microIoT.aMotors.M1, microIoT.Dir.CW, 255)
basic.forever(function () {
    microIoT.microIoT_setIndexColor(0, 0x00ff00)
    microIoT.microIoT_showUserText(0, "DFRobot")
    microIoT.microIoT_showUserNumber(0, 2019)
})
