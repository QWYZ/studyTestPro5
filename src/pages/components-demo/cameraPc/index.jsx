import CameraPC from '@/components/CameraPC'
import { Alert, Col, Image, Row } from 'antd'
import React, { useState } from 'react'
import { Button, Modal, Space } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
const CameraPcDemo = () => {

    const [imgSrc, setImgSrc] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hideModal = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <Alert message={"PC端拍照"} showIcon closable />
            <Row gutter={10}>
                <Col span={18}>
                    <CameraPC pictureSize={{ width: '900px', height: '500px' }} cameraStyle={{ height: 500 }} comeBackImg={(imgsrc) => { setImgSrc(imgsrc) }} />
                </Col>
                <Col span={6}>
                    <div style={{ width:'100%', textAlign:'center', fontSize:16, fontWeight:'bold', padding:5}}>图片预览</div>
                    {imgSrc && <Image style={{ width: '100%' }} src={imgSrc} />}
                </Col>
            </Row>
            <Alert message={"PC端拍照Modal"} showIcon closable />
            <Row>
                <Col>
                    <Button onClick={() => { setIsModalOpen(true) }}><CameraOutlined /></Button>
                </Col>
            </Row>
            <Modal
                title="拍照"
                width={'80vw'}
                visible={isModalOpen}
                onOk={hideModal}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
            >
                <Row gutter={10}>
                    <Col span={18}>
                        <CameraPC 
                            pictureSize={{ width: '900px', height: '500px' }} 
                            cameraStyle={{ height: 500 }} 
                            comeBackImg={(imgsrc) => { setImgSrc(imgsrc) }} 
                            
                        />
                    </Col>
                    <Col span={6} style={{background:'#d9d9d9'}}>
                        
                        {imgSrc && <Image style={{ width: '100%' }} src={imgSrc} />}
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default CameraPcDemo