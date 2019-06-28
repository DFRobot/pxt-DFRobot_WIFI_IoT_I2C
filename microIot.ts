/*！
 * @file pxt-microIoT/microIoT.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1577.html)
 * @n Obloq is a serial port of WIFI connection module, Obloq can connect 
 *    to Microsoft Azure IoT and other standard MQTT protocol IoT.
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	GNU Lesser General Public License
 *
 * @author [email](xiao.wu@dfrobot.com)
 * @version  V0.1
 * @date  2019-05-31
 */


//debug
const OBLOQ_DEBUG = false
const OBLOQ_MQTT_DEFAULT_SERVER = true
//DFRobot easy iot
const OBLOQ_MQTT_EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn"
const OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL = "iot.dfrobot.com"
const OBLOQ_MQTT_EASY_IOT_PORT = 1883
//other iot
const OBLOQ_MQTT_USER_IOT_SERVER = "---.-----.---"
const OBLOQ_MQTT_USER_IOT_PORT = 0
//topic max number
const OBLOQ_MQTT_TOPIC_NUM_MAX = 5
//wrong type
const OBLOQ_ERROR_TYPE_IS_SUCCE = 0
const OBLOQ_ERROR_TYPE_IS_ERR = 1
const OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_TIMEOUT = -1
const OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_FAILURE = -2
const OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_TIMEOUT = -3
const OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_TIMEOUT = -4
const OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_FAILURE = -5
const OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_FAILURE = -6
//data type
const OBLOQ_STR_TYPE_IS_NONE = ""
const OBLOQ_BOOL_TYPE_IS_TRUE = true
const OBLOQ_BOOL_TYPE_IS_FALSE = false

/**
 *Obloq implementation method.
 */
//% weight=10 color=#008B00 icon="\uf1eb" block="microIoT"
namespace microIoT {
    let Topic0CallBack: Action = null;
    let Topic1CallBack: Action = null;
    let Topic2CallBack: Action = null;
    let Topic3CallBack: Action = null;
    let Topic4CallBack: Action = null;
    let Wifi_Status = 0x00
    let microIoT_Mode = 0x00
    let MQTT = 0x00
    let HTTP = 0x01

    let READ_STATUS = 0x00
    let SET_PARA = 0x01
    let RUN_COMMAND = 0x02

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
    let PING_ERR = 0x00
    let PING_OK = 0x01
    let WIFI_DISCONNECT = 0x00
    let WIFI_CONNECTING = 0x02
    let WIFI_CONNECTED = 0x03
    let MQTT_CONNECTED = 0x01
    let MQTT_CONNECTERR = 0x02
    let SUB_TOPIC_OK = 0x01
    let SUB_TOPIC_Ceiling = 0x02
    let SUB_TOPIC_ERR = 0x03

    let microIoTStatus = ""
    let microIoTData = ""
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

    export enum aMotors {
        //% blockId="M1" block="M1"
        M1 = 0,
        //% blockId="M2" block="M2"
        M2 = 1,
        //% blockId="ALL" block="ALL"
        ALL = 2
    }

    export enum aServos {
        //% blockId="S1" block="S1"
        S1 = 0,
        //% blockId="S2" block="S2"
        S2 = 1
    }

    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 0x0,
        //% blockId="CCW" block="CCW"
        CCW = 0x1
    }

    export enum SERVERS {
        //% blockId=SERVERS_China block="China"
        China,
        //% blockId=SERVERS_Global block="Global"
        Global
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

    //% weight=50
    //% blockId=microIoT_ServoRun block="Servo|%index|angle|%angle"
    //% angle.min=0 angle.max=180
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function microIoT_ServoRun(index: aServos, angle: number): void {
        let buf = pins.createBuffer(2);
        if (index == 0) {
            buf[0] = 0x14;
        }
        if (index == 1) {
            buf[0] = 0x15;
        }
        buf[1] = angle;
        pins.i2cWriteBuffer(0x10, buf);
    }

    //% weight=49
    //% blockId=microIoT_MotorRun block="Motor|%index|dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function microIoT_MotorRun(index: aMotors, direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
        }else if (index == 1) {
            buf[0] = 0x02;
        } else if (index == 2){
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = speed;
            pins.i2cWriteBuffer(0x10, buf);
            buf[0] = 0x02;
        }else{
        }
        buf[1] = direction;
        buf[2] = speed;
        pins.i2cWriteBuffer(0x10, buf);
    }
    //% weight=48
    //% blockId=microIoT_motorStop block="Motor stop|%motors"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2 
    export function microIoT_motorStop(motors: aMotors): void {
        let buf = pins.createBuffer(3);
        if (motors == 0) {
            buf[0] = 0x00;
        }else if (motors == 1) {
            buf[0] = 0x02;
        } else if (motors == 2){
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf);
            buf[0] = 0x02;
        }
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(0x10, buf);
    }

    /*
    //% weight=47
    //% blockId=microIoT_motorStopAll block="Motor Stop All"
    export function microIoT_motorStopAll(): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x00;
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(0x10, buf);
        buf[0] = 0x02;
        pins.i2cWriteBuffer(0x10, buf);
    }*/

    function microIoT_setPara(cmd: number, para: string): void {
        let buf = pins.createBuffer(para.length + 4);
        buf[0] = 0x1E
        buf[1] = SET_PARA
        buf[2] = cmd
        buf[3] = para.length
        for (let i = 0; i < para.length; i++)
            buf[i + 4] = para[i].charCodeAt(0)
        pins.i2cWriteBuffer(0x10, buf);
    }

    function microIoT_runCommand(cmd: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        pins.i2cWriteBuffer(0x10, buf);
    }

    function microIoT_readStatus(para: number): number {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = para
        pins.i2cWriteBuffer(0x10, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(0x10, 2, false)
        return recbuf[1]
    }

    function microIoT_readValue(para: number): string {
        let buf = pins.createBuffer(3);
        let paraValue = 0x00
        let tempLen = 0x00
        let dataValue = ""
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = para
        pins.i2cWriteBuffer(0x10, buf);
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
        pins.i2cWriteBuffer(0x10, buf);
    }
    function microIoT_CheckStatus(cmd: string): void {
        while (true) {
            if (microIoTStatus == cmd) {
                serial.writeString("OKOK\r\n");
                return;
            }
            basic.pause(50);
        }
    }
    /**
     * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_ID to IOT_ID ,eg: "yourIotId"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
    */
    //% weight=100
    //% blockExternalInputs=1
    //% blockId=microIoT_MQTT block="Micro:IoT setup mqtt|Wi-Fi: |name: %SSID| password：%PASSWORD| IOT_ID: %IOT_ID| IOT_PWD :%IOT_PWD| IoT service:|(default topic_0) Topic: %IOT_TOPIC| start connection:| server: %SERVERS"
    export function microIoT_MQTT(SSID: string, PASSWORD: string,
        IOT_ID: string, IOT_PWD: string,
        IOT_TOPIC: string, servers: SERVERS):
        void {
        microIoT_Mode = MQTT
        microIoT_setPara(SETWIFI_NAME, SSID)
        microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        if (servers == SERVERS.China) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_CHINA)
        } else {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL)
        }
        microIoT_setPara(SETMQTT_PORT, "1883")
        microIoT_setPara(SETMQTT_ID, IOT_ID)
        microIoT_setPara(SETMQTT_PASSWORLD, IOT_PWD)
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        /*
        while (microIoT_readStatus(READ_WIFISTATUS) != WIFI_CONNECTED) {
            basic.pause(200)
        }*/
        serial.writeString("wifi conneced ok\r\n");
        Wifi_Status = WIFI_CONNECTED
        microIoT_runCommand(CONNECT_MQTT);
        microIoT_CheckStatus("MQTTConnected");
        serial.writeString("mqtt connected\r\n");
        /*
        while (microIoT_readStatus(READ_MQTTSTATUS) != MQTT_CONNECTED) {
            basic.pause(200)
        }*/
        Topic_0 = IOT_TOPIC
        microIoT_ParaRunCommand(SUB_TOPIC0, IOT_TOPIC);
        microIoT_CheckStatus("SubTopicOK");
        serial.writeString("sub topic ok\r\n");
        /*    
        while (microIoT_readStatus(READ_SUBSTATUS) != SUB_TOPIC_OK) {
            basic.pause(200)
        }*/

    }

    //% weight=200
    //% blockId=microIoT_add_topic
    //% block="subscribe additional %top |: %IOT_TOPIC"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    export function microIoT_add_topic(top: TOPIC, IOT_TOPIC: string): void {
        microIoT_ParaRunCommand((top+0x06), IOT_TOPIC);
        /*
        while (microIoT_readStatus(READ_SUBSTATUS) != SUB_TOPIC_OK) {
            basic.pause(200)
        }*/
        microIoT_CheckStatus("SubTopicOK");
        
    }
    /**
     * @param Mess to Mess ,eg: "mess"
     */
    //% weight=99
    //% blockId=microIoT_SendMessage block="Send Message %string| to |%TOPIC"
    export function microIoT_SendMessage(Mess: string, Topic: TOPIC): void {
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

    //% weight=98
    //% blockGap=60
    //% blockId=obloq_mqtt_callback_user_more block="on %top |received"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function microIoT_MQTT_Event(top: TOPIC, cb: (message: string) => void) {
        microIoT_callback(top, () => {
            const packet = new PacketMqtt()
            packet.message = RECDATA
            cb(packet.message)
        });
    }


    /**
     * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IP to IP ,eg: "0.0.0.0"
     * @param PORT to PORT ,eg: 80
    */
    //% weight=80
    //% blockId=microIoT_http_setup
    //% block="Micro:IoT setup http | Wi-Fi: | name: %SSID| password: %PASSWORD| http config: | ip: %IP| port: %PORT| start connection"
    export function microIoT_http_setup(SSID: string, PASSWORD: string,
        IP: string, PORT: number):
        void {
        microIoT_Mode = HTTP
        microIoT_setPara(SETWIFI_NAME, SSID)
        microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        microIoT_setPara(SETHTTP_IP, IP)
        microIoT_setPara(SETHTTP_PORT, PORT.toString())
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        Wifi_Status = WIFI_CONNECTED
    }

    function microIoT_http_wait_request(time: number) :string{
        if(time < 100){
            time = 100
        }
        let timwout = time / 100
        let _timeout = 0
        while(true){
            basic.pause(100)
            if (microIoTStatus == "HTTP_REQUEST"){
                return RECDATA
            } else if (microIoTStatus == "HTTP_REQUESTFailed"){
                return "requestFailed"
            }
            _timeout += 1
            if (_timeout > timwout){
                return "timeOut"
            }
        }
    }
    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=79
    //% blockId=MicroitIoT_http_get
    //% block="http(get) | url %url| timeout(ms) %time"
    //% advanced=false
    export function microIoT_http_get(url: string, time: number): string {
        microIoT_ParaRunCommand(GET_URL, url)
        return microIoT_http_wait_request(time);
    }

    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=78
    //% blockId=microIoT_http_post
    //% block="http(post) | url %url| content %content| timeout(ms) %time"
    export function microIoT_http_post(url: string, content: string, time: number): string {
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
    //% weight=77
    //% blockId=microIoT_http_put
    //% block="http(put) | url %url| content %content| timeout(ms) %time"
    export function microIoT_http_put(url: string, content: string, time: number): string {
        let tempStr = ""
        tempStr = url + "," + content;
        microIoT_ParaRunCommand(PUT_URL, tempStr)
        return microIoT_http_wait_request(time);
    }

    /**
     * Get IP address.
    */
    //% weight=51
    //% blockId=microIoT_wifi_ipconfig
    //% block="ipconfig"
    //% advanced=true
    export function microIoT_wifi_ipconfig(): string {
        return microIoT_IP;
        //microIoT_readValue(READ_IP)
    }


    /**
     * Send the ping.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=49
    //% blockId=Obloq_send_ping
    //% block="sendPing"
    //% advanced=true
    export function microIoT_send_ping(): boolean {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E;
        buf[1] = RUN_COMMAND;
        buf[2] = SEND_PING;
        pins.i2cWriteBuffer(0x10, buf);
        microIoT_CheckStatus("PingOK");
        /*
        while (true) {
            if (microIoTStatus == "PingOK") {
                break;
            }
            basic.pause(50);
        }*/
        return true;
    }


    /**
     * Get the software version.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=50
    //% blockId=microIoT_get_version
    //% block="get version"
    //% advanced=true
    export function microIoT_get_version(): string {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E;
        buf[1] = RUN_COMMAND;
        buf[2] = GET_VERSION;
        pins.i2cWriteBuffer(0x10, buf);
        microIoT_CheckStatus("READ_VERSION");
        return RECDATA
    }


    /**
     * Heartbeat request.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=48
    //% blockId=microIoT_get_heartbeat
    //% block="get heartbeat"
    //% advanced=true
    export function microIoT_get_heartbeat(): boolean {
        return true
    }

    /**
     * Stop the heartbeat request.
    */
    //% weight=47
    //% blockId=microIoT_stop_heartbeat
    //% block="stop heartbeat"
    //% advanced=true
    export function microIoT_stop_heartbeat(): boolean {
        return true
    }

    function microIoT_GetData(len: number): void {
        RECDATA = ""
        let tempbuf = pins.createBuffer(1)
        tempbuf[0] = 0x22
        pins.i2cWriteBuffer(0x10, tempbuf);
        let tempRecbuf = pins.createBuffer(len)
        tempRecbuf = pins.i2cReadBuffer(0x10, len, false)
        for (let i = 0; i < len; i++) {
            RECDATA += String.fromCharCode(tempRecbuf[i])
        }
    }

    function microIoT_InquireStatus(): void {
        let buf = pins.createBuffer(3)
        let tempId = 0
        let tempStatus = 0
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = 0x06
        pins.i2cWriteBuffer(0x10, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(0x10, 2, false)
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
                } else {
                }
                break;
            case READ_MQTTSTATUS:
                if (tempStatus == MQTT_CONNECTED) {
                    microIoTStatus = "MQTTConnected"
                } else if (tempStatus == MQTT_CONNECTERR) {
                    microIoTStatus = "MQTTConnectERR"
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



        /**
     * OLED
     */
    //% blockId=oled_show_text
    //% weight=99
    //% line.min=0 line.max=7
    //% text.defl="DFRobot"
    //% block="OLED show line %line|text %text"
    //% shim=OLED::showText
    //% subcategory="OLED"
    export function showUserText(line: number, text: string): void {
        return;
    }
    /**
     * initialises the i2c OLED display
     * @param line line num (8 pixels per line), eg: 0
     * @param n value , eg: 2019
     */
    //% blockId=oled_show_number
    //% weight=98
    //% line.min=0 line.max=7
    //% block="OLED show line %line|number %n"
    //% shim=OLED::showNumber
    //% subcategory="OLED"
    export function showUserNumber(line: number, n: number): void {
        return;
    }

    /**
     * clears the screen.
     */
    //% blockId=oled_clear_screen
    //% block="clear OLED display"
    //% icon="\uf1ec" 
    //% shim=OLED::clearDisplay
    //% subcategory="OLED"
    export function clear(): void {
        return;
    }

    //% blockId=oled_draw_Line
    //% block="OLED draw line start x1%x1|y1%y1| end x2%x2|y2%y2"
    //% icon="\uf1ec" 
    //% shim=OLED::drawLine
    //% subcategory="OLED"
    export function drawUserLine(x1: number, y1: number, x2: number, y2: number):void{
        return;
    }
    

} 