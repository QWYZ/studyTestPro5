import {CloseCircleFilled} from "@ant-design/icons";
import {Button, Col, Drawer, Row} from "antd";
import React from "react";
import Modal from "antd/es/modal/Modal";

/**
 * @Description: 封装新增或者编辑的弹出层， 防止需求字段增加需要将modal改为drawer
 * @author yeship
 * @date 2021/9/14 15:16
 */

export const PopupForm = (props) => {

  const { type, title, width = '30vw', onCancel, handleOk, confirmLoading, children } = props;

  const modalPopup = () => {
    return (
      <Modal
        destroyOnClose
        title={title}
        visible={true}
        okText="确认"
        cancelText="取消"
        onCancel={() => onCancel()}
        onOk={handleOk}
        width={width}
        confirmLoading={confirmLoading}
      >
        {children}
      </Modal>
    )
  }

  const drawerPopup = () => {
    return (
      <Drawer
        title={title}
        placement={'right'}
        closable
        onClose={() => onCancel()}
        closeIcon={<CloseCircleFilled onClick={() => onCancel()} style={{fontSize: 20}}/>}
        visible={true}
        key={'right'}
        width={width}
        footer={
          <Row gutter={24}>
            <Col span={8} style={{textAlign: 'left'}}>
            </Col>
            <Col span={16} style={{textAlign: 'right'}}>
              <Button type={'default'} onClick={() => {
                onCancel()
              }}> 取消 </Button>
              <Button style={{marginLeft: 10}} loading={confirmLoading} type={'primary'}
                      onClick={() => handleOk()}> 保存 </Button>
            </Col>
          </Row>
        }
      >
        {children}
      </Drawer>
    )
  }

  return type === 'drawer' ? drawerPopup() : modalPopup()
}

