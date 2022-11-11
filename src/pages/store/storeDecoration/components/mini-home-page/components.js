import styles from './index.less';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import * as Icons from './icon';
import Icon from '@ant-design/icons';
import { Carousel } from 'antd';

/* 搜索栏 */
export const searchUIRender = (data) => {
    return (
        <div className={styles.diySearch}>
            <div className={`${styles.inner} ${styles[data.style.searchStyle]}`}>
                <div className={styles.searchInput} style={{ textAlign: data.style.textAlign }}>
                    <Icon className={styles.searchIcon} component={Icons.search} />
                    <span>{data.params.placeholder}</span>
                </div>
            </div>
        </div>
    )
}

/** 公告栏 */
export const noticeUIRender = (data) => {

    return (
        <div className={styles.diyNotice} style={{ padding: `${data.style.paddingTop}px 0` }}>
            <div
                className={styles.noticeBody}
                style={{ background: data.style.background, color: data.style.textColor }}
            >
                <div className={styles.notice_icon}>
                    <Icon component={Icons.volumeFill} />
                </div>
                <div className={`${styles.notice_text} ${styles.flexBox} ${styles.onelineHide}`}>
                    <span>{data.params.text}</span>
                </div>
            </div>
        </div>
    )
}

/** 轮播图 */
export const bannerUIRender = (data) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    const selectDotsColor = data.style.btnColor;
    // const noSelectDotsColor = '#fff3';

    return (
        <div className={styles.diyBanner}>
            <Carousel
                autoplaySpeed={data.style.interval * 1000}
                style={{ width: '375px', height: '200px', overflow: 'hidden' }}
                autoplay
                dots
                customPaging={i => {
                    return (
                        <div><button style={{ background: selectDotsColor }} /></div>
                    )
                }}
            >
                {
                    data.data.map((item, index) => (
                        <img
                            width={375}
                            height={200}
                            style={{ width: '375px', height: '200px' }}
                            key={`${index}_${item.dataIdx}_dots`}
                            src={item.imgUrl}
                            alt={`图片${index + 1}`}
                        />
                    ))
                }
            </Carousel>
        </div>
    )
}

/**辅助空白 */
export const blankUIRender = (data) => (
    <div style={{ height: `${data.style.height}px`, background: data.style.background }} />
)

/**辅助线 */
export const guideUIRender = (data) => {
    return (
        <div className={styles.diyGuide} style={{ padding: `${data.style.paddingTop}px 0`, background: data.style.background }}>
            <p
                className={styles.line}
                style={{
                    borderTopWidth: data.style.lineHeight + 'px',
                    borderTopColor: data.style.lineColor,
                    borderTopStyle: data.style.lineStyle
                }}
             />
        </div>
    )
}

/**导航组 */
export const navBarUIRender = (data) => {

    let cName = 'itemNav' + data.style.rowsNum;

    return (
        <div
            className={styles.diyNavBar}
            style={{ padding: `${data.style.paddingTop}px 0`, background: data.style.background, color: data.style.textColor }}
        >
            <ul className={styles.clearfix}>
                {
                    data?.data.map((item, index) => {
                        return (
                            <li className={`${styles.itemNav} ${styles[cName]}`} key={index}>
                                <div className={styles.itemImage}>
                                    <img src={item.imgUrl} />
                                </div>
                                <p className={`${styles.itemText} ${styles.onelineHide}`}>{item.text}</p>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

/**商品组 */
export const goodsUIRender = (data) => {

    let styles1 = 'display_' + data.style.display;
    let styles2 = 'column_' + data.style.column

    return (
        <div className={styles.diyGoods} style={{ background: data.style.background }}>
            <ul
                className={`
                ${styles.goodsList} 
                ${styles.clearfix} 
                ${styles[styles1]}
                ${styles[styles2]}
                `}
            >
                {
                    (data.params.source == 'choice' ? data.data : data.defaultData).map((item, index) => {

                        return (
                            <li
                                key={index}
                                className={styles.goodsItem}
                            >
                                {
                                    data.style.column == 1 &&
                                    <div className={styles.flex}>
                                        <div className={styles.goodsItemLeft}>
                                            <img src={item.goods_image} alt={`商品图片${index}`} />
                                        </div>
                                        <div className={styles.goodsItemRight}>
                                            {
                                                data.style.show.includes('goodsName') &&
                                                <div className={`${styles.goodsItemTitle} ${styles.twolistHide}`}>
                                                    <span>{item.goods_name}</span>
                                                </div>
                                            }
                                            <div className={styles.goodsItemDesc}>
                                                {
                                                    data.style.show.includes('sellingPoint') &&
                                                    <div className={`${styles.descSellingPoint} ${styles.onelineHide}`}>
                                                        <span>{item.selling_point}</span>
                                                    </div>
                                                }
                                                {
                                                    data.style.show.includes('goodsSales') &&
                                                    <div className={`${styles.descGoodsSales} ${styles.onelineHide}`}>
                                                        <span>已售{item.goods_sales}件</span>
                                                    </div>
                                                }
                                                <div className={styles.descFooter}>
                                                    {
                                                        data.style.show.includes('goodsPrice') &&
                                                        <span className={styles.priceX}>
                                                            <span className={styles.smallUnit}>¥</span>
                                                            <span>{item.goods_price_min}</span>
                                                        </span>
                                                    }
                                                    {
                                                        data.style.show.includes('linePrice') && item.line_price_min > 0 &&
                                                        <span className={styles.priceY}>
                                                            <span>¥{item.line_price_min}</span>
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    data.style.column !== 1 &&
                                    <>
                                        <div className={styles.goodsImage}>
                                            <img src={item.goods_image} />
                                        </div>
                                        <div className={styles.detail}>
                                            {
                                                data.style.show.includes('goodsName') && 
                                                <p className={`${styles.goodsName} ${styles.twolistHide}`}>{item.goods_name}</p>
                                            }
                                            <p className={styles.detailPrice}>
                                                {
                                                    data.style.show.includes('goodsPrice') &&
                                                    <span className={styles.goodsPrice}>
                                                            <span className={styles.smallUnit}>¥</span>
                                                            <span>{item.goods_price_min}</span>
                                                    </span>
                                                }
                                                {
                                                    data.style.show.includes('linePrice') && item.line_price_min > 0 &&
                                                    <span className={styles.linePrice}>
                                                            <span className={styles.smallUnit}>¥</span>
                                                            <span>{item.line_price_min}</span>
                                                    </span>
                                                }
                                            </p>
                                        </div>
                                    </>
                                }
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}