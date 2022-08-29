import { Decoration10, Decoration6, Decoration8, Loading } from '@jiaminghi/data-view-react';
import React, { useState, useEffect, memo } from 'react';
import moment from 'moment';
import './style.less';

const TopPage = (props) => {

    useEffect(() => {
        setTimingFn()
    }, [])

    const { title = '大数据可视化平台' } = props;

    const [timeStr, setTimeStr] = useState('');

    const weekday = [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
    ]

    const setTimingFn = () => {
        const timing = setInterval(() => {
            let dateYear = moment().format('YYYY-MM-DD');
            let dateDay = moment().format('HH: mm: ss');
            let dateWeek = weekday[new Date().getDay()];
            setTimeStr(`${dateYear} | ${dateDay} ${dateWeek}`);
        }, 1000);
    }

    return (
        <div>
            <div className='topBox'>
                <Decoration10 className='top_decoration10' />
                <div className='title-box'>
                    <Decoration8
                        className='top_decoration8'
                        color={['#568aea', '#000000']}
                    />
                    <div className='title'>
                        <span className='title-text'>{title}</span>
                        <Decoration6
                            className='title-bototm top_decoration6'
                            reverse={true}
                            color={['#50e3c2', '#67a1e5']}
                        />
                    </div>

                    <Decoration8
                        reverse={true}
                        className='top_decoration8'
                        color={['#568aea', '#000000']}
                    />
                </div>
                <Decoration10 className='top_decoration10 top_decoration10_reverse' />
                <div className='timeBox'>
                    <h3>{timeStr}</h3>
                </div>

            </div>
        </div>

    );
}

export default TopPage;