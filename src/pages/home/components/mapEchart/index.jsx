import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import chinaData from './china.json'

const MapEchart = (props) => {
    const { idString } = props
    useEffect(() => {
        renderChart();
        console.log('chinaData', chinaData);
    }, []);

    const toolTipData = [
        { name: '北京', value: [{ name: '客户总数', value: 95 }, { name: '总回收量', value: 82 }] },
        { name: '天津', value: [{ name: '客户总数', value: 22 }, { name: '总回收量', value: 20 }] },
        { name: '河北', value: [{ name: '客户总数', value: 60 }, { name: '总回收量', value: 42 }] },
        { name: '山西', value: [{ name: '客户总数', value: 40 }, { name: '总回收量', value: 41 }] },
        { name: '内蒙古', value: [{ name: '客户总数', value: 23 }, { name: '总回收量', value: 24 }] },
        { name: '辽宁', value: [{ name: '客户总数', value: 39 }, { name: '总回收量', value: 28 }] },
        { name: '吉林', value: [{ name: '客户总数', value: 41 }, { name: '总回收量', value: 41 }] },
        { name: '黑龙江', value: [{ name: '客户总数', value: 35 }, { name: '总回收量', value: 31 }] },
        { name: '上海', value: [{ name: '客户总数', value: 12 }, { name: '总回收量', value: 12 }] },
        { name: '江苏', value: [{ name: '客户总数', value: 47 }, { name: '总回收量', value: 45 }] },
        { name: '浙江', value: [{ name: '客户总数', value: 57 }, { name: '总回收量', value: 57 }] },
        { name: '安徽', value: [{ name: '客户总数', value: 57 }, { name: '总回收量', value: 52 }] },
        { name: '福建', value: [{ name: '客户总数', value: 59 }, { name: '总回收量', value: 57 }] },
        { name: '江西', value: [{ name: '客户总数', value: 49 }, { name: '总回收量', value: 42 }] },
        { name: '山东', value: [{ name: '客户总数', value: 67 }, { name: '总回收量', value: 52 }] },
        { name: '河南', value: [{ name: '客户总数', value: 69 }, { name: '总回收量', value: 68 }] },
        { name: '湖北', value: [{ name: '客户总数', value: 60 }, { name: '总回收量', value: 56 }] },
        { name: '湖南', value: [{ name: '客户总数', value: 62 }, { name: '总回收量', value: 52 }] },
        { name: '重庆', value: [{ name: '客户总数', value: 47 }, { name: '总回收量', value: 44 }] },
        { name: '四川', value: [{ name: '客户总数', value: 65 }, { name: '总回收量', value: 60 }] },
        { name: '贵州', value: [{ name: '客户总数', value: 32 }, { name: '总回收量', value: 30 }] },
        { name: '云南', value: [{ name: '客户总数', value: 42 }, { name: '总回收量', value: 41 }] },
        { name: '西藏', value: [{ name: '客户总数', value: 5 }, { name: '总回收量', value: 4 }] },
        { name: '陕西', value: [{ name: '客户总数', value: 38 }, { name: '总回收量', value: 42 }] },
        { name: '甘肃', value: [{ name: '客户总数', value: 28 }, { name: '总回收量', value: 28 }] },
        { name: '青海', value: [{ name: '客户总数', value: 5 }, { name: '总回收量', value: 5 }] },
        { name: '宁夏', value: [{ name: '客户总数', value: 10 }, { name: '总回收量', value: 8 }] },
        { name: '新疆', value: [{ name: '客户总数', value: 36 }, { name: '总回收量', value: 31 }] },
        { name: '广东', value: [{ name: '客户总数', value: 63 }, { name: '总回收量', value: 60 }] },
        { name: '广西', value: [{ name: '客户总数', value: 29 }, { name: '总回收量', value: 30 }] },
        { name: '海南', value: [{ name: '客户总数', value: 8 }, { name: '总回收量', value: 6 }] },
        { name: '台湾', value: [{ name: '客户总数', value: 0 }, { name: '总回收量', value: 0 }] }
    ];

    /**通过地区名字查找对象*/
    const searchValueFromName = (name) => {
        let that = this;
        let a = toolTipData;
        let len = a.length;
        for (let i = 0; i < len; i++) {
            if (a[i].name == name) {
                return a[i];
            }
        }
    }



    const renderChart = () => {
        let data = [
            { name: '北京', value: 199 },
            { name: '天津', value: 42 },
            { name: '河北', value: 102 },
            { name: '山西', value: 81 },
            { name: '内蒙古', value: 47 },
            { name: '辽宁', value: 67 },
            { name: '吉林', value: 82 },
            { name: '黑龙江', value: 123 },
            { name: '上海', value: 24 },
            { name: '江苏', value: 92 },
            { name: '浙江', value: 114 },
            { name: '安徽', value: 109 },
            { name: '福建', value: 116 },
            { name: '江西', value: 91 },
            { name: '山东', value: 119 },
            { name: '河南', value: 137 },
            { name: '湖北', value: 116 },
            { name: '湖南', value: 114 },
            { name: '重庆', value: 91 },
            { name: '四川', value: 125 },
            { name: '贵州', value: 62 },
            { name: '云南', value: 83 },
            { name: '西藏', value: 9 },
            { name: '陕西', value: 80 },
            { name: '甘肃', value: 56 },
            { name: '青海', value: 10 },
            { name: '宁夏', value: 18 },
            { name: '新疆', value: 180 },
            { name: '广东', value: 123 },
            { name: '广西', value: 59 },
            { name: '海南', value: 14 },
            { name: '台湾', value: 14 },
        ];
        let geoCoordMap = {};
        let chartDom = document.getElementById(idString);
        let myChart = echarts.init(chartDom);
        echarts.registerMap('china', chinaData);
        /*获取地图数据*/
        let mapFeatures = echarts.getMap('china').geoJson.features;
        mapFeatures.forEach(function (v) {
            // 地区名称
            let name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });
        // console.log('mapFeatures', mapFeatures);
        const convertData = (data) => {
            let res = [];
            let len = data.length;
            for (let i = 0; i < len; i++) {
                let geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        };
        let options = {
            tooltip: {
                padding: 0,
                enterable: true,
                transitionDuration: 1,
                textStyle: {
                    color: '#000',
                    decoration: 'none',
                },
                formatter: function (params) {
                    let paramsData = { name: '', value: [{ name: '', value: 0 }, { name: '', value: 0 }] };
                    paramsData = searchValueFromName(params.name);
                    if (paramsData) {
                        return (
                            `<div style="width:180px;height:140px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">
                                <div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">
                                    <i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;"></i>
                                    <span style="margin-left:10px;color:#fff;font-size:16px;">${params.name}</span>
                                </div>
                                <div style="padding:20px">
                                    <p style="color:#fff;font-size:12px;">
                                        <i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px"></i>
                                        ${paramsData.value[0].name}：
                                        <span style="color:#11ee7d;margin:0 6px;">${paramsData.value[0].value || 0}</span>个</p>
                                    <p style="color:#fff;font-size:12px;">
                                        <i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px"></i>
                                        ${paramsData.value[1].name}：
                                        <span style="color:#f48225;margin:0 6px;">${paramsData.value[1].value || 0}</span>吨</p>
                                </div>
                            </div>`
                        );
                    } else {
                        return null
                    }
                }

            },
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                left: '10%',
                top: 'bottom',
                calculable: false,
                seriesIndex: [1],
                inRange: {
                    color: ['#04387b', '#467bc0'] // 蓝绿
                }
            },
            geo: {
                nameMap: {
                    China: '中国',
                },
                show: true,
                map: 'china',
                aspectScale: 1.5,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#023677',
                        borderColor: '#fff',
                        shadowColor: 'rgba(128, 217, 248, .2)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 1
                    },
                    emphasis: {
                        areaColor: '#4499d0',
                    }
                }
            },
            series: [
                {
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff'
                        }
                    }
                },
                {
                    type: 'map',
                    map: 'china',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 6,
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 10)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'left',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'yellow',
                            shadowBlur: 10,
                            shadowColor: 'yellow'
                        }
                    },
                    zlevel: 1
                },

            ]
        };
        myChart.setOption(options)
        window.onresize = myChart.resize;
    }

    return (
        <div id={idString} style={{ width: '100%', height: '100%' }}>
            MapEchart
        </div>
    )
}

export default MapEchart