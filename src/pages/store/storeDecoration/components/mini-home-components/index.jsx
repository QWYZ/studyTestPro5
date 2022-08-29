import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import Icon from '@ant-design/icons';
import * as Icons from './icon';

const MiniHomeComponents = (props) =>{
    const { handleClickItem } = props
    const [componentKeys, setComponentKeys] = useState(['media', 'store', 'other']);
    const componentsData = [
        {
            name: '媒体组件',
            key: 'media',
            data: [
                {
                    name: '轮播图',
                    type: 'banner',
                    icon: Icons.banner
                },
                // {
                //     name: '图片',
                //     type: 'image',
                //     icon: Icons.image
                // },
                // {
                //     name: '图片橱窗',
                //     type: 'window',
                //     icon: Icons.window
                // },
                // {
                //     name: '视频',
                //     type: 'video',
                //     icon: Icons.video
                // },
                // {
                //     name: '文章',
                //     type: 'article',
                //     icon: Icons.article
                // }
            ]
        },
        {
            name: '商城组件',
            key: 'store',
            data: [
                {
                    name: '搜索框',
                    type: 'search',
                    icon: Icons.search
                },
                {
                    name: '店铺公告',
                    type: 'notice',
                    icon: Icons.notice
                },
                {
                    name: '导航',
                    type: 'navBar',
                    icon: Icons.navBar
                },
                {
                    name: '商品',
                    type: 'goods',
                    icon: Icons.goods
                },
                // {
                //     name: '在线客服',
                //     type: 'service',
                //     icon: Icons.service
                // }
            ]
        },
        {
            name: '其他组件',
            key: 'other',
            data: [
                // {
                //     name: '富文本',
                //     type: 'richText',
                //     icon: Icons.richText
                // },
                {
                    name: '辅助空白',
                    type: 'blank',
                    icon: Icons.blank
                },
                {
                    name: '辅助线',
                    type: 'guide',
                    icon: Icons.guide
                }
            ]
        }
    ]

    return (
        <div className={styles.components}>
            <Collapse defaultActiveKey={componentKeys} bordered={false} expandIconPosition={"right"}>
                {
                    componentsData.length > 0 &&
                    componentsData.map(group => {
                        return (
                            <Collapse.Panel key={group.key} header={group.name}>
                                <div className={styles.moduleList}>
                                    {
                                        group?.data.length > 0 &&
                                        group.data.map((item, index) => (
                                            <div
                                                key={index}
                                                className={styles.moduleItem}
                                                onClick={()=>{handleClickItem(item.type)}}
                                            >
                                                <Icon key={index} className={styles.moduleIcon}  component={item.icon} />
                                                <span className={styles.moduleTitle}>{item.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Collapse.Panel>
                        )
                    })
                }

            </Collapse>
        </div>
    )
}

export default MiniHomeComponents