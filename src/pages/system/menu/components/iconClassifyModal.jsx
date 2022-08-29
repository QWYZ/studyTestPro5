import React, { useState } from "react";
import { Col, Form, Input, message, Modal, Row, Radio, Space, Button, Tooltip } from 'antd';
import { connect } from "dva";
import { iconData, directionIcons, suggestionIcons, editIcons, dataIcons, webIcons } from '@/utils/iconData';
import { Tabs } from 'antd';

export const ChoiceIconModal = (props) => {
  if (!props.modalVisible) return null//增加此行判断避免浪费渲染资源

  const { modalVisible, onSuccess, onCancel, data } = props;
  // console.log('data---ss-s--',data);
  const [form] = Form.useForm();
  const [formVals, setFormVals] = useState({
    icon: data?.icon || null
  });

  //点击确认按钮，先做表单校验
  const handleOk = async () => {

    form.validateFields().then((values) => {
      edit(values);
    }).catch((info) => {

    });
  };


  const edit = async (values) => {
    onSuccess(values.icon);
  };

  const [options, setOption] = useState(webIcons);

  const onChangeTabs = (activeKey) => {
    switch (activeKey) {
      case '1':
        setOption(webIcons)
        break;
      case '2':
        setOption(suggestionIcons)
        break;
      case '3':
        setOption(editIcons)
        break;
      case '4':
        setOption(directionIcons)
        break;
      case '5':
        setOption(dataIcons)
        break;
      default:
        setOption(webIcons)
        break;
    }
  }

  const btnStyle = { fontSize: 20, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }

  return (
    <Modal
      destroyOnClose
      closable={false}
      title={false}//{'选择图标'}
      visible={modalVisible}
      okText="确认"
      cancelText="取消"
      onCancel={() => onCancel()}
      onOk={handleOk}
      width={'50vw'}
    >
      <Tabs defaultActiveKey="1" onChange={onChangeTabs}>
        <Tabs.TabPane tab="网站通用图标" key="1" > </Tabs.TabPane>
        <Tabs.TabPane tab="指示性图标" key="2" > </Tabs.TabPane>
        <Tabs.TabPane tab="编辑类图标" key="3" > </Tabs.TabPane>
        <Tabs.TabPane tab="方向性图标" key="4" > </Tabs.TabPane>
        <Tabs.TabPane tab="数据类图标" key="5" > </Tabs.TabPane>
      </Tabs>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          icon: formVals?.icon || null
        }}
      >
        <Form.Item
          name={'icon'}
          // getValueFromEvent={(e)=>{console.log('getValueFromEvent',e); return e.target.value} }
          rules={[
            { required: true, message: '请选择图标' },
          ]}
        >
          <Radio.Group>
            <Space direction={'horizontal'} wrap>
              {
                //配合tab栏使用
                options.map((item, index) =>
                  iconData[item] && <Radio.Button key={index} value={item} style={btnStyle}><Tooltip title={item} placement="bottom">{iconData[item]} </Tooltip></Radio.Button>
                )
              }
            </Space>
          </Radio.Group>
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default ChoiceIconModal;