/**权限按钮下拉 */
export const optionBtn = [
    { label:'页面权限', value:'页面权限', perm:'_list' },
    { label:'新增', value:'新增', perm:'_add' },
    { label:'编辑', value:'编辑', perm:'_update' },
    { label:'删除', value:'删除', perm:'_delete' },
    { label:'查看', value:'查看', perm:'_view' },
    { label:'授权', value:'授权', perm:'_accredit'},
    { label:'重置密码', value:'重置密码', perm:'_resetPassword'},
    { label:'冻结and解冻', value:'冻结and解冻', perm:'_freezeAndUnfreeze'},
    { label:'开and关', value:'开and关', perm:'_switch'},
    { label:'物业管理', value:'物业管理', perm:'_propertyManagement'},
    { label:'发布', value:'发布', perm:'_publish'},
    { label:'调试', value:'调试', perm:'_debug'}
]


/**物业类型 */
export const propertyType = [
    {label:'小区', value:1},
    {label:'工厂', value:2},
    {label:'写字楼', value:3},
]

/**物业类型(枚举) */
export const propertyTypeEnum = {
    1:{text:'小区'},
    2:{text:'工厂'},
    3:{text:'写字楼'}
}


/**证书类型 */
export const certificateDropDownData = [
    {label:'PFX', value:'PFX'},
    {label:'JKS', value:'JKS'},
    {label:'PEM', value:'PEM'}
]

/**协议类型 */
export const protocolDropDownData = [
    {value:"jar", label:"jar"},
    {value:"local", label:"local"},
    {value:"script", label:"script"},
]

/**连接协议 */
export const linkProtocolOption = [
    {label:'MQTT', value:'MQTT'},
    {label:'UDP', value:'UDP'},
    {label:'CoAP', value:'CoAP'},
    {label:'TCP', value:'TCP'},
    {label:'HTTP', value:'HTTP'},
    {label:'HTTPS', value:'HTTPS'}
]

/** 默认脚本 */
export const defaultScript = '//解码,收到设备上行消息时\n' +
      'codec.decoder(function (context) {\n' +
      '  var message = context.getMessage();\n' +
      '  return {\n' +
      '    messageType:"REPORT_PROPERTY"//消息类型\n' +
      '  };\n' +
      '});\n' +
      '\n' +
      '//编码读取设备属性消息\n' +
      'codec.encoder("READ_PROPERTY",function(context){\n' +
      '  var message = context.getMessage();\n' +
      '  var properties = message.properties;\n' +
      '})' 

/**网络组件类型 */
export const netComponentsType = [
    {id: "UDP", name: "UDP"},
    {id: "HTTP_CLIENT", name: "HTTP客户端"},
    {id: "TCP_SERVER", name: "TCP服务"},
    {id: "WEB_SOCKET_SERVER", name: "WebSocket服务"},
    {id: "MQTT_CLIENT", name: "MQTT客户端"},
    {id: "COAP_CLIENT", name: "CoAP客户端"},
    {id: "HTTP_SERVER", name: "HTTP服务"},
    {id: "MQTT_SERVER", name: "MQTT服务"},
    {id: "WEB_SOCKET_CLIENT", name: "WebSocket客户端"},
    {id: "COAP_SERVER", name: "CoAP服务"},
    {id: "TCP_CLIENT", name: "TCP客户端"},
]

/**设备网关类型 */
export const gatewayType = [
    {
        name:'WebSocket服务接入',
        id:'websocket-server',
        networkType: {name: "WebSocket服务", text: "WebSocket服务", value: "WEB_SOCKET_SERVER"}
    },
    {
        name: "HTTP 推送接入", 
        id: "http-server-gateway",
        networkType: {name: "HTTP服务", text: "HTTP服务", value: "HTTP_SERVER"}
    },
    {
        name: "UDP 接入", 
        id: "udp-device-gateway",
        networkType: {name: "UDP", text: "UDP", value: "UDP"}
    },
    {
        name: "CoAP 接入", 
        id: "coap-server-gateway",
        networkType: {name: "CoAP服务", text: "CoAP服务", value: "COAP_SERVER"}
    },
    {
        name: "MQTT Broker接入", 
        id: "mqtt-client-gateway",
        networkType: {name: "MQTT客户端", text: "MQTT客户端", value: "MQTT_CLIENT"}
    },
    {
        name: "MQTT直连接入", 
        id: "mqtt-server-gateway",
        networkType: {name: "MQTT服务", text: "MQTT服务", value: "MQTT_SERVER"}
    },
    {
        name: "TCP 透传接入", 
        id: "tcp-server-gateway",
        networkType: {name: "TCP服务", text: "TCP服务", value: "TCP_SERVER"}
    }
]

/**单位 */
export const unitsData = [
  {
    "symbol": "%",
    "name": "百分比",
    "description": "百分比(%)",
    "id": "percent",
    "text": "百分比(%)",
    "type": "常用单位",
    "value": "percent"
  },
  {
    "symbol": "count",
    "name": "次",
    "description": "次",
    "id": "count",
    "text": "次(count)",
    "type": "常用单位",
    "value": "count"
  },
  {
    "symbol": "r/min",
    "name": "转每分钟",
    "description": "转每分钟",
    "id": "turnPerSeconds",
    "text": "转每分钟(r/min)",
    "type": "常用单位",
    "value": "turnPerSeconds"
  },
  {
    "symbol": "nm",
    "name": "纳米",
    "description": "长度单位:纳米(nm)",
    "id": "nanometer",
    "text": "纳米(nm)",
    "type": "长度单位",
    "value": "nanometer"
  },
  {
    "symbol": "μm",
    "name": "微米",
    "description": "长度单位:微米(μm)",
    "id": "micron",
    "text": "微米(μm)",
    "type": "长度单位",
    "value": "micron"
  },
  {
    "symbol": "mm",
    "name": "毫米",
    "description": "长度单位:毫米(mm)",
    "id": "millimeter",
    "text": "毫米(mm)",
    "type": "长度单位",
    "value": "millimeter"
  },
  {
    "symbol": "cm",
    "name": "厘米",
    "description": "长度单位:厘米(cm)",
    "id": "centimeter",
    "text": "厘米(cm)",
    "type": "长度单位",
    "value": "centimeter"
  },
  {
    "symbol": "m",
    "name": "米",
    "description": "长度单位:米(m)",
    "id": "meter",
    "text": "米(m)",
    "type": "长度单位",
    "value": "meter"
  },
  {
    "symbol": "km",
    "name": "千米",
    "description": "长度单位:千米(km)",
    "id": "kilometer",
    "text": "千米(km)",
    "type": "长度单位",
    "value": "kilometer"
  },
  {
    "symbol": "mm²",
    "name": "平方毫米",
    "description": "面积单位:平方毫米(mm²)",
    "id": "squareMillimeter",
    "text": "平方毫米(mm²)",
    "type": "面积单位",
    "value": "squareMillimeter"
  },
  {
    "symbol": "cm²",
    "name": "平方厘米",
    "description": "面积单位:平方厘米(cm²)",
    "id": "squareCentimeter",
    "text": "平方厘米(cm²)",
    "type": "面积单位",
    "value": "squareCentimeter"
  },
  {
    "symbol": "m²",
    "name": "平方米",
    "description": "面积单位:平方米(m²)",
    "id": "squareMeter",
    "text": "平方米(m²)",
    "type": "面积单位",
    "value": "squareMeter"
  },
  {
    "symbol": "km²",
    "name": "平方千米",
    "description": "面积单位:平方千米(km²)",
    "id": "squareKilometer",
    "text": "平方千米(km²)",
    "type": "面积单位",
    "value": "squareKilometer"
  },
  {
    "symbol": "hm²",
    "name": "公顷",
    "description": "面积单位:公顷(hm²)",
    "id": "hectare",
    "text": "公顷(hm²)",
    "type": "面积单位",
    "value": "hectare"
  },
  {
    "symbol": "d",
    "name": "天",
    "description": "时间单位:天(d)",
    "id": "days",
    "text": "天(d)",
    "type": "时间单位",
    "value": "days"
  },
  {
    "symbol": "h",
    "name": "小时",
    "description": "时间单位:小时(h)",
    "id": "hour",
    "text": "小时(h)",
    "type": "时间单位",
    "value": "hour"
  },
  {
    "symbol": "min",
    "name": "分钟",
    "description": "时间单位:分钟(m)",
    "id": "minutes",
    "text": "分钟(min)",
    "type": "时间单位",
    "value": "minutes"
  },
  {
    "symbol": "s",
    "name": "秒",
    "description": "时间单位:秒(s)",
    "id": "seconds",
    "text": "秒(s)",
    "type": "时间单位",
    "value": "seconds"
  },
  {
    "symbol": "ms",
    "name": "毫秒",
    "description": "时间单位:毫秒(ms)",
    "id": "milliseconds",
    "text": "毫秒(ms)",
    "type": "时间单位",
    "value": "milliseconds"
  },
  {
    "symbol": "μs",
    "name": "微秒",
    "description": "时间单位:微秒(μs)",
    "id": "microseconds",
    "text": "微秒(μs)",
    "type": "时间单位",
    "value": "microseconds"
  },
  {
    "symbol": "ns",
    "name": "纳秒",
    "description": "时间单位:纳秒(ns)",
    "id": "nanoseconds",
    "text": "纳秒(ns)",
    "type": "时间单位",
    "value": "nanoseconds"
  },
  {
    "symbol": "mm³",
    "name": "立方毫米",
    "description": "体积单位:立方毫米(mm³)",
    "id": "cubicMillimeter",
    "text": "立方毫米(mm³)",
    "type": "体积单位",
    "value": "cubicMillimeter"
  },
  {
    "symbol": "cm³",
    "name": "立方厘米",
    "description": "体积单位:立方厘米(cm³)",
    "id": "cubicCentimeter",
    "text": "立方厘米(cm³)",
    "type": "体积单位",
    "value": "cubicCentimeter"
  },
  {
    "symbol": "m³",
    "name": "立方米",
    "description": "体积单位:立方米(m³)",
    "id": "cubicMeter",
    "text": "立方米(m³)",
    "type": "体积单位",
    "value": "cubicMeter"
  },
  {
    "symbol": "km³",
    "name": "立方千米",
    "description": "体积单位:立方千米(km³)",
    "id": "cubicKilometer",
    "text": "立方千米(km³)",
    "type": "体积单位",
    "value": "cubicKilometer"
  },
  {
    "symbol": "m³/s",
    "name": "立方米每秒",
    "description": "流量单位:立方米每秒(m³/s)",
    "id": "cubicMeterPerSec",
    "text": "立方米每秒(m³/s)",
    "type": "流量单位",
    "value": "cubicMeterPerSec"
  },
  {
    "symbol": "km³/s",
    "name": "立方千米每秒",
    "description": "流量单位:立方千米每秒(km³/s)",
    "id": "cubicKilometerPerSec",
    "text": "立方千米每秒(km³/s)",
    "type": "流量单位",
    "value": "cubicKilometerPerSec"
  },
  {
    "symbol": "cm³/s",
    "name": "立方厘米每秒",
    "description": "流量单位:立方厘米每秒(cm³/s)",
    "id": "cubicCentimeterPerSec",
    "text": "立方厘米每秒(cm³/s)",
    "type": "流量单位",
    "value": "cubicCentimeterPerSec"
  },
  {
    "symbol": "l/s",
    "name": "升每秒",
    "description": "流量单位:升每秒(l/s)",
    "id": "litrePerSec",
    "text": "升每秒(l/s)",
    "type": "流量单位",
    "value": "litrePerSec"
  },
  {
    "symbol": "m³/h",
    "name": "立方米每小时",
    "description": "流量单位:立方米每小时(m³/h)",
    "id": "cubicMeterPerHour",
    "text": "立方米每小时(m³/h)",
    "type": "流量单位",
    "value": "cubicMeterPerHour"
  },
  {
    "symbol": "km³/h",
    "name": "立方千米每小时",
    "description": "流量单位:立方千米每小时(km³/h)",
    "id": "cubicKilometerPerHour",
    "text": "立方千米每小时(km³/h)",
    "type": "流量单位",
    "value": "cubicKilometerPerHour"
  },
  {
    "symbol": "cm³/h",
    "name": "立方厘米每小时",
    "description": "流量单位:立方厘米每小时(cm³/h)",
    "id": "cubicCentimeterPerHour",
    "text": "立方厘米每小时(cm³/h)",
    "type": "流量单位",
    "value": "cubicCentimeterPerHour"
  },
  {
    "symbol": "l/h",
    "name": "升每小时",
    "description": "流量单位:升每小时(l/h)",
    "id": "litrePerHour",
    "text": "升每小时(l/h)",
    "type": "流量单位",
    "value": "litrePerHour"
  },
  {
    "symbol": "mL",
    "name": "毫升",
    "description": "容积单位:毫升(mL)",
    "id": "milliliter",
    "text": "毫升(mL)",
    "type": "容积单位",
    "value": "milliliter"
  },
  {
    "symbol": "L",
    "name": "升",
    "description": "容积单位:升(L)",
    "id": "litre",
    "text": "升(L)",
    "type": "容积单位",
    "value": "litre"
  },
  {
    "symbol": "mg",
    "name": "毫克",
    "description": "重量单位:毫克(mg)",
    "id": "milligram",
    "text": "毫克(mg)",
    "type": "质量单位",
    "value": "milligram"
  },
  {
    "symbol": "g",
    "name": "克",
    "description": "重量单位:克(g)",
    "id": "gramme",
    "text": "克(g)",
    "type": "质量单位",
    "value": "gramme"
  },
  {
    "symbol": "kg",
    "name": "千克",
    "description": "重量单位:千克(kg)",
    "id": "kilogram",
    "text": "千克(kg)",
    "type": "质量单位",
    "value": "kilogram"
  },
  {
    "symbol": "t",
    "name": "吨",
    "description": "重量单位:吨(t)",
    "id": "ton",
    "text": "吨(t)",
    "type": "质量单位",
    "value": "ton"
  },
  {
    "symbol": "Pa",
    "name": "帕斯卡",
    "description": "压力单位:帕斯卡(Pa)",
    "id": "pascal",
    "text": "帕斯卡(Pa)",
    "type": "压力单位",
    "value": "pascal"
  },
  {
    "symbol": "kPa",
    "name": "千帕斯卡",
    "description": "压力单位:千帕斯卡(kPa)",
    "id": "kiloPascal",
    "text": "千帕斯卡(kPa)",
    "type": "压力单位",
    "value": "kiloPascal"
  },
  {
    "symbol": "N",
    "name": "牛顿",
    "description": "力单位:牛顿(N)",
    "id": "newton",
    "text": "牛顿(N)",
    "type": "力单位",
    "value": "newton"
  },
  {
    "symbol": "N.m",
    "name": "牛·米",
    "description": "力单位:牛·米(N.m)",
    "id": "newtonMeter",
    "text": "牛·米(N.m)",
    "type": "力单位",
    "value": "newtonMeter"
  },
  {
    "symbol": "K",
    "name": "开尔文",
    "description": "温度单位:开尔文(K)",
    "id": "kelvin",
    "text": "开尔文(K)",
    "type": "温度单位",
    "value": "kelvin"
  },
  {
    "symbol": "℃",
    "name": "摄氏度",
    "description": "温度单位:摄氏度(℃)",
    "id": "celsiusDegrees",
    "text": "摄氏度(℃)",
    "type": "温度单位",
    "value": "celsiusDegrees"
  },
  {
    "symbol": "℉",
    "name": "华氏度",
    "description": "温度单位:华氏度(℉)",
    "id": "fahrenheit",
    "text": "华氏度(℉)",
    "type": "温度单位",
    "value": "fahrenheit"
  },
  {
    "symbol": "J",
    "name": "焦耳",
    "description": "能单位:焦耳(J)",
    "id": "joule",
    "text": "焦耳(J)",
    "type": "能量单位",
    "value": "joule"
  },
  {
    "symbol": "cal",
    "name": "卡",
    "description": "能单位:卡(cal)",
    "id": "cal",
    "text": "卡(cal)",
    "type": "能量单位",
    "value": "cal"
  },
  {
    "symbol": "W",
    "name": "瓦特",
    "description": "功率单位:瓦特(W)",
    "id": "watt",
    "text": "瓦特(W)",
    "type": "功率单位",
    "value": "watt"
  },
  {
    "symbol": "kW",
    "name": "千瓦特",
    "description": "功率单位:千瓦特(kW)",
    "id": "kilowatt",
    "text": "千瓦特(kW)",
    "type": "功率单位",
    "value": "kilowatt"
  },
  {
    "symbol": "rad",
    "name": "弧度",
    "description": "角度单位:弧度(rad)",
    "id": "radian",
    "text": "弧度(rad)",
    "type": "角度单位",
    "value": "radian"
  },
  {
    "symbol": "°",
    "name": "度",
    "description": "角度单位:度(°)",
    "id": "degrees",
    "text": "度(°)",
    "type": "角度单位",
    "value": "degrees"
  },
  {
    "symbol": "′",
    "name": "[角]分",
    "description": "角度单位:分(′)",
    "id": "fen",
    "text": "[角]分(′)",
    "type": "角度单位",
    "value": "fen"
  },
  {
    "symbol": "″",
    "name": "[角]秒",
    "description": "角度单位:度(″)",
    "id": "angleSeconds",
    "text": "[角]秒(″)",
    "type": "角度单位",
    "value": "angleSeconds"
  },
  {
    "symbol": "Hz",
    "name": "赫兹",
    "description": "频率单位:赫兹(Hz)",
    "id": "hertz",
    "text": "赫兹(Hz)",
    "type": "频率单位",
    "value": "hertz"
  },
  {
    "symbol": "MHz",
    "name": "兆赫兹",
    "description": "频率单位:兆赫兹(MHz)",
    "id": "megahertz",
    "text": "兆赫兹(MHz)",
    "type": "频率单位",
    "value": "megahertz"
  },
  {
    "symbol": "GHz",
    "name": "G赫兹",
    "description": "频率单位:G赫兹(GHz)",
    "id": "ghertz",
    "text": "G赫兹(GHz)",
    "type": "频率单位",
    "value": "ghertz"
  },
  {
    "symbol": "m/s",
    "name": "米每秒",
    "description": "速度单位:米每秒(m/s)",
    "id": "mPerSec",
    "text": "米每秒(m/s)",
    "type": "速度单位",
    "value": "mPerSec"
  },
  {
    "symbol": "km/h",
    "name": "千米每小时",
    "description": "速度单位:千米每小时(km/h)",
    "id": "kmPerHr",
    "text": "千米每小时(km/h)",
    "type": "速度单位",
    "value": "kmPerHr"
  },
  {
    "symbol": "kn",
    "name": "节",
    "description": "速度单位:节(kn)",
    "id": "knots",
    "text": "节(kn)",
    "type": "速度单位",
    "value": "knots"
  },
  {
    "symbol": "V",
    "name": "伏特",
    "description": "电压:伏特(V)",
    "id": "volt",
    "text": "伏特(V)",
    "type": "电力单位",
    "value": "volt"
  },
  {
    "symbol": "kV",
    "name": "千伏",
    "description": "电压:千伏(kV)",
    "id": "kiloVolt",
    "text": "千伏(kV)",
    "type": "电力单位",
    "value": "kiloVolt"
  },
  {
    "symbol": "mV",
    "name": "毫伏",
    "description": "电压:毫伏(mV)",
    "id": "milliVolt",
    "text": "毫伏(mV)",
    "type": "电力单位",
    "value": "milliVolt"
  },
  {
    "symbol": "μV",
    "name": "微伏",
    "description": "电压:微伏(μV)",
    "id": "microVolt",
    "text": "微伏(μV)",
    "type": "电力单位",
    "value": "microVolt"
  },
  {
    "symbol": "A",
    "name": "安培",
    "description": "电流:安培(A)",
    "id": "ampere",
    "text": "安培(A)",
    "type": "电力单位",
    "value": "ampere"
  },
  {
    "symbol": "mA",
    "name": "毫安",
    "description": "电流:毫安(mA)",
    "id": "milliAmpere",
    "text": "毫安(mA)",
    "type": "电力单位",
    "value": "milliAmpere"
  },
  {
    "symbol": "μA",
    "name": "微安",
    "description": "电流:微安(μA)",
    "id": "microAmpere",
    "text": "微安(μA)",
    "type": "电力单位",
    "value": "microAmpere"
  },
  {
    "symbol": "nA",
    "name": "纳安",
    "description": "电流:纳安(nA)",
    "id": "nanoAmpere",
    "text": "纳安(nA)",
    "type": "电力单位",
    "value": "nanoAmpere"
  },
  {
    "symbol": "Ω",
    "name": "欧姆",
    "description": "电阻:欧姆(Ω)",
    "id": "ohm",
    "text": "欧姆(Ω)",
    "type": "电力单位",
    "value": "ohm"
  },
  {
    "symbol": "KΩ",
    "name": "千欧",
    "description": "电阻:千欧(KΩ)",
    "id": "kiloOhm",
    "text": "千欧(KΩ)",
    "type": "电力单位",
    "value": "kiloOhm"
  },
  {
    "symbol": "MΩ",
    "name": "兆欧",
    "description": "电阻:兆欧(MΩ)",
    "id": "millionOhm",
    "text": "兆欧(MΩ)",
    "type": "电力单位",
    "value": "millionOhm"
  },
  {
    "symbol": "eV",
    "name": "电子伏",
    "description": "能单位:电子伏(eV)",
    "id": "electronVolts",
    "text": "电子伏(eV)",
    "type": "电力单位",
    "value": "electronVolts"
  },
  {
    "symbol": "kW·h",
    "name": "千瓦·时",
    "description": "能单位:千瓦·时(kW·h)",
    "id": "kWattsHour",
    "text": "千瓦·时(kW·h)",
    "type": "电力单位",
    "value": "kWattsHour"
  },
  {
    "symbol": "kgce",
    "name": "Kg标准煤",
    "description": "能源单位/kgce",
    "id": "kgce",
    "text": "Kg标准煤(kgce)",
    "type": "能源单位",
    "value": "kgce"
  }
]

/**时间格式 */
export const timeFormat =[
    {
        label: 'String类型的UTC时间戳 (毫秒)',
        value: 'string',
    },
    {
        label: 'yyyy-MM-dd',
        value: 'yyyy-MM-dd',
    },
    {
        label: 'yyyy-MM-dd HH:mm:ss',
        value: 'yyyy-MM-dd HH:mm:ss',
    },
    {
        label: 'yyyy-MM-dd HH:mm:ss EE',
        value: 'yyyy-MM-dd HH:mm:ss EE',
    },
    {
        label: 'yyyy-MM-dd HH:mm:ss zzz',
        value: 'yyyy-MM-dd HH:mm:ss zzz',
    }
];

/**聚合函数选择 */
export const streamingAggType = [
  {
    "text": "计数",
    "value": "count"
  },
  {
    "text": "求和",
    "value": "sum"
  },
  {
    "text": "平均值",
    "value": "avg"
  },
  {
    "text": "最大值",
    "value": "max"
  },
  {
    "text": "最小值",
    "value": "min"
  },
  {
    "text": "最初值",
    "value": "first"
  },
  {
    "text": "最近值",
    "value": "last"
  },
  {
    "text": "极差值",
    "value": "range"
  },
  {
    "text": "中位数",
    "value": "median"
  },
  {
    "text": "几何平均值",
    "value": "geometricMean"
  },
  {
    "text": "算术平均值",
    "value": "mean"
  },
  {
    "text": "方差",
    "value": "variance"
  },
  {
    "text": "标准差",
    "value": "dev"
  },
  {
    "text": "倾斜率",
    "value": "slope"
  }
]