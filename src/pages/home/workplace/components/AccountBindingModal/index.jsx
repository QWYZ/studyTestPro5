import { Button, Card, Descriptions, Divider, Form, Image, Modal, Radio } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from 'umi'

const plainOptions = [
    { label: '快速创建小程序', value: 1 },
    { label: '复用公众号主体快速注册小程序', value: 2 },
    { label: '绑定已有的小程序', value: 3 },

]

/**小程序账号绑定 */
const AccountBindingModal = (props) => {
    if (!props.modalVisible) return null//增加此行判断避免浪费渲染资源

    const { editModalType, modalVisible, onSuccess, onCancel, modalData } = props;
    // console.log(modalData);
    const [form] = Form.useForm();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [chooseType, setChooseType] = useState(null);
    /**切换适用场景 */
    const onChange = (e) => {
        console.log(e);
        setChooseType(e.target.value)
    }

    const handleOk = () => {

    }

    const infoRender = () => {
        return (
            <>
                <Descriptions
                    column={2}
                    bordered
                >
                    <Descriptions.Item span={3} label="企业名称">{modalData?.name}</Descriptions.Item>
                    <Descriptions.Item label="企业代码">{modalData?.code}</Descriptions.Item>
                    <Descriptions.Item label="企业代码类型">
                        {modalData?.code_type === 1 ? '统一社会信用代码' : modalData?.code_type === 2 ? '组织机构代码' : '营业执照注册号'}
                    </Descriptions.Item>
                    <Descriptions.Item label="企业法人">{modalData?.legal_persona_name}</Descriptions.Item>
                    <Descriptions.Item label="法人微信">{modalData?.legal_persona_wechat}</Descriptions.Item>
                </Descriptions>
            </>
        )
    }


    return (
        <Modal
            destroyOnClose
            title={<span>{`小程序账号绑定`}</span>}
            visible={editModalType.type !== ''}
            cancelText="取消"
            onCancel={() => onCancel()}
            onOk={handleOk}
            width={'55vw'}
            confirmLoading={confirmLoading}
            footer={null}
        >
            <Form form={form}>
                <Form.Item
                    name={'blindType'}
                    label={<span style={{ fontWeight: 'bold' }}>请选择您的适用场景</span>}
                    // rules={[
                    //     { required: true },
                    // ]}
                    tooltip={'用户可根据自己的实际情况选择'}
                    extra={
                        <span>
                            <span>1.快速创建小程序，适用于商户没有已认证的公众号但是可以企业法人进行人脸识别完成认证的场景。</span><br />
                            <span>2.复用公众号主体快速注册小程序，适用于商户已有完成认证的公众号的场景。</span><br />
                            <span>2.绑定已有的小程序，适用于商户已有空置的小程序的场景。</span>
                        </span>
                    }
                >
                    <Radio.Group buttonStyle="solid" optionType={'button'} options={plainOptions} onChange={onChange} />
                </Form.Item>

                {
                    chooseType === 3 &&
                    <Form.Item
                        label={<span style={{ fontWeight: 'bold' }}>小程序授权</span>}
                    >
                        <Button type='primary'>去授权</Button>
                    </Form.Item>
                }
                {
                    chooseType === 2 &&
                    <Form.Item
                        label={<span style={{ fontWeight: 'bold' }}>公众号授权</span>}
                    >
                        <Button
                            type='primary'
                            onClick={() => {
                                window.location.href = "https://mp.weixin.qq.com/cgi-bin/fastregisterauth?appid=wx28f759479ea1e09%200&component_appid=wx666666666666123&copy_wx_verify=1&redirect_uri=%20https%3a%2f%2fwww.qq.com%2fauth%2fcallback%3ffrom%3dmp";
                            }}
                        >去授权</Button>
                    </Form.Item>
                }
                {
                    chooseType === 1 &&
                    <Form.Item
                        label={<span style={{ fontWeight: 'bold' }}>企业信息</span>}
                    >
                        <Card
                            bodyStyle={{ padding: 20 }}
                        >
                            {infoRender()}
                        </Card>
                    </Form.Item>


                }

                {
                    chooseType === 1 &&
                    <Form.Item
                        label={<span style={{ fontWeight: 'bold' }}>快速创建小程序</span>}
                        extra={
                            '点击开始后平台将向法人微信下发模板消息，法人需在24 小时内点击消息，进行身份证信息与人脸识别信息收集'
                        }
                    >
                        <Button type='primary'>开始创建</Button>
                    </Form.Item>
                }


            </Form>

        </Modal>
    );
}

export default AccountBindingModal;