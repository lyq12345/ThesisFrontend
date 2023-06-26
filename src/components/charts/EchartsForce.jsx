/**
 * Created by SEELE on 2017/8/23.
 */
import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';


const EchartsForce = ({graph}) => {


    const getOption = ()=> {

        return {
            title: {
                text: '',
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                    },
                },
            },
            legend: {
                x: 'center',
                show: false,
                data: ['朋友', '战友', '亲戚'],
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 45,
                    focusNodeAdjacency: true,
                    roam: true,
                    categories: [
                        {
                            name: 'insitu',
                            itemStyle: {
                                normal: {
                                    color: '#009800',
                                },
                            },
                        },
                        {
                            name: 'mobile',
                            itemStyle: {
                                normal: {
                                    color: '#4592FF',
                                },
                            },
                        },
                    ],
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 12,
                            },
                            formatter: function(params) {
                                // 通过 params.data 访问节点的数据
                                return params.data.operator + '\n' + params.data.device;
                              },
                        },
                    },
                    force: {
                        repulsion: 1000,
                    },
                    edgeSymbol: ['none', 'arrow'],
                    edgeSymbolSize: [50, 4],
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 10,
                            },
                            formatter: '{c}',
                        },
                    },
                    data: graph && graph.deployment ? graph.deployment.map(item => {
                        return {
                            id: item.operator,
                            draggable: true,
                            operator: item.operator,
                            device: item.device,
                            category: item.operator === "picamera" ? "mobile" : "insitu"
                        }
                    }): [],
                    // data: [],
                    links: [
                        {
                            source: 'picamera',
                            target: 'imgaugment',
                            category: 0,
                            value: 'call',
                        },
                        {
                            source: 'imgaugment',
                            target: 'humandetection',
                            value: 'call',
                        },
                        {
                            source: 'imgaugment',
                            target: 'humandetection',
                            value: 'call',
                        },
                    ],
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 1,
                            curveness: 0,
                        },
                    },
                },
            ],
        };
    }



    return (
        <ReactEcharts
            option={getOption()}
            style={{ height: '400px', width: '100%' }}
            className={'react_for_echarts'}
        />
    );
}

export default EchartsForce;
