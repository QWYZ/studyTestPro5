import { Breadcrumb } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import styles from './index.less';
const BreadcrumbComponent = (props) => {
    // console.log(props);
    const { data } = props;
    const { location, breadcrumb } = data

    // console.log(breadcrumb);
    const getPaths = (pathname) => {
        let pathKeys = pathname.split("/");
        pathKeys.splice(0, 1)
        let b = pathKeys.map((item, i) => {
            return `/${item}`
        })
        let c = []
        if (b.length === 1) {
            c = [b[0]];
        } if (b.length === 2) {
            c = [b[0], b[0] + b[1]];
        }
        return c
    }
    const path1 = getPaths(location.pathname)[0]
    const path2 = getPaths(location.pathname)[1]

    return (
        <span className={styles.breadcrumb} style={{ marginLeft: '30px', color: '#333' }}>
            <Link className={styles.path1} to={'/home'}>
                <span style={{ fontWeight: 'bold', margin: '0 5px', fontSize: 16 }}>{breadcrumb['/home']?.icon}</span>
                {breadcrumb['/home']?.name}
            </Link>
            {path2 && <span style={{ margin: '0 5px' }}>/</span>}
            {path2 && <Link className={styles.path1} to={path1}>
                {breadcrumb[path1]?.name}
            </Link>}
            {path2 && <span style={{ margin: '0 5px' }}>/</span>}
            {path2 && <span className={styles.path2}>{breadcrumb[path2]?.name}</span>}
        </span>
    );
}

export default BreadcrumbComponent;