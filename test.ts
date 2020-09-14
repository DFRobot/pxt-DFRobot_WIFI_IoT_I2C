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