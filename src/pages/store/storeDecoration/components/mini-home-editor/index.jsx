import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { Card, Input, Tabs, Radio, Button, Slider, Image, Upload, Tooltip, Checkbox, InputNumber } from 'antd';
import { ProFormColorPicker } from '@ant-design/pro-form';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const MiniHomeEditor = (props) => {

    const {
        type,//当前选中的组件类型
        pageData,
        pageDataChange
    } = props;

    const [allData, setAllData] = useState(pageData);//当前页面数据
    const [componentType, setComponentType] = useState(type);//当前编辑组件类型
    const [isDrag, setIsDrag] = useState(false);//拖拽开关
    const [isRefresh, setIsRefresh] = useState(false);//刷新编辑区域

    useEffect(() => {
        setAllData(pageData);
    }, [pageData])

    useEffect(() => {
        setIsRefresh(true)
        setComponentType(type);
        setTimeout(() => {
            setIsRefresh(false)
        }, 1)
        setIsDrag(false)
    }, [type])


    /**返回当前组件类型 */
    const currentComponentType = () => {
        let type = componentType;
        // console.log('返回当前组件类型',type);
        if (type !== 'page') {
            return allData?.items[componentType]?.type;
        } else {
            return 'page';
        }
    }

    /**获取卡片标题 */
    const cardTitle = () => {
        let type = componentType
        let title = '';
        if (type === 'page') {
            return allData?.page.name
        } else {
            // console.log('获取卡片标题',allData?.items,componentType);
            return allData?.items[componentType]?.name
        }
    }

    /**导航栏 */
    const miniPageRender = (pageData) => {
        return (
            <Tabs>
                <Tabs.TabPane key={1} tab={'页面设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>基本信息</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>页面名称</span>
                            <div className={styles.flexBox}>
                                <Input
                                    defaultValue={pageData.page.params.name}
                                    onChange={(e) => {
                                        allData.page.params.name = e.target.value;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                                <div className={styles.tips}>页面名称仅用于后台管理</div>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>分享标题</span>
                            <div className={styles.flexBox}>
                                <Input
                                    defaultValue={pageData.page.params.shareTitle}
                                    onChange={(e) => {
                                        allData.page.params.shareTitle = e.target.value;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                                <div className={styles.tips}>用户端转发时显示的标题</div>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key={2} tab={'标题栏设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>标题栏设置</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>标题名称</span>
                            <div className={styles.flexBox}>
                                <Input
                                    defaultValue={pageData.page.params.title}
                                    onChange={(e) => {
                                        allData.page.params.title = e.target.value;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}

                                />
                                <div className={styles.tips}>用户端端顶部显示的标题</div>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>文字颜色</span>
                            <Radio.Group
                                buttonStyle="solid"
                                defaultValue={pageData.page.style.titleTextColor}
                                onChange={(e) => {
                                    allData.page.style.titleTextColor = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >
                                <Radio.Button value="white">白色</Radio.Button>
                                <Radio.Button value="black">黑色</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>标题栏背景</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.page.style.titleBackgroundColor = '#fff';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.page.style.titleBackgroundColor,
                                        onChange: (color) => {
                                            allData.page.style.titleBackgroundColor = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )
    }

    /**搜索栏 */
    const miniSearchRender = (pageData) => {

        return (
            <Tabs>
                <Tabs.TabPane key={1} tab={'内容设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>功能设置</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>提示文字</span>
                            <div className={styles.flexBox}>
                                <Input
                                    defaultValue={pageData.items[componentType].params.placeholder}
                                    onChange={(e) => {
                                        allData.items[componentType].params.placeholder = e.target.value;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key={2} tab={'样式设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>内容样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>搜索框样式</span>
                            <Radio.Group
                                buttonStyle="solid"
                                defaultValue={pageData.items[componentType].style.searchStyle}
                                onChange={(e) => {
                                    allData.items[componentType].style.searchStyle = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >
                                <Radio.Button value="square">方形</Radio.Button>
                                <Radio.Button value="radius">圆角</Radio.Button>
                                <Radio.Button value="round">圆弧</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>文字对齐</span>
                            <Radio.Group
                                buttonStyle="solid"
                                defaultValue={pageData.items[componentType].style.textAlign}
                                onChange={(e) => {
                                    allData.items[componentType].style.textAlign = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >
                                <Radio.Button value="left">居左</Radio.Button>
                                <Radio.Button value="center">居中</Radio.Button>
                                <Radio.Button value="right">居右</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )
    }

    /**公告栏 */
    const miniNoticeRender = (pageData) => {

        return (
            <Tabs>
                <Tabs.TabPane key={1} tab={'内容设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>公告文案</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>内容</span>
                            <div className={styles.flexBox}>
                                <Input
                                    defaultValue={pageData.items[componentType].params.text}
                                    onChange={(e) => {
                                        allData.items[componentType].params.text = e.target.value;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>链接</span>
                            <div className={styles.flexBox}>

                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key={2} tab={'样式设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>内容样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>文字颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.textColor = '#000';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.textColor,
                                        onChange: (color) => {
                                            allData.items[componentType].style.textColor = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>背景颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.background = '#fff';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.background,
                                        onChange: (color) => {
                                            allData.items[componentType].style.background = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )
    }

    /**轮播图 */
    const miniBannerRender = (pageData) => {

        const itemRender = (value, sortIndex) => {
            return (
                <div className={`${styles.blockBox} ${styles.drag} ${isDrag ? styles.optional : ''} ${isDrag ? styles.selected : ''}`}>
                    <div className={styles.blockTitle}>
                        <span className={styles.left}>图片 {sortIndex + 1}</span>
                        <a className={styles.link} onClick={() => { handleDeleleItem(sortIndex) }}>删除</a>
                    </div>
                    {/* <div className={styles.blockItem} style={{ background: '#fff' }}>
                        {value?.imgUrl !== '' && <Image src={value?.imgUrl} width={375} height={200} />}
                    </div> */}
                    <div className={styles.blockItem}>
                        <div className={styles.blockItemCommon}>
                            <div className={styles.blockItemCommonRow}>
                                <span className={styles.label}>图片</span>
                                <div className={styles.flexBox}>
                                    <Input
                                        readOnly={isDrag}
                                        defaultValue={value?.imgUrl}
                                        onChange={(e) => {
                                            allData.items[componentType].data[sortIndex].imgUrl = e.target.value;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }}
                                    />
                                </div>

                            </div>
                            <div className={styles.blockItemCommonRow}>
                                <span className={styles.label}>链接</span>

                            </div>
                        </div>
                        <div className={styles.blockItemCustom}>
                            <Tooltip title={'建议尺寸：750x400'}>
                                {
                                    value.imgUrl !== '' &&
                                    <Image
                                        width={100}
                                        height={100}
                                        src={value.imgUrl}
                                        preview={{
                                            visible: false,
                                            mask: (
                                                !isDrag &&
                                                <Upload
                                                    accept={'image/*'}
                                                >
                                                    <Button>替换</Button>
                                                </Upload>
                                            ),
                                            // getContainer:false
                                        }}

                                    />
                                }

                            </Tooltip>

                        </div>
                    </div>
                </div>
            )
        }

        /**组件单元 */
        const SortableItem = SortableElement(({ value, sortIndex }) => (
            itemRender(value, sortIndex)
        ));

        const SortableList = SortableContainer(({ items }) => {
            return (
                <div>
                    {
                        items.map((value, index) => {

                            return (
                                <SortableItem key={`item-${index}`} sortIndex={index} index={index} value={value} />
                            )
                        })
                    }
                </div>
            );
        });

        /**更改页面组件位置触发 */
        const onSortEnd = ({ oldIndex, newIndex }) => {
            let re_items = arrayMoveImmutable(allData.items[componentType].data, oldIndex, newIndex)
            allData.items[componentType].data = re_items
            setAllData(allData);
            pageDataChange(allData);
        };

        /**删除页面组件触发 */
        const handleDeleleItem = (index) => {
            allData.items[componentType].data.splice(index, 1)
            setAllData(allData);
            pageDataChange(allData);
        };

        return (
            <Tabs>
                <Tabs.TabPane key={1} tab={'内容设置'}>
                    <div className={styles.subTitle}>
                        添加图片 (最多5张，可拖动排序）
                        <Button size={'small'} type={'primary'} onClick={() => { setIsDrag(!isDrag) }}>{isDrag ? '完成' : '排序'}</Button>
                    </div>
                    {
                        isDrag &&
                        <SortableList
                            useWindowAsScrollContainer
                            distance={1}
                            items={pageData.items[componentType].data}
                            onSortEnd={onSortEnd}
                            axis='y'
                        />
                    }
                    {
                        !isDrag &&
                        pageData.items[componentType].data.map((value, sortIndex) => {
                            return (
                                itemRender(value, sortIndex)
                            )
                        })
                    }

                    {
                        pageData.items[componentType].data && pageData.items[componentType].data.length < 5 &&
                        <div className={styles.dataAdd} hidden={isDrag}>
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    allData.items[componentType].data.push({ imgUrl: '', link: '' });
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >添加图片
                            </Button>
                        </div>
                    }

                </Tabs.TabPane>
                <Tabs.TabPane key={2} tab={'样式设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>内容样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>指示点颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.btnColor = '#fff';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.btnColor,
                                        onChange: (color) => {
                                            allData.items[componentType].style.btnColor = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>切换时间</span>
                            <div className={styles.itemSlider} style={{ width: 190 }}>
                                <Slider
                                    defaultValue={pageData.items[componentType].style.interval}
                                    step={0.5}
                                    min={1}
                                    max={20}
                                    onChange={(e) => {
                                        allData.items[componentType].style.interval = e;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                                <span className={styles.unitText}>
                                    <span>{pageData.items[componentType].style.interval}</span>
                                    <span>秒</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )
    }

    /**辅助空白 */
    const miniBlankRender = (pageData) => {
        return (
            <Tabs>
                <Tabs.TabPane key={2} tab={'样式设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>内容样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>背景颜色</span>
                            <div className={styles.itemSlider} style={{ width: 190 }}>
                                <Slider
                                    defaultValue={pageData.items[componentType].style.height}
                                    step={1}
                                    min={5}
                                    max={200}
                                    onChange={(e) => {
                                        allData.items[componentType].style.height = e;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                                <span className={styles.unitText}>
                                    <span>{pageData.items[componentType].style.height}</span>
                                    <span>px</span>
                                </span>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>背景颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.background = '#fff';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.background,
                                        onChange: (color) => {
                                            allData.items[componentType].style.background = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )
    }

    /**辅助线 */
    const miniGuideRender = (pageData) => {
        return (
            <Tabs>
                <Tabs.TabPane key={2} tab={'样式设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>样式设置</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>线条样式</span>
                            <Radio.Group
                                buttonStyle="solid"
                                defaultValue={pageData.items[componentType].style.lineStyle}
                                onChange={(e) => {
                                    allData.items[componentType].style.lineStyle = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >

                                <Radio.Button value={"solid"}>实线</Radio.Button>
                                <Radio.Button value={"dashed"}>虚线</Radio.Button>
                                <Radio.Button value={"dotted"}>点状</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>线条颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.lineColor = '#000';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.lineColor,
                                        onChange: (color) => {
                                            allData.items[componentType].style.lineColor = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>线条高度</span>
                            <div className={styles.itemSlider} style={{ width: 190 }}>
                                <Slider
                                    defaultValue={pageData.items[componentType].style.lineHeight}
                                    step={1}
                                    min={1}
                                    max={20}
                                    onChange={(e) => {
                                        allData.items[componentType].style.lineHeight = e;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                                <span className={styles.unitText}>
                                    <span>{pageData.items[componentType].style.lineHeight}</span>
                                    <span>px</span>
                                </span>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>上下边距</span>
                            <div className={styles.itemSlider} style={{ width: 190 }}>
                                <Slider
                                    defaultValue={pageData.items[componentType].style.paddingTop}
                                    step={1}
                                    min={0}
                                    max={50}
                                    onChange={(e) => {
                                        allData.items[componentType].style.paddingTop = e;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                                <span className={styles.unitText}>
                                    <span>{pageData.items[componentType].style.paddingTop}</span>
                                    <span>px</span>
                                </span>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>背景颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.background = '#fff';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.background,
                                        onChange: (color) => {
                                            allData.items[componentType].style.background = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )

    }

    /**导航组 */
    const miniNavBarRender = (pageData) => {
        /**组件单元UI */
        const itemRender = (value, sortIndex) => {
            return (
                <div className={`${styles.blockBox} ${styles.drag} ${isDrag ? styles.optional : ''} ${isDrag ? styles.selected : ''}`}>
                    <div className={styles.blockTitle}>
                        <span className={styles.left}>导航 {sortIndex + 1}</span>
                        <a className={styles.link} onClick={() => { handleDeleleItem(sortIndex) }}>删除</a>
                    </div>
                    <div className={styles.blockItem}>
                        <div className={styles.blockItemCommon}>
                            <div className={styles.blockItemCommonRow}>
                                <span className={styles.label}>名称</span>
                                <div className={styles.flexBox}>
                                    <Input
                                        readOnly={isDrag}
                                        defaultValue={value?.text}
                                        onChange={(e) => {
                                            allData.items[componentType].data[sortIndex].text = e.target.value;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }}
                                    />
                                </div>

                            </div>
                            <div className={styles.blockItemCommonRow}>
                                <span className={styles.label}>链接</span>

                            </div>
                        </div>
                        <div className={styles.blockItemCustom}>
                            <Tooltip title={'建议尺寸：100×100'}>
                                {
                                    value.imgUrl !== '' &&
                                    <Image
                                        width={100}
                                        height={100}
                                        src={value.imgUrl}
                                        preview={{
                                            visible: false,
                                            mask: (
                                                !isDrag &&
                                                <Upload
                                                    accept={'image/*'}
                                                >
                                                    <Button>替换</Button>
                                                </Upload>
                                            ),
                                            // getContainer:false
                                        }}

                                    />
                                }

                            </Tooltip>

                        </div>
                    </div>
                </div>
            )
        }


        const SortableItem = SortableElement(({ value, sortIndex }) => (
            itemRender(value, sortIndex)
        ));

        const SortableList = SortableContainer(({ items }) => {
            return (
                <div>
                    {
                        items.map((value, index) => {
                            return (
                                <SortableItem key={`item-${index}`} sortIndex={index} index={index} value={value} />
                            )
                        })
                    }
                </div>
            );
        });

        /**更改页面组件位置触发 */
        const onSortEnd = ({ oldIndex, newIndex }) => {
            let re_items = arrayMoveImmutable(allData.items[componentType].data, oldIndex, newIndex)
            allData.items[componentType].data = re_items
            setAllData(allData);
            pageDataChange(allData);
        };

        /**删除页面组件触发 */
        const handleDeleleItem = (index) => {
            allData.items[componentType].data.splice(index, 1)
            setAllData(allData);
            pageDataChange(allData);
        };

        return (
            <Tabs>
                <Tabs.TabPane key={1} tab={'内容设置'}>
                    <div className={styles.subTitle}>
                        添加导航 (最少4个，最多10个，可拖动排序)
                        <Button size={'small'} type={'primary'} onClick={() => { setIsDrag(!isDrag) }}>{isDrag ? '完成' : '排序'}</Button>
                    </div>
                    {
                        isDrag &&
                        <SortableList
                            distance={1}
                            axis='y'
                            items={pageData.items[componentType].data}
                            onSortEnd={onSortEnd}
                            useWindowAsScrollContainer
                        />
                    }
                    {
                        !isDrag &&
                        pageData.items[componentType].data.map((value, sortIndex) => {
                            return (
                                itemRender(value, sortIndex)
                            )
                        })
                    }
                    {
                        pageData.items[componentType].data && pageData.items[componentType].data.length < 10 &&
                        <div className={styles.dataAdd} hidden={isDrag}>
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    allData.items[componentType].data.push({ imgUrl: '', link: '' });
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >添加导航
                            </Button>
                        </div>
                    }

                </Tabs.TabPane>
                <Tabs.TabPane key={2} tab={'样式设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>内容样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>每行数量</span>
                            <Radio.Group
                                buttonStyle="solid"
                                defaultValue={pageData.items[componentType].style.rowsNum}
                                onChange={(e) => {
                                    allData.items[componentType].style.rowsNum = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >
                                <Radio.Button value={3}>3个</Radio.Button>
                                <Radio.Button value={4}>4个</Radio.Button>
                                <Radio.Button value={5}>5个</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>文字颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.textColor = '#000';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.textColor,
                                        onChange: (color) => {
                                            allData.items[componentType].style.textColor = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>组件样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>上下边距</span>
                            <div className={styles.itemSlider} style={{ width: 190 }}>
                                <Slider
                                    defaultValue={pageData.items[componentType].style.paddingTop}
                                    step={1}
                                    min={0}
                                    max={50}
                                    onChange={(e) => {
                                        allData.items[componentType].style.paddingTop = e;
                                        setAllData(allData);
                                        pageDataChange(allData)
                                    }}
                                />
                                <span className={styles.unitText}>
                                    <span>{pageData.items[componentType].style.paddingTop}</span>
                                    <span>px</span>
                                </span>
                            </div>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>背景颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.background = '#fff';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.background,
                                        onChange: (color) => {
                                            allData.items[componentType].style.background = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )
    }

    /**商品组 */
    const miniGoodsRender = (pageData) => {

        return (
            <Tabs>
                <Tabs.TabPane key={1} tab={'内容设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>
                            <span>商品来源</span>

                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>选择来源</span>
                            <Radio.Group
                                size={'small'}
                                buttonStyle="solid"
                                defaultValue={pageData.items[componentType].params.source}
                                onChange={(e) => {
                                    allData.items[componentType].params.source = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >
                                <Radio.Button value={'auto'}>自动获取</Radio.Button>
                                <Radio.Button value={'choice'}>手动选择</Radio.Button>
                            </Radio.Group>
                        </div>

                    </div>
                    {
                        pageData.items[componentType].params.source === 'choice' &&
                        <div className={styles.blockBox} >
                            <div className={styles.blockTitle}>选择商品({pageData.items[componentType].data.length})</div>
                        </div>
                    }
                    {
                        pageData.items[componentType].params.source === 'auto' &&
                        <div className={styles.blockBox} >
                            <div className={styles.blockTitle}>商品内容</div>
                            <div className={styles.blockItem}>
                                <span className={styles.label}>商品分类</span>
                            </div>
                            <div className={styles.blockItem}>
                                <span className={styles.label}>商品排序</span>
                                <Radio.Group
                                    size={'small'}
                                    buttonStyle="solid"
                                    defaultValue={pageData.items[componentType].params.auto.goodsSort}
                                    onChange={(e) => {
                                        allData.items[componentType].params.auto.goodsSort = e.target.value;
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >
                                    <Radio.Button value={'all'}>默认</Radio.Button>
                                    <Radio.Button value={'sales'}>销量</Radio.Button>
                                    <Radio.Button value={'price'}>价格</Radio.Button>
                                </Radio.Group>
                            </div>
                            <div className={styles.blockItem}>
                                <span className={styles.label}>显示数量</span>
                                <div className={styles.blockItemRight}>
                                    <InputNumber
                                        min={1} 
                                        max={50}
                                        defaultValue={pageData.items[componentType].params.auto.showNum}
                                        onChange={(e) => {
                                            allData.items[componentType].params.auto.showNum = e;
                                            setAllData(allData);
                                            pageDataChange(allData);
                                        }}
                                    />
                                    <span className={styles.unitText}>件</span>
                                </div>
                            </div>
                        </div>
                    }

                </Tabs.TabPane>
                <Tabs.TabPane key={2} tab={'样式设置'}>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>内容样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>显示类型</span>
                            <Radio.Group
                                buttonStyle="solid"
                                defaultValue={pageData.items[componentType].style.display}
                                onChange={(e) => {
                                    allData.items[componentType].style.display = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >
                                <Radio.Button value={'list'}>列表平铺</Radio.Button>
                                <Radio.Button disabled={pageData.items[componentType].style.column === 1} value={'slide'}>横向滑动</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>分列数量</span>
                            <Radio.Group
                                buttonStyle="solid"
                                defaultValue={pageData.items[componentType].style.column}
                                onChange={(e) => {
                                    allData.items[componentType].style.column = e.target.value;
                                    setAllData(allData);
                                    pageDataChange(allData);
                                }}
                            >
                                <Radio.Button value={1} disabled={pageData.items[componentType].style.display !== 'list'}>一列</Radio.Button>
                                <Radio.Button value={2}>二列</Radio.Button>
                                <Radio.Button value={3}>三列</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>显示内容</span>
                            <div className={styles.itemCheckbox} style={{ width: '180px' }}>
                                <Checkbox.Group

                                    defaultValue={pageData.items[componentType].style.show}
                                    onChange={(e) => {
                                        allData.items[componentType].style.show = e;
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >
                                    <Checkbox value={"goodsName"}>商品名称</Checkbox>
                                    <Checkbox value={'goodsPrice'}>商品价格</Checkbox>
                                    <Checkbox value={"linePrice"}>划线价格</Checkbox>
                                    {
                                        pageData.items[componentType].style.column === 1 &&
                                        <>
                                            <Checkbox value={"sellingPoint"}>商品卖点</Checkbox>
                                            <Checkbox value={"goodsSales"}>商品销量</Checkbox>
                                        </>
                                    }

                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blockBox} >
                        <div className={styles.blockTitle}>组件样式</div>
                        <div className={styles.blockItem}>
                            <span className={styles.label}>背景颜色</span>
                            <div className={styles.itemColorPicker}>
                                <span
                                    className={styles.restColor}
                                    onClick={() => {
                                        allData.items[componentType].style.background = '#fff';
                                        setAllData(allData);
                                        pageDataChange(allData);
                                    }}
                                >重置
                                </span>
                                <ProFormColorPicker
                                    fieldProps={{
                                        value: pageData.items[componentType].style.background,
                                        onChange: (color) => {
                                            allData.items[componentType].style.background = color;
                                            setAllData(allData);
                                            pageDataChange(allData)
                                        }
                                    }}
                                ></ProFormColorPicker>
                            </div>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        )
    }

    return (
        <div className={styles.card}>
            <Card className={styles.editor}>
                <div className={styles.editorTitle}>
                    <span>{cardTitle()}</span>
                </div>

                <div className={styles.editorContent}>
                    {currentComponentType() === 'page' && !isRefresh && miniPageRender(allData)}
                    {currentComponentType() === 'search' && !isRefresh && miniSearchRender(allData)}
                    {currentComponentType() === 'notice' && !isRefresh && miniNoticeRender(allData)}
                    {currentComponentType() === 'banner' && !isRefresh && miniBannerRender(allData)}
                    {currentComponentType() === 'blank' && !isRefresh && miniBlankRender(allData)}
                    {currentComponentType() === 'guide' && !isRefresh && miniGuideRender(allData)}
                    {currentComponentType() === 'navBar' && !isRefresh && miniNavBarRender(allData)}
                    {currentComponentType() === 'goods' && !isRefresh && miniGoodsRender(allData)}
                </div>
            </Card>
        </div>
    )
}

export default MiniHomeEditor