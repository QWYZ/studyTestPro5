import styles from './index.less';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import * as Icons from './icon';
import Icon from '@ant-design/icons';
import { Carousel } from 'antd';
import { bannerUIRender, blankUIRender, goodsUIRender, guideUIRender, navBarUIRender, noticeUIRender, searchUIRender} from './components'

const MiniHomePage = (props, ref) => {

    const {
        pageDataChange,//页面数据回调
        pageData,
        selectedIndexChange,
        index
    } = props;
    const [homePageData, setHomePageData] = useState(null);//页面数据
    const [selectedIndex, setSelectedIndex] = useState(index);//当前选中的页面组件

    useEffect(() => {
        setHomePageData(pageData)
        setSelectedIndex(index);
        // console.log('MiniHomePage页面pageData改变触发');
    }, [pageData, index])


    //点击页面组件触发
    const clickItem = (index) => {
        setSelectedIndex(index);
        selectedIndexChange(index)
    }


    /**组件单元 */
    const SortableItem = SortableElement(({ value, sortIndex }) => {
        
        return (
            <div
                className={`${styles.deviseItem} ${styles.optional} ${selectedIndex === sortIndex ? styles.selected : ''}`}
                onClick={() => clickItem(sortIndex)}
            >

                {value?.type === 'search' && searchUIRender(value)}

                {value?.type == 'notice' && noticeUIRender(value)}

                {value?.type == 'banner' && bannerUIRender(value)}

                {value?.type == 'blank' && blankUIRender(value)}

                {value?.type == 'guide' && guideUIRender(value)}

                {value?.type == 'navBar' && navBarUIRender(value)}

                {value?.type == 'goods' && goodsUIRender(value)}

                <div className={styles.btnEditDel}>
                    <div className={styles.btnDel} onClick={(e) => { e.stopPropagation(); handleDeleleItem(sortIndex) }}>
                        删除
                    </div>
                </div>
            </div>
        )
    });

    const SortableList = SortableContainer(({ items }) => {
        return (
            <div className={styles.content}>
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
        let re_items = arrayMoveImmutable(homePageData.items, oldIndex, newIndex)
        let page_data = JSON.parse(JSON.stringify(homePageData.page))
        let body = {
            page: page_data,
            items: re_items
        }

        setHomePageData(body);
        pageDataChange(body);
    };

    /**删除页面组件触发 */
    const handleDeleleItem = (index) => {
        let old_items = JSON.parse(JSON.stringify(homePageData.items))
        old_items.splice(index, 1)
        let page_data = JSON.parse(JSON.stringify(homePageData.page))
        let body = {
            page: page_data,
            items: old_items
        }
        setSelectedIndex('page');
        selectedIndexChange('page');
        setHomePageData(body);
        pageDataChange(body);
    };

    return (
        <div className={styles.phoneContent}>
            {/* 小程序顶部导航栏  */}
            <div
                className={
                    `${styles.phoneTop} 
                    ${styles.optional} 
                    ${selectedIndex === 'page' ? styles.selected : ''}
                    ${styles[homePageData?.page?.style?.titleTextColor]}`
                }
                style={{ backgroundColor: homePageData?.page?.style?.titleBackgroundColor }}
                onClick={() => clickItem('page')}
            >
                <p
                    className={styles.title}
                    style={{ color: homePageData?.page?.style?.titleTextColor }}
                >
                    {homePageData?.page?.params?.title}
                </p>
            </div>
            {/* 小程序可拖拽内容区域 */}
            <div className={styles.phoneMain}>
                {
                    homePageData &&
                    <SortableList
                        lockAxis='y'
                        distance={1}
                        items={homePageData?.items}
                        onSortEnd={onSortEnd}
                        helperClass={styles.helperClass}
                        // hideSortableGhost={false}
                        useWindowAsScrollContainer
                    />
                }
            </div>

        </div>
    )

}



export default forwardRef(MiniHomePage)