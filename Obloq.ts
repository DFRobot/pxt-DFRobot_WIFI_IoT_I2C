/*！
 * @file pxt-DFRobot_WIFI_IoT_I2C/Obloq.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1577.html)
 * @n Obloq is a serial port of WIFI connection module, Obloq can connect 
 *    to Microsoft Azure IoT and other standard MQTT protocol IoT.
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	MIT Lesser General Public License
 *
 * @author [email](jie.tang@dfrobot.com)
 */


/**
 *Obloq implementation method.
 */
//% weight=10 color=#e7660b icon="\uf1eb" block="DFRobotWiFiIoTModuleI2C"
namespace DFRobotWiFiIoTI2C {
    
    const OBLOQ_MQTT_EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn"
    const OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL = "api.beebotte.com"
    const OBLOQ_MQTT_EASY_IOT_SERVER_EN = "iot.dfrobot.com"
    const microIoT_WEBHOOKS_URL = "maker.ifttt.com"
    const OBLOQ_MQTT_EASY_IOT_SERVER_TK = "api.thingspeak.com"

    let IIC_ADDRESS = 0x16
    let Topic0CallBack: Action = null;
    let Topic1CallBack: Action = null;
    let Topic2CallBack: Action = null;
    let Topic3CallBack: Action = null;
    let Topic4CallBack: Action = null;
    let Wifi_Status = 0x00

    let microIoT_WEBHOOKS_KEY = ""
    let microIoT_WEBHOOKS_EVENT = ""
    let microIoT_THINGSPEAK_KEY = ""
    let microIoT_BEEBOTTE_Token = ""

    let READmode = 0x00
    let Wifimode = 0x00
    let SET_PARA = 0x01
    let RUN_COMMAND = 0x02
    let HTTP_Mode = 0x00

    /*set para*/
    let SETWIFI_NAME = 0x01
    let SETWIFI_PASSWORLD = 0x02
    let SETMQTT_SERVER = 0x03
    let SETMQTT_PORT = 0x04
    let SETMQTT_ID = 0x05
    let SETMQTT_PASSWORLD = 0x06
    let SETHTTP_IP = 0x07
    let SETHTTP_PORT = 0x08

    /*run command*/
    let SEND_PING = 0x01
    let CONNECT_WIFI = 0x02
    let RECONNECT_WIFI = 0x03
    let DISCONECT_WIFI = 0x04
    let CONNECT_MQTT = 0x05
    let SUB_TOPIC0 = 0x06
    let SUB_TOPIC1 = 0x07
    let SUB_TOPIC2 = 0x08
    let SUB_TOPIC3 = 0x09
    let SUB_TOPIC4 = 0x0A
    let PUB_TOPIC0 = 0x0B
    let PUB_TOPIC1 = 0x0C
    let PUB_TOPIC2 = 0x0D
    let PUB_TOPIC3 = 0x0E
    let PUB_TOPIC4 = 0x0F
    let GET_URL = 0x10
    let POST_URL = 0x11
    let PUT_URL = 0x12
    let GET_VERSION = 0x13
    let versionState = 0


    /*read para value*/
    let READ_PING = 0x01
    let READ_WIFISTATUS = 0x02
    let READ_IP = 0x03
    let READ_MQTTSTATUS = 0x04
    let READ_SUBSTATUS = 0x05
    let READ_TOPICDATA = 0x06
    let HTTP_REQUEST = 0x10
    let READ_VERSION = 0x12

    /*para status */
    let PING_OK = 0x01
    let WIFI_DISCONNECT = 0x00
    let WIFI_CONNECTING = 0x02
    let WIFI_CONNECTED = 0x03
    let MQTT_CONNECTED = 0x01
    let MQTT_CONNECTERR = 0x02
    let SUB_TOPIC_OK = 0x01
    let SUB_TOPIC_Ceiling = 0x02
    let DISCONNECT_MQTT = 0x15


    let microIoTStatus = ""
    let WIFI_NAME = ""
    let WIFI_PASSWORLD = ""
    let MQTT_SERVER = ""
    let MQTT_PORT = ""
    let MQTT_ID = ""
    let MQTT_PASSWORLD = ""
    let Topic_0 = ""
    let Topic_1 = ""
    let Topic_2 = ""
    let Topic_3 = ""
    let Topic_4 = ""
    let RECDATA = ""
    let HTTP_IP = ""
    let HTTP_PORT = ""
    let microIoT_IP = "0.0.0.0"
    let G_city = 0;
    let mqttState = 0;
    let wifiConnected = 0;

    export enum SERVERS {
        //% blockId=SERVERS_China block="EasyIoT_CN"
        China,
        //% blockId=SERVERS_English block="EasyIoT_EN"
        English,
        //% block="SIOT"
        SIOT
    }

    export enum TOPIC {
        topic_0 = 0,
        topic_1 = 1,
        topic_2 = 2,
        topic_3 = 3,
        topic_4 = 4
    }

    export class PacketMqtt {
        public message: string;
    }

    function microIoT_setPara(cmd: number, para: string): void {
        let buf = pins.createBuffer(para.length + 4);
        buf[0] = 0x1E
        buf[1] = SET_PARA
        buf[2] = cmd
        buf[3] = para.length
        for (let i = 0; i < para.length; i++)
            buf[i + 4] = para[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function microIoT_runCommand(cmd: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function microIoT_readStatus(para: number): number {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = READmode
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        return recbuf[1]
    }

    function microIoT_readValue(para: number): string {
        let buf = pins.createBuffer(3);
        let paraValue = 0x00
        let tempLen = 0x00
        let dataValue = ""
        buf[0] = 0x1E
        buf[1] = READmode
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        microIoT_CheckStatus("READ_IP");
        return RECDATA
    }

    function microIoT_ParaRunCommand(cmd: number, data: string): void {
        let buf = pins.createBuffer(data.length + 4)
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        buf[3] = data.length
        for (let i = 0; i < data.length; i++)
            buf[i + 4] = data[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);

    }

    function microIoT_CheckStatus(cmd: string): void {
        let startTime = input.runningTime();
        let currentTime = 0;
        while (true) {
            currentTime = input.runningTime();
            if (microIoTStatus == cmd) {
                serial.writeString("OKOK\r\n");
                return;
            }
            basic.pause(50);
            if (versionState == 1) {
                if ((currentTime - startTime) > 20000)
                    return;
            }

        }
    }

    /**
     * Read IR sensor value V2.
     */

    //% advanced=true shim=i2c_1::init
    function init(): void {
        return;
    }

    

    /**
    * WiFi configuration
    * @param SSID to SSID ,eg: "yourSSID"
    * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
    */

    //% weight=100
    //% blockId=WiFi_IoT_I2C_WIFI_Setup block="Wi-Fi configure name: %SSID| password：%PASSWORD start connection"
    export function WIFISetup(SSID: string, PASSWORD: string): void {
        init();
        let Version = DFRobotWiFiIoTI2C.getVersion();
        if (Version == "V4.0"){
            versionState = 1;
            let buf = pins.createBuffer(3);
            buf[0] = 0x1E;
            buf[1] = 0x02;
            buf[2] = 0x17;
            pins.i2cWriteBuffer(IIC_ADDRESS, buf);
            basic.pause(2000)
        }
        
        microIoT_setPara(SETWIFI_NAME, SSID)
        microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        Wifimode = WIFI_CONNECTED
    }

    /**
     * MQTT configuration
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_ID to IOT_ID ,eg: "yourIotId"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
     * @param IP to IP ,eg: "192.168."
    */

    //% weight=90
    //% blockExternalInputs=1
    //% blockId=WiFi_IoT_I2C_MQTT block="MQTT configure|IoT_ID(user):%IOT_ID|IoT_PWD(password):%IOT_PWD|Topic(default topic_0):%IOT_TOPIC|server:%SERVERS||IP:%IP"
    export function mqttSetup(
        IOT_ID: string, IOT_PWD: string,
        IOT_TOPIC: string,servers: SERVERS, IP?: string):
        void {
        
        if (servers == SERVERS.China) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_CHINA)
        } else if (servers == SERVERS.English) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_EN)
        } 
        // else if(servers == SERVERS.Global){
        //     microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL)
        // }
        else{microIoT_setPara(SETMQTT_SERVER, IP)}
        microIoT_setPara(SETMQTT_PORT, "1883")//1883
        microIoT_setPara(SETMQTT_ID, IOT_ID)
        microIoT_setPara(SETMQTT_PASSWORLD, IOT_PWD)
        serial.writeString("wifi conneced ok\r\n");
        microIoT_runCommand(CONNECT_MQTT);
        microIoT_CheckStatus("MQTTConnected");
        serial.writeString("mqtt connected\r\n");
      
        basic.pause(100);
        Topic_0 = IOT_TOPIC
        microIoT_ParaRunCommand(SUB_TOPIC0, IOT_TOPIC);
        microIoT_CheckStatus("SubTopicOK");
        serial.writeString("sub topic ok\r\n");

    }

    /**
     * Add an MQTT subscription
     * @param IOT_TOPIC ,eg: "yourIotTopic"
     */

    //% weight=70
    //% blockId=WiFi_IoT_I2C_add_topic
    //% block="subscribe additional %top |: %IOT_TOPIC"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function mqttAddTopic(top: TOPIC, IOT_TOPIC: string): void {
        microIoT_ParaRunCommand((top + 0x06), IOT_TOPIC);
        microIoT_CheckStatus("SubTopicOK");

    }

    /**
     * MQTT sends information to the corresponding subscription
     * @param Mess to Mess ,eg: "mess"
     */

    //% weight=80
    //% blockId=WiFi_IoT_I2C_SendMessage block="send message %Mess| to |%TOPIC"
    export function mqttSendMessageMore(Mess: string, Topic: TOPIC): void {
        let topic = 0

        switch (Topic) {
            case TOPIC.topic_0:
                topic = PUB_TOPIC0
                break;
            case TOPIC.topic_1:
                topic = PUB_TOPIC1
                break;
            case TOPIC.topic_2:
                topic = PUB_TOPIC2
                break;
            case TOPIC.topic_3:
                topic = PUB_TOPIC3
                break;
            case TOPIC.topic_4:
                topic = PUB_TOPIC4
                break;
            default:
                break;

        }
        microIoT_ParaRunCommand(topic, Mess)

    }

    function microIoT_callback(top: TOPIC, a: Action): void {
        switch (top) {
            case TOPIC.topic_0:
                Topic0CallBack = a;
                break;
            case TOPIC.topic_1:
                Topic1CallBack = a;
                break;
            case TOPIC.topic_2:
                Topic2CallBack = a;
                break;
            case TOPIC.topic_3:
                Topic3CallBack = a;
                break;
            case TOPIC.topic_4:
                Topic4CallBack = a;
                break;
            default:
                break;
        }
    }

    /**
     * MQTT processes the subscription when receiving message
     */

    //% weight=60
    //% blockId=WiFi_IoT_I2C_MQTT_Event block="on received %top"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function mqttCallbackUserMore(top: TOPIC, cb: (message: string) => void) {
        microIoT_callback(top, () => {
            const packet = new PacketMqtt()
            packet.message = RECDATA
            cb(packet.message)
        });
    }

    /**
    * IFTTT configuration
    * @param EVENT to EVENT ,eg: "yourEvent"
    * @param KEY to KEY ,eg: "yourKey"
    */

    //% weight=50
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=WiFi_IoT_I2C_IFTTT_Configure
    //% block="IFTTT configure|event: %EVENT|key: %KEY"
    export function IFTTTConfigure(EVENT: string, KEY: string): void {
        microIoT_WEBHOOKS_EVENT = EVENT
        microIoT_WEBHOOKS_KEY = KEY
    }
    /**Beebotte Configure 
     * @param token ,eg: "Your Channel Token"
     */
    //%weight=30
    //%blockID=WiFi_IoT_I2C_BeeBotte_Configura block="BeeBotte configura key: %token "
    export function token(token:string):void{
        microIoT_BEEBOTTE_Token = token;
    }
    /**BeeBotte send data
     * @param channel ,eg: "Your Channel Name"
     * @param resource ,eg: "Your Resource Name"
     * @param data ,eg: "Send Message"
     */
     //%weight=29
    //%blockID=WiFi_IoT_I2C_BeeBotte_sendmessage block="BeeBotte Channel: %channel Resource: %resource send value %data "
    export function sendmessage(channel:string, resource:string, data:string){
        microIoT_setPara(SETHTTP_IP, OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL)
        let tempStr = ""
        tempStr = "v1/data/write/" + channel + "/" + resource + "?token=" + microIoT_BEEBOTTE_Token +",{\"data\":" + data + "}\r\n";
        microIoT_ParaRunCommand(POST_URL, tempStr);
    }
    function microIoT_http_wait_request(time: number): string {
        if (time < 100) {
            time = 100
        }
        let timwout = time / 100
        let _timeout = 0
        while (true) {
            basic.pause(100)
            if (microIoTStatus == "HTTP_REQUEST") {
                microIoTStatus = "";
                return RECDATA
            } else if (microIoTStatus == "HTTP_REQUESTFailed") {
                microIoTStatus = "";
                return "requestFailed"
            }
            _timeout += 1
            if (_timeout > timwout) {
                return "timeOut"
            }
        }
    }
    
    /**
     * ThingSpeak configuration
     * @param KEY to KEY ,eg: "your Key"
     */
    //% weight=31
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=WiFi_IoT_I2C_ThingSpeak_configura
    //% block="ThingSpeak configure key: %KEY"
    export function ThingSpeakConfigure(KEY: string): void {
        microIoT_THINGSPEAK_KEY = KEY
    }

    /**
    * ThingSpeak configured and sent data
    * @param field1 ,eg: 2020
    */

    //% weight=30
    //% blockId=WiFi_IoT_I2C_ThingSpeak_Configure
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% block="ThingSpeak send value1: %field1||value2: %field2|value3: %field3|value4: %field4|value5: %field5|value6: %field6|value7: %field7 value8: %field8" 
    export function ThingSpeakSend(field1: string, field2?: string, field3?: string, field4?: string, field5?: string, field6?: string, field7?: string, field8?: string): void {
        microIoT_setPara(SETHTTP_IP, OBLOQ_MQTT_EASY_IOT_SERVER_TK)
        let tempStr = ""
        tempStr = "update?api_key=" + microIoT_THINGSPEAK_KEY + "&field1=" + field1 
	    if(field2 != undefined)
            tempStr += "&field2=" + field2
        if(field3 != undefined)
            tempStr += "&field3=" + field3
        if(field4 != undefined)
            tempStr += "&field4=" + field4
        if(field5 != undefined)
            tempStr += "&field5=" + field5
        if(field6 != undefined)
            tempStr += "&field6=" + field6
        if(field7 != undefined)
            tempStr += "&field7=" + field7
        if(field8 != undefined)
            tempStr += "&field8=" + field8
        microIoT_ParaRunCommand(GET_URL, tempStr);
    }

    /**
     * IFTTT send data
     * time(ms): private long maxWait
     * @param value1 ,eg: Hi
     * @param value2 ,eg: DFRobot
     * @param value3 ,eg: 2020
    */

    //% weight=40
    //% blockId=WiFi_IoT_I2C_IFTTT_Send
    //% block="IFTTT send value1:%value1|value2:%value2|value3:%value3"
    //% inlineInputMode=inline
    export function IFTTTSend(value1: string, value2: string, value3: string): void {
        microIoT_setPara(SETHTTP_IP, microIoT_WEBHOOKS_URL)
        let tempStr = ""
        tempStr = "trigger/" + microIoT_WEBHOOKS_EVENT + "/with/key/" + microIoT_WEBHOOKS_KEY + ",{\"value1\":\"" + value1 + "\",\"value2\":\"" + value2 + "\",\"value3\":\"" + value3 + "\" }" + "\r"
        microIoT_ParaRunCommand(POST_URL, tempStr)
    }


    /**
     * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param IP to IP ,eg: "0.0.0.0"
     * @param PORT to PORT ,eg: 80
    */
	
    //% weight=28
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=WiFi_IoT_UART_http_setup
    //% block="configure http ip: %IP port: %PORT  start connection"
    
    export function httpSetup(IP: string, PORT: number):void {
        microIoT_setPara(SETHTTP_IP, IP)
        microIoT_setPara(SETHTTP_PORT, PORT.toString())
        //microIoT_runCommand(CONNECT_WIFI)
        //microIoT_CheckStatus("WiFiConnected");
        //Wifi_Status = WIFI_CONNECTED
    }
    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
	
    //% weight=27
    //% blockId=WiFi_IoT_I2C_http_get
    //% block="http(get) | url %url| timeout(ms) %time"
    
    export function httpGet(url: string, time: number): string {
        microIoT_ParaRunCommand(GET_URL, url)
        return "a"//microIoT_http_wait_request(time);
    }


    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=26
    //% blockId=WiFi_IoT_I2C_http_post
    //% block="http(post) | url %url| content %content| timeout(ms) %time"
    
    export function httpPost(url: string, content: string, time: number): string {
        let tempStr = ""
        tempStr = url + "," + content;
        microIoT_ParaRunCommand(POST_URL, tempStr)
        return microIoT_http_wait_request(time);
    }

     /**
     * The HTTP put request,Obloq.put() can only be used for http protocol!
     * url(string): URL; content(string):content; time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
	
    //%weight=25
    //% blockId=WiFi_IoT_I2C_http_put
    //% block="http(put) | url %url| content %content| timeout(ms) %time"
    
    export function httpPut(url: string, content: string, time: number): string {
        let tempStr = ""
        tempStr = url + "," + content;
        microIoT_ParaRunCommand(PUT_URL, tempStr)
        return microIoT_http_wait_request(time);
    }
	
    /**
     * Get the software version.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */

    //% weight=20
    //% blockId=WiFi_IoT_I2C_get_version
    //% block="get version"
    export function getVersion(): string {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E;
        buf[1] = RUN_COMMAND;
        buf[2] = GET_VERSION;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        microIoT_CheckStatus("READ_VERSION");
        return RECDATA
    }

    function microIoT_GetData(len: number): void {
        RECDATA = ""
        let tempbuf = pins.createBuffer(1)
        tempbuf[0] = 0x22
        pins.i2cWriteBuffer(IIC_ADDRESS, tempbuf);
        let tempRecbuf = pins.createBuffer(len)
        tempRecbuf = pins.i2cReadBuffer(IIC_ADDRESS, len, false)
        for (let i = 0; i < len; i++) {
            RECDATA += String.fromCharCode(tempRecbuf[i])
        }
    }

    function microIoT_InquireStatus(): void {

        let buf = pins.createBuffer(3)
        let tempId = 0
        let tempStatus = 0
        buf[0] = 0x1E
        buf[1] = READmode
        buf[2] = 0x06
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        tempId = recbuf[0]
        tempStatus = recbuf[1]
        switch (tempId) {
            case READ_PING:
                if (tempStatus == PING_OK) {
                    microIoTStatus = "PingOK"
                } else {
                    microIoTStatus = "PingERR"
                }
                break;
            case READ_WIFISTATUS:
                if (tempStatus == WIFI_CONNECTING) {
                    microIoTStatus = "WiFiConnecting"
                } else if (tempStatus == WIFI_CONNECTED) {
                    microIoTStatus = "WiFiConnected"
                } else if (tempStatus == WIFI_DISCONNECT) {
                    microIoTStatus = "WiFiDisconnect"
                    wifiConnected++;
                    if (wifiConnected == 2) {
                        wifiConnected = 0;
                        microIoT_runCommand(WIFI_CONNECTED);
                    }
                } else {
                } break;
            case READ_MQTTSTATUS:
                if (tempStatus == MQTT_CONNECTED) {
                    microIoTStatus = "MQTTConnected"
                    mqttState = 1;
                } else if (tempStatus == MQTT_CONNECTERR) {
                    microIoTStatus = "MQTTConnectERR"

                } else if (tempStatus == 0) {//新版本修复重连
                    microIoT_runCommand(DISCONNECT_MQTT);
                    microIoT_runCommand(WIFI_CONNECTED);
                }
                break;
            case READ_SUBSTATUS:
                if (tempStatus == SUB_TOPIC_OK) {
                    microIoTStatus = "SubTopicOK"
                } else if (tempStatus == SUB_TOPIC_Ceiling) {
                    microIoTStatus = "SubTopicCeiling"
                } else {
                    microIoTStatus = "SubTopicERR"
                }
                break;
            case READ_IP:
                microIoTStatus = "READ_IP"
                microIoT_GetData(tempStatus)
                microIoT_IP = RECDATA
                if (mqttState == 1) {
                    mqttState = 0;
                    microIoT_runCommand(DISCONNECT_MQTT);
                    basic.pause(200)
                    microIoT_runCommand(CONNECT_MQTT);
                    //microIoT_CheckStatus("MQTTConnected");
                }
                break;
            case SUB_TOPIC0:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic0CallBack != null) {
                    Topic0CallBack();
                }
                break;
            case SUB_TOPIC1:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic1CallBack != null) {
                    Topic1CallBack();
                }
                break;
            case SUB_TOPIC2:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic2CallBack != null) {
                    Topic2CallBack();
                }
                break;
            case SUB_TOPIC3:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic3CallBack != null) {
                    Topic3CallBack();
                }
                break;
            case SUB_TOPIC4:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic4CallBack != null) {
                    Topic4CallBack();
                }
                break;
            case HTTP_REQUEST:
                microIoTStatus = "HTTP_REQUEST"
                microIoT_GetData(tempStatus)
                break;
            case READ_VERSION:
                microIoTStatus = "READ_VERSION"
                microIoT_GetData(tempStatus)
                break;
            default:
                break;
        }
        basic.pause(200);
    }
    
    basic.forever(function () {
        microIoT_InquireStatus();
    })

}
