import React, { useState, useEffect } from 'react'
import * as echarts from 'echarts'
import { Col, Row, Layout, Card } from 'antd';


const Chart1 = (props) => {
    const { data, cardTitle, style, idString, cardWidth, resize, cardHeight } = props;
    const width = cardWidth? cardWidth : 400;
    const option = {
        xAxis: {
            type: 'category',
            data: data?.xValue ?  data.xValue : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                inside: false,
                textStyle: {
                    fontSize: '12'
                }
            },
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: data?.yValue ?  data.yValue : [150, 230, 224, 218, 135, 147, 260],
            type: 'bar'
        }]
    };


    const renderChart = () => {
        let chartDom = document.getElementById(idString);
        let myChart = echarts.init(chartDom);
        myChart.setOption(option);
        window.onresize = myChart.resize;
        if(resize){
            window.onresize = myChart.resize;
        }
    }

    useEffect(() => {
        renderChart();
    }, []);

    return (
        <div id={idString} style={style?style:{ width: width - 50, height: cardHeight? cardHeight : 200 }}>
            图表一
        </div>
    )
}

export default Chart1