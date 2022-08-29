import React, { useState, useEffect } from 'react';
import ProCard, { CheckCard } from '@ant-design/pro-card';
import { Form, Button, Avatar, Tag, Row, Col, Modal, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { SwapOutlined } from '@ant-design/icons';
import { backTagRender } from '../share';
const ApiCardList = (props) => {
  const { data, changeModel } = props;
  const [tabKey, setTabKey] = useState('-1');
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    handleAllList();
  }, []);


  const apiCardListRender = (list) => {
    return (
      <Row gutter={10}>
        {list.map((item, i) => {
          return (
            <Col span={6} key={i}>
              <ProCard
                style={{ width: '100%', marginBottom: 10 }}
                key={i}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="onelineHide" style={{ marginRight: 8, fontWeight: 'bold' }}>
                      {item.name}
                    </span>
                    {backTagRender(item.requestType)}
                  </div>
                }
                hoverable
              >
                <Row>
                  <Col className="onelineHide" span={24}>
                    接口地址：{item.apiUrl}
                  </Col>
                </Row>
              </ProCard>
            </Col>
          );
        })}
      </Row>
    );
  };

  const handleTabList = () => {
    let body = [
      {
        tab: '全部',
        key: '-1',
      },
    ];
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      let a = {
        tab: e.name,
        key: e.id,
      };
      body.push(a);
    }
    return body;
  };

  const handleAllList = () => {
    let body = [];
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      let a = data[i].children;
      body = body.concat(a);
    }
    setCurrentList(body);
  };

  return (
    <PageContainer
      breadcrumb={false}
      tabList={handleTabList()}
      onTabChange={(key) => {
        setTabKey(key);
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          if (data[i].id === key) {
            setCurrentList(data[i].children);
          } else if (key === '-1') {
            handleAllList();
          }
        }
      }}
      extra={[
        <Button type="primary" icon={<SwapOutlined />} key="1" onClick={changeModel}>
          切换模式
        </Button>,
      ]}
      tabActiveKey={tabKey}
    >
      {currentList && currentList.length > 0 && apiCardListRender(currentList)}
    </PageContainer>
  );
};

export default ApiCardList;
