import styles from './index.less';
import React, { useState, useEffect, useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, message, Drawer, Tree, Spin, Switch, Popconfirm, Tag, Row, Col } from 'antd';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import MiniHomePage from './components/mini-home-page';
import MiniHomeComponents from './components/mini-home-components';
import MiniHomeEditor from './components/mini-home-editor';
import cgy1 from '@/assets/cgy/cgy1.png';
import cgy2 from '@/assets/cgy/cgy2.png';
import cgy3 from '@/assets/cgy/cgy3.png';
//模拟页面初始数据
const initPageData = {
    "page": {
        "name": "页面设置",
        "type": "page",
        "params": {
            "name": "商城首页",
            "title": "XX商城",
            "shareTitle": "分享标题"
        },
        "style": {
            "titleTextColor": "black",
            "titleBackgroundColor": "#ffffff"
        }
    },
    "items": [
        {
            "name": "搜索框",
            "type": "search",
            "params": {
                "placeholder": "请输入关键字进行搜索"
            },
            "style": {
                "textAlign": "left",
                "searchStyle": "square"
            }
        },
        {
            "name": "店铺公告",
            "type": "notice",
            "params": {
                "text": "萤火商城系统 [ 致力于通过产品和服务，帮助商家高效化开拓市场 ]",
                "link": null,
                "showIcon": true,
                "scrollable": true
            },
            "style": {
                "paddingTop": 0,
                "background": "#fffbe8",
                "textColor": "#de8c17"
            }
        }
    ]
}
const defaultData = {
    "search": {
        "name": "搜索框",
        "type": "search",
        "params": {
            "placeholder": "请输入关键字进行搜索"
        },
        "style": {
            "textAlign": "left",
            "searchStyle": "square"
        }
    },
    "banner": {
        "name": "图片轮播",
        "type": "banner",
        "style": {
            "btnColor": "#ffffff",
            "btnShape": "round",
            "interval": 2.5
        },
        "data": [
            {
                "imgUrl": "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "link": null
            },
            {
                "imgUrl": "https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "link": null
            }
        ]
    },
    // "image": {
    //     "name": "图片",
    //     "type": "image",
    //     "style": {
    //         "paddingTop": 0,
    //         "paddingLeft": 0,
    //         "background": "#ffffff"
    //     },
    //     "data": [
    //         {
    //             "imgUrl": "https://localhost:8001/assets/store/img/diy/banner/01.png",
    //             "imgName": "image-1.jpg",
    //             "link": null
    //         }
    //     ]
    // },
    "navBar": {
        "name": "导航组",
        "type": "navBar",
        "style": {
            "rowsNum": 4,
            "background": "#ffffff",
            "paddingTop": 0,
            "textColor": "#666666"
        },
        "data": [
            {
                "imgUrl": cgy1,
                "imgName": "icon-1.png",
                "link": null,
                "text": "按钮文字1"
            },
            {
                "imgUrl": cgy2,
                "imgName": "icon-2.jpg",
                "link": null,
                "text": "按钮文字2"
            },
            {
                "imgUrl": cgy3,
                "imgName": "icon-3.jpg",
                "link": null,
                "text": "按钮文字3"
            },
            {
                "imgUrl": cgy1,
                "imgName": "icon-4.jpg",
                "link": null,
                "text": "按钮文字4"
            }
        ]
     },
    "blank": {
        "name": "辅助空白",
        "type": "blank",
        "style": {
            "height": 20,
            "background": "#ffffff"
        }
    },
    "guide": {
        "name": "辅助线",
        "type": "guide",
        "style": {
            "background": "#ffffff",
            "lineStyle": "solid",
            "lineHeight": 1,
            "lineColor": "#000000",
            "paddingTop": 10
        }
    },
    // "video": {
    //     "name": "视频组",
    //     "type": "video",
    //     "params": {
    //         "videoUrl": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400.mp4",
    //         "poster": "https://localhost:8001/assets/store/img/diy/video_poster.png",
    //         "autoplay": 0
    //     },
    //     "style": {
    //         "paddingTop": 0,
    //         "height": 190
    //     }
    // },
    // "article": {
    //     "name": "文章组",
    //     "type": "article",
    //     "params": {
    //         "source": "auto",
    //         "auto": {
    //             "category": -1,
    //             "showNum": 6
    //         }
    //     },
    //     "defaultData": [
    //         {
    //             "title": "此处显示文章标题",
    //             "show_type": 10,
    //             "image": "https://localhost:8001/assets/store/img/diy/article/01.png",
    //             "views_num": 309
    //         },
    //         {
    //             "title": "此处显示文章标题",
    //             "show_type": 10,
    //             "image": "https://localhost:8001/assets/store/img/diy/article/01.png",
    //             "views_num": 309
    //         }
    //     ],
    //     "data": []
    // },
    "notice": {
        "name": "店铺公告",
        "type": "notice",
        "params": {
            "text": "这里是第一条自定义公告的标题",
            "link": null,
            "showIcon": true,
            "scrollable": true
        },
        "style": {
            "paddingTop": 0,
            "background": "#fffbe8",
            "textColor": "#de8c17"
        }
    },
    // "richText": {
    //     "name": "富文本",
    //     "type": "richText",
    //     "params": {
    //         "content": "<p>这里是文本的内容</p>"
    //     },
    //     "style": {
    //         "paddingTop": 0,
    //         "paddingLeft": 0,
    //         "background": "#ffffff"
    //     }
    // },
    // "window": {
    //     "name": "图片橱窗",
    //     "type": "window",
    //     "style": {
    //         "paddingTop": 0,
    //         "paddingLeft": 0,
    //         "background": "#ffffff",
    //         "layout": 2
    //     },
    //     "data": [
    //         {
    //             "imgUrl": "https://localhost:8001/assets/store/img/diy/window/01.jpg",
    //             "link": null
    //         },
    //         {
    //             "imgUrl": "https://localhost:8001/assets/store/img/diy/window/02.jpg",
    //             "link": null
    //         },
    //         {
    //             "imgUrl": "https://localhost:8001/assets/store/img/diy/window/03.jpg",
    //             "link": null
    //         },
    //         {
    //             "imgUrl": "https://localhost:8001/assets/store/img/diy/window/04.jpg",
    //             "link": null
    //         }
    //     ],
    //     "dataNum": 4
    // },
    "goods": {
        "name": "商品组",
        "type": "goods",
        "params": {
            "source": "auto",
            "auto": {
                "category": 0,
                "goodsSort": "all",
                "showNum": 6
            }
        },
        "style": {
            "background": "#F6F6F6",
            "display": "list",
            "column": 2,
            "show": [
                "goodsName",
                "goodsPrice",
                "linePrice",
                "sellingPoint",
                "goodsSales"
            ]
        },
        "defaultData": [
            {
                "goods_name": "此处显示商品名称",
                "goods_image": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?cs=srgb&dl=pexels-daria-shevtsova-704569.jpg&fm=jpg",
                "goods_price_min": "99.00",
                "line_price_min": "139.00",
                "selling_point": "此款商品美观大方 不容错过",
                "goods_sales": 100
            },
            {
                "goods_name": "此处显示商品名称",
                "goods_image": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?cs=srgb&dl=pexels-daria-shevtsova-704569.jpg&fm=jpg",
                "goods_price_min": "99.00",
                "line_price_min": "139.00",
                "selling_point": "此款商品美观大方 不容错过",
                "goods_sales": 100
            },
            {
                "goods_name": "此处显示商品名称",
                "goods_image": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?cs=srgb&dl=pexels-daria-shevtsova-704569.jpg&fm=jpg",
                "goods_price_min": "99.00",
                "line_price_min": "139.00",
                "selling_point": "此款商品美观大方 不容错过",
                "goods_sales": 100
            },
            {
                "goods_name": "此处显示商品名称",
                "goods_image": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?cs=srgb&dl=pexels-daria-shevtsova-704569.jpg&fm=jpg",
                "goods_price_min": "99.00",
                "line_price_min": "139.00",
                "selling_point": "此款商品美观大方 不容错过",
                "goods_sales": 100
            }
        ],
        "data": [
            {
                "goods_name": "此处显示商品名称",
                "goods_image": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?cs=srgb&dl=pexels-daria-shevtsova-704569.jpg&fm=jpg",
                "goods_price_min": "99.00",
                "line_price_min": "139.00",
                "selling_point": "此款商品美观大方 不容错过",
                "goods_sales": 100
            },
            {
                "goods_name": "此处显示商品名称",
                "goods_image": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?cs=srgb&dl=pexels-daria-shevtsova-704569.jpg&fm=jpg",
                "goods_price_min": "99.00",
                "line_price_min": "139.00",
                "selling_point": "此款商品美观大方 不容错过",
                "goods_sales": 100
            }
        ]
    },
    // "service": {
    //     "name": "在线客服",
    //     "type": "service",
    //     "params": {
    //         "type": "chat",
    //         "image": "https://localhost:8001/assets/store/img/diy/service.png",
    //         "tel": ""
    //     },
    //     "style": {
    //         "right": 1,
    //         "bottom": 10,
    //         "opacity": 100
    //     }
    // },
    // "officialAccount": {
    //     "name": "关注公众号",
    //     "type": "officialAccount",
    //     "params": [],
    //     "style": []
    // },
    // "shop": {
    //     "name": "线下门店",
    //     "type": "shop",
    //     "params": {
    //         "source": "auto",
    //         "auto": {
    //             "showNum": 6
    //         }
    //     },
    //     "style": {
    //         "show": [
    //             "logo",
    //             "address",
    //             "phone"
    //         ],
    //         "background": "#ffffff"
    //     },
    //     "defaultData": [
    //         {
    //             "shop_name": "此处显示门店名称",
    //             "logo_url": "https://localhost:8001/assets/store/img/diy/circular.png",
    //             "phone": "010-6666666",
    //             "region": {
    //                 "province": "xxx省",
    //                 "city": "xxx市",
    //                 "region": "xxx区"
    //             },
    //             "address": "xxx街道"
    //         },
    //         {
    //             "shop_name": "此处显示门店名称",
    //             "logo_url": "https://localhost:8001/assets/store/img/diy/circular.png",
    //             "phone": "010-6666666",
    //             "region": {
    //                 "province": "xxx省",
    //                 "city": "xxx市",
    //                 "region": "xxx区"
    //             },
    //             "address": "xxx街道"
    //         }
    //     ],
    //     "data": [
    //         {
    //             "shop_name": "此处显示门店名称",
    //             "logo_url": "https://localhost:8001/assets/store/img/diy/circular.png",
    //             "phone": "010-6666666",
    //             "region": {
    //                 "province": "xxx省",
    //                 "city": "xxx市",
    //                 "region": "xxx区"
    //             },
    //             "address": "xxx街道"
    //         }
    //     ]
    // },
    // "bargain": {
    //     "name": "砍价商品组",
    //     "type": "bargain",
    //     "params": {
    //         "source": "auto",
    //         "auto": {
    //             "goodsSort": "all",
    //             "showNum": 6
    //         }
    //     },
    //     "style": {
    //         "background": "#F6F6F6",
    //         "show": [
    //             "goodsName",
    //             "peoples",
    //             "floorPrice",
    //             "originalPrice"
    //         ]
    //     },
    //     "demo": {
    //         "helpsCount": 2,
    //         "helpList": [
    //             {
    //                 "user": {
    //                     "avatar_url": "http://tva1.sinaimg.cn/large/0060lm7Tly1g4c7zrytvvj30dw0dwwes.jpg"
    //                 }
    //             },
    //             {
    //                 "user": {
    //                     "avatar_url": "http://tva1.sinaimg.cn/large/0060lm7Tly1g4c7zs2u5ej30b40b4dfx.jpg"
    //                 }
    //             }
    //         ]
    //     },
    //     "defaultData": [
    //         {
    //             "goods_name": "此处是砍价商品",
    //             "goods_image": "https://localhost:8001/assets/store/img/diy/goods/01.png",
    //             "floor_price": "0.01",
    //             "original_price": "139.00"
    //         },
    //         {
    //             "goods_name": "此处是砍价商品",
    //             "goods_image": "https://localhost:8001/assets/store/img/diy/goods/01.png",
    //             "floor_price": "0.01",
    //             "original_price": "139.00"
    //         }
    //     ],
    //     "data": [
    //         {
    //             "goods_name": "此处是砍价商品",
    //             "goods_image": "https://localhost:8001/assets/store/img/diy/goods/01.png",
    //             "floor_price": "0.01",
    //             "original_price": "139.00"
    //         },
    //         {
    //             "goods_name": "此处是砍价商品",
    //             "goods_image": "https://localhost:8001/assets/store/img/diy/goods/01.png",
    //             "floor_price": "0.01",
    //             "original_price": "139.00"
    //         }
    //     ]
    // },
    // "sharp": {
    //     "name": "整点秒杀",
    //     "type": "sharp",
    //     "params": {
    //         "showNum": 6
    //     },
    //     "style": {
    //         "background": "#ffffff",
    //         "column": 3,
    //         "show": [
    //             "goodsName",
    //             "seckillPrice",
    //             "originalPrice"
    //         ]
    //     },
    //     "data": [
    //         {
    //             "goods_name": "此处是秒杀商品",
    //             "goods_image": "https://localhost:8001/assets/store/img/diy/goods/01.png",
    //             "seckill_price_min": "69.00",
    //             "original_price": "139.00"
    //         },
    //         {
    //             "goods_name": "此处是秒杀商品",
    //             "goods_image": "https://localhost:8001/assets/store/img/diy/goods/01.png",
    //             "seckill_price_min": "69.00",
    //             "original_price": "139.00"
    //         },
    //         {
    //             "goods_name": "此处是秒杀商品",
    //             "goods_image": "https://localhost:8001/assets/store/img/diy/goods/01.png",
    //             "seckill_price_min": "69.00",
    //             "original_price": "139.00"
    //         }
    //     ]
    // },
    // "coupon": {
    //     "name": "优惠券组",
    //     "type": "coupon",
    //     "style": {
    //         "paddingTop": 10,
    //         "background": "#ffffff",
    //         "marginRight": 20,
    //         "couponBgColor": "#ffa708",
    //         "receiveBgColor": "#717070"
    //     },
    //     "params": {
    //         "showNum": 5
    //     },
    //     "data": [
    //         {
    //             "reduce_price": "10",
    //             "min_price": "100.00"
    //         },
    //         {
    //             "reduce_price": "10",
    //             "min_price": "100.00"
    //         },
    //         {
    //             "reduce_price": "10",
    //             "min_price": "100.00"
    //         }
    //     ]
    // },
    // "special": {
    //     "name": "头条快报",
    //     "type": "special",
    //     "params": {
    //         "source": "auto",
    //         "auto": {
    //             "category": -1,
    //             "showNum": 6
    //         },
    //         "display": 1,
    //         "image": "https://localhost:8001/assets/store/img/diy/special.png"
    //     },
    //     "style": {
    //         "background": "#ffffff",
    //         "textColor": "#141414",
    //         "paddingTop": 0
    //     },
    //     "defaultData": [
    //         {
    //             "title": "张小龙4小时演讲：你和高手之间，隔着“简单”二字"
    //         },
    //         {
    //             "title": "张小龙4小时演讲：你和高手之间，隔着“简单”二字"
    //         }
    //     ],
    //     "data": []
    // }
}

/**店铺装修 */
const StoreDecoration = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [tabActiveKey, setTabActiveKey] = useState('home');
    const [homePageData, setHomePageData] = useState(null);
    const [changeFlag, setChangeFlag] = useState(null);//数据改变标志，
    const [selectedIndex, setSelectedIndex] = useState('page');
    useEffect(() => {
        setHomePageData(initPageData)
        setIsLoading(false);
    }, [])

    useEffect(() => {
        //触发homePageData重新渲染组件
        // console.log('触发homePageData重新渲染组件',homePageData,selectedIndex);
        setChangeFlag(true);
    }, [changeFlag])

    const onFormSubmit = () => {
        console.log('onFormSubmit', homePageData);
    }

    const onTabChange = (key) => {
        setTabActiveKey(key)
    }

    /**点击组件类型触发 */
    const handleClickItem = (type) => {
        let data = JSON.parse(JSON.stringify(defaultData[type]));
        let oldData = homePageData?.items;
        oldData.push(data);
        // console.log(oldData);
        let body = {
            page:homePageData?.page,
            items:oldData
        }
        setHomePageData(body);
    }


    /**首页装修 */
    const homeDecorationPage = () => {
        const ref= useRef();
        return (
            <div className={styles.container}>
                <Spin spinning={isLoading}>
                    <div className={styles.workContent}>
                        {/* 组件库 */}
                        <MiniHomeComponents
                            handleClickItem={(e)=>{
                                handleClickItem(e);
                                setSelectedIndex(homePageData?.items.length-1)                               
                            }}
                            // pageDataChange={(data) => { setHomePageData(data); setChangeFlag(false); }}
                        />
                        {/* 手机容器 */}
                        {
                            !isLoading &&
                            <MiniHomePage
                                pageData={homePageData}
                                pageDataChange={(data) => { setHomePageData(data); setChangeFlag(false); }}
                                selectedIndexChange={(e) => { setSelectedIndex(e);}}
                                index={selectedIndex}
                            />
                        }
                        {/* 编辑区 */}
                        {
                            !isLoading &&
                            <MiniHomeEditor
                                type={selectedIndex}
                                pageData={homePageData}
                                pageDataChange={(data) => { setHomePageData(data); setChangeFlag(false); }}

                            />
                        }

                    </div>
                </Spin>
            </div>
        )
    }

    return (
        <PageContainer
            header={{ title: false }}//{{ title: '店铺装修' }}
            // tabList={[
            //     {
            //         tab: '首页装修',
            //         key: 'home',
            //     },
            //     {
            //         tab: '分类模板',
            //         key: 'categary',
            //     }
            // ]}
            // tabActiveKey={tabActiveKey}
            // onTabChange={onTabChange}
            footer={[
                tabActiveKey === 'home' && <Button className={styles.saveBtn} key={'save'} type={'primary'} loading={isLoading} onClick={onFormSubmit}>保存</Button>
            ]}
        >
            {tabActiveKey === 'home' && homeDecorationPage()}
        </PageContainer>
    )
}

export default StoreDecoration;