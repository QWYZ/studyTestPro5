import React,{useState} from "react";
import {Col, Form, Input, message, Modal, Row, Radio, Space, Button } from 'antd';
import {connect} from "dva";
// import { SettingOutlined,TableOutlined,HomeOutlined } from "@ant-design/icons";
import { iconData } from '@/utils/iconData';

export const ChoiceIconModal = (props) => {
    if(!props.modalVisible) return null//增加此行判断避免浪费渲染资源
    
    const { editModalType, modalVisible, onSuccess, onCancel, data } = props;
    // console.log('data---ss-s--',data);
    const [form] = Form.useForm();
    const [formVals, setFormVals] = useState({
      icon:data?.icon || null
    });
  
    //点击确认按钮，先做表单校验
    const handleOk = async () => {
      
      form.validateFields().then((values) => {
        edit(values);
      }).catch((info) => {

      });
    };
  
    
    const edit = async (values) => {
      onSuccess(values.icon,editModalType);
    };

    const options=iconData;
    
    return (
      <Modal
        destroyOnClose
        title={'选择图标'}
        visible={editModalType !== ''}
        okText="确认"
        cancelText="取消"
        onCancel={() => onCancel()}
        onOk={handleOk}
        width={'40vw'}
        // confirmLoading={editModalType === 'update'? updateRequestLoading:addRequestLoading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            icon:formVals?.icon || null
          }}
        >
         <Form.Item 
            name={'icon'}
            // getValueFromEvent={(e)=>{console.log('getValueFromEvent',e); return e.target.value} }
            rules={[
                { required:true, message:'请选择图标' },
            ]}
        >
             <Radio.Group>
              <Space direction={'horizontal'} wrap>
              {
                Object.keys(options).map((item,index)=>
                <Radio.Button key={index}  value={item}>{options[item]}</Radio.Button>
                )
              }
              {/* {
                options.map((item,index)=>
                <Radio.Button key={index}  value={Object.keys((item))[0]}>{item[Object.keys((item))[0]]}</Radio.Button>
                )
              } */}
              </Space>
             </Radio.Group>
         </Form.Item>

        </Form>
      </Modal>
    );
  }
  
  export default ChoiceIconModal;