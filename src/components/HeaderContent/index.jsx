import React from 'react';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import BreadcrumbComponent from '../Breadcrumb';
// eslint-disable-next-line @typescript-eslint/no-redeclare
const HeaderContent = (props) => {
  const [collapsed, setCollapsed] = useMergedState(props.collapse ?? false, {
    value: props.collapse,
    onChange: props.onCollapse,
  });

  return (
    <>
      <span
        onClick={() => setCollapsed(!collapsed)}
        style={{
          cursor: 'pointer',
          fontSize: '16px',
          width: '15px'
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      <span style={{ width: '30px' }}><BreadcrumbComponent data={props.data} /></span>
    </>
  );
};

export default HeaderContent;

