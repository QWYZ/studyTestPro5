import { Charts } from '@jiaminghi/data-view-react';
import React, { useState, useEffect } from 'react';
import Box1 from '../components/Box1';
import Box2 from '../components/Box2';
import CenterPage from './components/centerPage';
import Chart from '../../../utils/chart';
import TopPage from './components/topPage';
import styles from './style.less';
import * as echarts from 'echarts';
import pageBg from '../assets/pageBg.png';
import TreeChart from './components/TreeChart';
import 'echarts-gl';

const Demo1 = () => {

  const option1 = {
    color: ['pink', '#2f89cf'],
    title: {
      text: ''
    },
    legend: {
      textStyle: {
        color: 'rgba(255,255,255,.6)',
        footSize: '12',
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '4%',
      containLabel: true //是否显示刻度值
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          footSize: '12',
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: '销售额',
        type: 'value',
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          footSize: '12',
        },
      },
      {
        name: '人流量',
        type: 'value',
        position: 'right',
        max: 2000,
        //分割线
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
            width: 1,
          }
        },
        axisLabel: {
          color: 'rgba(255,255,255,.6)'
        },
      }
    ],
    series: [
      {
        name: '人流量',
        data: [1000, 1200, 900, 1500, 900, 1200, 1000],
        type: 'line',
        smooth: true,
        lineArea: {
          show: true,
          gradient: ['rgba(251, 114, 147, 1)', 'rgba(251, 114, 147, 0)']
        },
        lineStyle: {
          stroke: 'rgba(251, 114, 147, 1)',
          lineDash: [3, 3]
        },
        linePoint: {
          style: {
            stroke: 'rgba(251, 114, 147, 1)'
          }
        },
        yAxisIndex: 1
      },
      {
        name: '销售额',
        data: [1500, 1700, 1400, 2000, 1400, 1700, 1500],
        type: 'bar',
        gradient: {
          color: ['rgba(103, 224, 227, .6)', 'rgba(103, 224, 227, .1)']
        },
        barStyle: {
          stroke: 'rgba(103, 224, 227, 1)'
        }
      }
    ]
  }

  const option2 = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
      textStyle: {
        color: 'rgba(255,255,255,.6)',
      }
    },
    grid: {
      left: '0%',
      right: '2.5%',
      bottom: '1%',
      containLabel: true //是否显示刻度值
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
          color: 'rgba(255,255,255,.6)'
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: 'rgba(255,255,255,.6)'
        },
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },
      {
        name: 'Line 5',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 191, 0)'
            },
            {
              offset: 1,
              color: 'rgb(224, 62, 76)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 302, 181, 234, 210, 290, 150]
      }
    ]
  };

  const option3 = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '大数据可视化平台',
            fontSize: 30,
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#2f89cf',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 4000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: '#2f89cf'
                }
              }
            ]
          }
        }
      ]
    }
  };

  const option4 = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      width:'80%',
      left:'center',
      itemGap: 5,
      bottom:0,
      textStyle: {
        color: '#fff7',
        fontSize: 12
      },
      itemHeight:10,
      itemWidth:12,
      data: (function () {
        var list = [];
        for (var i = 1; i <= 28; i++) {
          list.push(i + 2000 + '');
        }
        return list;
      })(),
      pageIconSize:13,
      pageTextStyle:{
        color:'#fff7'
      }
    },
    radar: {
      nameGap:5,
      indicator: [
        { text: 'IE8-', max: 400 },
        { text: 'IE9+', max: 400 },
        { text: 'Safari', max: 400 },
        { text: 'Firefox', max: 400 },
        { text: 'Chrome', max: 400 }
      ]
    },
    series: (function () {
      var series = [];
      for (var i = 1; i <= 28; i++) {
        series.push({
          type: 'radar',
          symbol: 'none',
          lineStyle: {
            width: 1
          },
          emphasis: {
            areaStyle: {
              color: 'rgba(0,250,0,0.3)'
            }
          },
          data: [
            {
              value: [
                (40 - i) * 10,
                (38 - i) * 4 + 60,
                i * 5 + 10,
                i * 9,
                (i * i) / 2
              ],
              name: i + 2000 + ''
            }
          ]
        });
      }
      return series;
    })()
  };

  const option5 = {
    backgroundColor: '#000',
    globe: {
      baseTexture:'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/earth.jpg',
      shading: 'lambert',
      environment: 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/starfield.jpg',
      atmosphere: {
        show: true
      },
      light: {
        ambient: {
          intensity: 0.1
        },
        main: {
          intensity: 1.5
        }
      }
    },
    series: []
  };





  return (
    <div className={styles.indexPageStyle} style={{ backgroundImage: `url(${pageBg})` }}>
      <TopPage />
      <div className={styles.indexPageContent}>
        <div className={styles.leftPageContent}>
          <Box1 title={'图表一'}>
            <Chart renderer={'canvas'} option={option5} />
          </Box1>
          <Box1 title={'图表二'}>
            <Chart renderer={'canvas'} option={option4} />
          </Box1>
          <Box1 title={'图表三'} children={<Chart renderer={'canvas'} option={option1} />} />
        </div>
        <div className={styles.centerPageContent}>
          <div className={styles.list} style={{ marginTop: '0.6rem' }}>
            <Box2 title={'新增用户数'} unit={'人'} number={'230'} />
            <Box2 title={'付款订单总量'} unit={'件'} number={'1250'} />
            <Box2 title={'今日销售额'} unit={'元'} number={'450.00'} />
          </div>
          <CenterPage />
          <div className={styles.list} style={{ marginTop: '0.25rem' }}>
            <Box2 title={'新增用户数'} unit={'人'} number={'230'} />
            <Box2 title={'付款订单总量'} unit={'件'} number={'1250'} />
            <Box2 title={'今日销售额'} unit={'元'} number={'450.00'} />
          </div>
        </div>
        <div className={styles.rightPageContent}>
          <Box1 title={'图表四'} children={<Chart renderer={'canvas'} option={option3} />} />
          <Box1 title={'图表五'} children={<TreeChart />} />
          <Box1 title={'图表六'} children={<Chart renderer={'canvas'} option={option2} />} />
        </div>
      </div>
    </div>
  );
}

export default Demo1;