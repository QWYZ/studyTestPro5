import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

export default class AutoHide extends PureComponent {
  static propTypes = {
    title: PropTypes.any,
    style: PropTypes.any,
  };


  render() {
    const { title, style, className, len } = this.props;
    const Styles = {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-block'
    }

    return (
      <Tooltip placement="topLeft" title={title} style={{ lineHeight: 17 }}>
        <span style={{...Styles,...style}} className={className}>
        {
          len && title && title.length>len ?
          `${item?.id.substring(0, len) + '...'}`
          :
          title
        }
        </span>
      </Tooltip>
    );
  }
}