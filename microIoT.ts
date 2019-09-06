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
//const OBLOQ_DEBUG = false
//const OBLOQ_MQTT_DEFAULT_SERVER = true
//DFRobot easy iot
const OBLOQ_MQTT_EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn"
const OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL = "mqtt.beebotte.com"
//const OBLOQ_MQTT_EASY_IOT_PORT = 1883
//other iot
//const OBLOQ_MQTT_USER_IOT_SERVER = "---.-----.---"
//const OBLOQ_MQTT_USER_IOT_PORT = 0
//topic max number
//const OBLOQ_MQTT_TOPIC_NUM_MAX = 5
//wrong type
//const OBLOQ_ERROR_TYPE_IS_SUCCE = 0
//const OBLOQ_ERROR_TYPE_IS_ERR = 1
//const OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_TIMEOUT = -1
//const OBLOQ_ERROR_TYPE_IS_WIFI_CONNECT_FAILURE = -2
//const OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_TIMEOUT = -3
//const OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_TIMEOUT = -4
//const OBLOQ_ERROR_TYPE_IS_MQTT_CONNECT_FAILURE = -5
//const OBLOQ_ERROR_TYPE_IS_MQTT_SUBTOPIC_FAILURE = -6
//data type
//const OBLOQ_STR_TYPE_IS_NONE = ""
//const OBLOQ_BOOL_TYPE_IS_TRUE = true
//const OBLOQ_BOOL_TYPE_IS_FALSE = false


//天气
//天气
enum LOCATION {
    //%block="Sentosa"
    Sentosa = 0,
    //%block="Pulau Ubin"
    Pulau_Ubin = 1,
    //%block="Pulau Tekong"
    Pulau_Tekong = 2,
    //%block="Jurong Island"
    Jurong_Island = 3,
    //%block="Tuas"
    Tuas = 4,
    //%block="Changi"
    Changi = 5,
    //%block="City"
    City = 6,
    //%block="Woodlands"
    Woodlands = 7,
    //%block="Lim Chu Kang"
    Lim_Chu_Kang = 8,
    //%block="Central Water Catchment"
    Central_Water_Catchment = 9,
    //%block="Bukit Timah"
    Bukit_Timah = 10,
    //%block="Punggol"
    Punggol = 11,
    //%block="Tanglin"
    Tanglin = 12,
    //%block="Novena"
    Novena = 13,
    //%block="Marine Parade"
    Marine_Parade = 14,
    //%block="Tampines"
    Tampines = 15,
    //%block="Jurong East"
    Jurong_East = 16,
    //%block="Paya Lebar"
    Paya_Lebar = 17,
    //%block="Queenstown"
    Queenstown = 18,
    //%block="Kallang"
    Kallang = 19
}

/**
 *Obloq implementation method.
 */
//% weight=10 color=#008B00 icon="\uf1eb" block="microIoT"
namespace microIoT {
    let IIC_ADDRESS = 0x16
    let Topic0CallBack: Action = null;
    let Topic1CallBack: Action = null;
    let Topic2CallBack: Action = null;
    let Topic3CallBack: Action = null;
    let Topic4CallBack: Action = null;
    let Wifi_Status = 0x00
    //let microIoT_Mode = 0x00

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
    //let PING_ERR = 0x00
    let PING_OK = 0x01
    let WIFI_DISCONNECT = 0x00
    let WIFI_CONNECTING = 0x02
    let WIFI_CONNECTED = 0x03
    let MQTT_CONNECTED = 0x01
    let MQTT_CONNECTERR = 0x02
    let SUB_TOPIC_OK = 0x01
    let SUB_TOPIC_Ceiling = 0x02
    //let SUB_TOPIC_ERR = 0x03

    let microIoTStatus = ""
    //let microIoTData = ""
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
        pins.i2cWriteBuffer(0x16, buf);
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
            if (direction == 0x00) {
                buf[1] = 0x01;
            } else {
                buf[1] = 0x00;
            }
        } else if (index == 1) {
            buf[0] = 0x02;
            buf[1] = direction;
        } else if (index == 2) {
            buf[0] = 0x00;
            if (direction == 0x00) {
                buf[1] = 0x01;
            } else {
                buf[1] = 0x00;
            }
            buf[2] = speed;
            pins.i2cWriteBuffer(IIC_ADDRESS, buf);
            buf[0] = 0x02;
            buf[1] = direction;
        } else {
        }
        buf[2] = speed;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }
    //% weight=48
    //% blockId=microIoT_motorStop block="Motor stop|%motors"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2 
    export function microIoT_motorStop(motors: aMotors): void {
        let buf = pins.createBuffer(3);
        if (motors == 0) {
            buf[0] = 0x00;
        } else if (motors == 1) {
            buf[0] = 0x02;
        } else if (motors == 2) {
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(IIC_ADDRESS, buf);
            buf[0] = 0x02;
        }
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    /*
    //% weight=47
    //% blockId=microIoT_motorStopAll block="Motor Stop All"
    export function microIoT_motorStopAll(): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x00;
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        buf[0] = 0x02;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }*/

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
        buf[1] = READ_STATUS
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
        buf[1] = READ_STATUS
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
         */

    //% weight=100
    //% blockId=microIoT_wifi block="Micro:IoT setup |Wi-Fi: |name: %SSID| password：%PASSWORD"
    export function microIoT_WIFI(SSID: string, PASSWORD: string): void {
        microIoT_setPara(SETWIFI_NAME, SSID)
        microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        Wifi_Status = WIFI_CONNECTED
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
    //% blockId=microIoT_MQTT block="Micro:IoT setup mqtt|IOT_ID: %IOT_ID| IOT_PWD :%IOT_PWD| IoT service:|(default topic_0) Topic: %IOT_TOPIC| start connection:| server: %SERVERS"
    export function microIoT_MQTT(/*SSID: string, PASSWORD: string,*/
        IOT_ID: string, IOT_PWD: string,
        IOT_TOPIC: string, servers: SERVERS):
        void {
        //microIoT_Mode = MQTT
        //microIoT_setPara(SETWIFI_NAME, SSID)
        //microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        if (servers == SERVERS.China) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_CHINA)
        } else {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL)
        }
        microIoT_setPara(SETMQTT_PORT, "1883")
        microIoT_setPara(SETMQTT_ID, IOT_ID)
        microIoT_setPara(SETMQTT_PASSWORLD, IOT_PWD)
        //microIoT_runCommand(CONNECT_WIFI)
        //microIoT_CheckStatus("WiFiConnected");
        /*
        while (microIoT_readStatus(READ_WIFISTATUS) != WIFI_CONNECTED) {
            basic.pause(200)
        }*/
        serial.writeString("wifi conneced ok\r\n");
        //Wifi_Status = WIFI_CONNECTED
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
        microIoT_ParaRunCommand((top + 0x06), IOT_TOPIC);
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

    let microIoT_WEBHOOKS_URL = "maker.ifttt.com"
    let microIoT_WEBHOOKS_KEY = ""
    let microIoT_WEBHOOKS_EVENT = ""
    /**
         * @param EVENT to EVENT ,eg: "yourEvent"
         * @param KEY to KEY ,eg: "yourKey"
        */
    //% weight=80
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=microIoT_http_IFTTT
    //% block="Webhooks config:|event: %EVENT|key: %KEY|"
    export function microIoT_http_IFTTT(EVENT: string, KEY: string): void {
        //microIoT_Mode = HTTP
        microIoT_WEBHOOKS_EVENT = EVENT
        microIoT_WEBHOOKS_KEY = KEY
        //microIoT_setPara(SETHTTP_IP, microIoT_WEBHOOKS_URL)
        //microIoT_setPara(SETHTTP_PORT, "80")
        //microIoT_runCommand(CONNECT_WIFI)
        //microIoT_CheckStatus("WiFiConnected");
        //Wifi_Status = WIFI_CONNECTED
    }

    /**
     * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IP to IP ,eg: "0.0.0.0"
     * @param PORT to PORT ,eg: 80
    */
	/*
    //% weight=80
    //% blockId=microIoT_http_setup
    //% block="Micro:IoT setup http | http config: | ip: %IP| port: %PORT| start connection"
    export function microIoT_http_setup(SSID: string, PASSWORD: string,
        IP: string, PORT: number):
        void {
        microIoT_Mode = HTTP
        //microIoT_setPara(SETWIFI_NAME, SSID)
        //microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        microIoT_setPara(SETHTTP_IP, IP)
        microIoT_setPara(SETHTTP_PORT, PORT.toString())
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        Wifi_Status = WIFI_CONNECTED
    }*/

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
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
	/*
    //% weight=79
    //% blockId=MicroitIoT_http_get
    //% block="http(get) | url %url| timeout(ms) %time"
    //% advanced=false
    export function microIoT_http_get(url: string, time: number): string {
        microIoT_ParaRunCommand(GET_URL, url)
        return microIoT_http_wait_request(time);
    }
*/
    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=78
    //% blockId=microIoT_http_post
    //% block="IFTTT(post) | value1 %value1| value2 %value2| value3 %value3| timeout(ms) %time"
    export function microIoT_http_post(value1: string, value2: string, value3: string, time: number): string {
        microIoT_setPara(SETHTTP_IP, microIoT_WEBHOOKS_URL)
        let tempStr = ""
        tempStr = "trigger/" + microIoT_WEBHOOKS_EVENT + "/with/key/" + microIoT_WEBHOOKS_KEY + ",{\"value1\":\"" + value1 + "\",\"value2\":\"" + value2 + "\",\"value3\":\"" + value3 + "\" }" + "\r"
        microIoT_ParaRunCommand(POST_URL, tempStr)
        return microIoT_http_wait_request(time);
    }

    /**
     * The HTTP put request,Obloq.put() can only be used for http protocol!
     * url(string): URL; content(string):content; time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
	/*
    //% weight=77
    //% blockId=microIoT_http_put
    //% block="http(put) | url %url| content %content| timeout(ms) %time"
    export function microIoT_http_put(url: string, content: string, time: number): string {
        let tempStr = ""
        tempStr = url + "," + content;
        microIoT_ParaRunCommand(PUT_URL, tempStr)
        return microIoT_http_wait_request(time);
    }
	*/

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
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
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
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
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
        buf[1] = READ_STATUS
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
    let i_i = 1;
    let j_j = 1;
    //% weight=200
    //% block="initDisplay"
    export function initDisplay(): void {
        cmd(0xAE);  // Set display OFF
        cmd(0xD5);  // Set Display Clock Divide Ratio / OSC Frequency 0xD4
        cmd(0x80);  // Display Clock Divide Ratio / OSC Frequency 
        cmd(0xA8);  // Set Multiplex Ratio
        cmd(0x3F);  // Multiplex Ratio for 128x64 (64-1)
        cmd(0xD3);  // Set Display Offset
        cmd(0x00);  // Display Offset
        cmd(0x40);  // Set Display Start Line
        cmd(0x8D);  // Set Charge Pump
        cmd(0x14);  // Charge Pump (0x10 External, 0x14 Internal DC/DC)
        cmd(0xA1);  // Set Segment Re-Map
        cmd(0xC8);  // Set Com Output Scan Direction
        cmd(0xDA);  // Set COM Hardware Configuration
        cmd(0x12);  // COM Hardware Configuration
        cmd(0x81);  // Set Contrast
        cmd(0xCF);  // Contrast
        cmd(0xD9);  // Set Pre-Charge Period
        cmd(0xF1);  // Set Pre-Charge Period (0x22 External, 0xF1 Internal)
        cmd(0xDB);  // Set VCOMH Deselect Level
        cmd(0x40);  // VCOMH Deselect Level
        cmd(0xA4);  // Set all pixels OFF
        cmd(0xA6);  // Set display not inverted
        cmd(0xAF);  // Set display On
        clear();
    }
    //% weight=59
    //% block="clear"
    export function clear() {
        //cmd(DISPLAY_OFF);   //display off
        for (let j = 0; j < 8; j++) {
            setTextXY(j);
            {
                for (let i = 0; i < 16; i++)  //clear all columns
                {
                    putChar(' ');
                }
            }
        }
        //cmd(DISPLAY_ON);    //display on
        setTextXY(0);
    }

    function setTextXY(A: number) {
        let r = A;
        let c = 0;
        cmd(0xB0 + r);            //set page address
        cmd(0x00 + (8 * c & 0x0F));  //set column lower address
        cmd(0x10 + ((8 * c >> 4) & 0x0F));   //set column higher address
    }

    function putChar(c: string) {
        let c1 = c.charCodeAt(0);
        writeCustomChar(basicFont[c1 - 32]);
    }
    /**
     * OLED 12864 display string
     */
    //% weight=60
    //% text.defl="DFRobot"
    //% line.min=0 line.max=7
    //% block="OLED show line %line|text %text"
    export function showUserText(line: number, text: string): void {
        setTextXY(line);
        for (let c of text) {
            putChar(c);
        }

    }
	/**
     * * @param line line num (8 pixels per line), eg: 0
     * @param n value , eg: 2019
     * OLED 12864 shows the number
     */
    //% weight=60
    //% line.min=0 line.max=7
    //% block="OLED show line %line|number %n"

    export function showUserNumber(line: number, n: number): void {
        microIoT.showUserText(line, "" + n)
    }


    function writeCustomChar(c: string) {
        for (let i = 0; i < 8; i++) {
            writeData(c.charCodeAt(i));
        }
    }


    function cmd(c: number) {
        pins.i2cWriteNumber(0x3C, c, NumberFormat.UInt16BE);
    }


    function writeData(n: number) {
        let b = n;
        if (n < 0) { n = 0 }
        if (n > 255) { n = 255 }

        pins.i2cWriteNumber(0x3C, 0x4000 + b, NumberFormat.UInt16BE);
    }

    const DISPLAY_OFF = 0xAE;
    const DISPLAY_ON = 0xAF;
    const basicFont: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@"
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // """
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // """
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00"  // "~"
    ];


    let microIoT_Weather_URL = "api.dfrobot.top"
    //天气
    //% weight=80
    //% block="Set Location|%location"
    export function Set_location(location: LOCATION): void {
        G_city = location;
    }
    function get_city(): string {
        let city = "";
        switch (G_city) {
            case 0:
                city = "Sentosa";
                break;
            case 1:
                city = "Pulau_Ubin";
                break;
            case 2:
                city = "Pulau_Tekong";
                break;
            case 3:
                city = "Jurong_Island";
                break;
            case 4:
                city = "Tuas";
                break;
            case 5:
                city = "Changi";
                break;
            case 6:
                city = "City";
                break;
            case 7:
                city = "Woodlands";
                break;
            case 8:
                city = "Lim_Chu_Kang";
                break;
            case 9:
                city = "Central_Water_Catchment";
                break;
            case 10:
                city = "Bukit_Timah";
                break;
            case 11:
                city = "Punggol";
                break;
            case 12:
                city = "Tanglin";
                break;
            case 13:
                city = "Novena";
                break;
            case 14:
                city = "Marine_Parade";
                break;
            case 15:
                city = "Tampines";
                break;
            case 16:
                city = "Jurong_East";
                break;
            case 17:
                city = "Paya_Lebar";
                break;
            case 18:
                city = "Queenstown";
                break;
            case 19:
                city = "Kallang";
                break;
            default:
                city = "Sentosa";
                break;
        }
        return city;
    }


    function get_request(city: string, info: string): string {
        microIoT_setPara(SETHTTP_IP, microIoT_Weather_URL);
        let tempStr = ""
        tempStr = "weather?city=Singapore&locations=" + city + "&info=" + info + "\r"
        microIoT_ParaRunCommand(GET_URL, tempStr)
        return microIoT_http_wait_request(10000);
    }
    //% weight=80
    //% block="Get weather"
    export function get_weather(): string {
        let city = get_city();
        let ret1 = get_request(city, "weather");
        return ret1;
    }

    //% weight=80
    //% block="Get temperature"
    export function get_temperature(): string {
        let city = get_city();
        let ret2 = get_request(city, "temp_high/temp_low")
        return ret2;
    }

    //% weight=80
    //% block="Get humidity"
    export function get_humidity(): string {
        let city = get_city();
        let ret3 = get_request(city, "humi_high/humi_low")
        return ret3;
    }

    //% weight=80
    //% block="Get wind speed"
    export function get_windSpeed(): string {
        let city = get_city();
        let ret4 = get_request(city, "winds_max/winds_min");
        return ret4;
    }
} 
