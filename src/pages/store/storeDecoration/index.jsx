import styles from './index.less';
import React, { useState, useEffect, useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, message, Drawer, Tree, Spin, Switch, Popconfirm, Tag, Row, Col, Alert } from 'antd';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import MiniHomePage from './components/mini-home-page';
import MiniHomeComponents from './components/mini-home-components';
import MiniHomeEditor from './components/mini-home-editor';
import cgy1 from '@/assets/cgy/cgy1.png';
import cgy2 from '@/assets/cgy/cgy2.png';
import cgy3 from '@/assets/cgy/cgy3.png';
import { connect } from 'umi';
import { initPageData, defaultData } from './mockData';


/**店铺装修 */
const StoreDecoration = (props) => {
    console.log(props);
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
            <Alert message={'基于react-sortable-hoc实现的拖拽'} description={'react-sortable-hoc是一组高阶组件,可将任何列表转换为动画、可访问和触摸友好的可排序列表)'} type={'info'} showIcon banner closable />
            <br />
            {tabActiveKey === 'home' && homeDecorationPage()}
        </PageContainer>
    )
}

export default connect((data) => data)(StoreDecoration);