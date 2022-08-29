import React, { useState } from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { Form, Button, Avatar, Tag, Row, Col, Modal, Tabs } from 'antd';
import { backTagRender } from '../share';
const ApiCheckModal = (props) => {
  const { modalVisible, onSuccess, onCancel, modalData } = props;
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        onSuccess(values);
      })
      .catch((info) => { });
  };
  const [apiList, setApiList] = useState(modalData);

  const apiCardListRender = (list) => {
    return (
      <CheckCard.Group style={{ width: '100%', padding: 10 }} multiple size={'default'}>
        <Row>
          {list.map((item, i) => {
            return (
              <Col span={8} key={i}>
                <CheckCard
                  key={i}
                  style={{ backgroundColor: '#F0F2F5' }}
                  title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="onelineHide" style={{ marginRight: 8, fontWeight: 'bold' }}>
                        {item.name}
                      </span>
                      {backTagRender(item.requestType)}
                    </div>
                  }
                  description={
                    <Row>
                      <Col className="onelineHide" span={24}>
                        接口地址：{item.apiUrl}
                      </Col>
                    </Row>
                  }
                  value={{
                    name: item.name,
                    requestType: item.requestType,
                    apiUrl: item.apiUrl,
                  }}
                />
              </Col>
            );
          })}
        </Row>
      </CheckCard.Group>
    );
  };

  const tabsClassifyRender = (list) => {
    return (
      <div>
        <Form form={form} layout="vertical">
          <Form.Item label="API列表">
            <Tabs>
              {list.map((item, i) => {
                return (
                  <Tabs.TabPane tab={item.name} key={item.name}>
                    <Form.Item name={`${item.id}`}>{apiCardListRender(item.children)}</Form.Item>
                  </Tabs.TabPane>
                );
              })}
            </Tabs>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <Modal visible={modalVisible ?? false} width={'70vw'} onOk={handleSubmit} onCancel={onCancel}>
      {tabsClassifyRender(apiList)}
    </Modal>
  );
};
export default ApiCheckModal;
