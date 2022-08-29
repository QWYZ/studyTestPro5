import { debounce, onPreview } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Divider, Form, Input, InputNumber, message, Radio, Row, Select, Tabs, TreeSelect, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { history, useRequest } from 'umi';
import styles from './styles.less';
import SelectImage from '@/components/SelectImage';
import { InputUEditor } from '@/components/UEditor';
import MultiSpec from '../components/MultiSpec';
import { verifyMultiSpecForm } from './utils'

const testData = [
    {
        id: '1',
        parentIds: null,
        name: '系统管理',
        type: 1,
        icon: 'setting',
        routeUrl: '/system',
        authorityKeyword: 'system',
        sortNo: 1,
        children: [
            {
                id: '11',
                parentIds: ['1'],
                name: '菜单权限',
                type: 1,
                routeUrl: '/system/menu',
                authorityKeyword: 'system-menu',
                sortNo: 1,
            },
        ],
    },
];

const CreateProduct = () => {

    const [activeKey, setActiveKey] = useState('1')
    const [spinning, setSpinning] = useState(false)
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [form4] = Form.useForm();
    const [specType, setSpecType] = useState(1) // 规格类型,单规格1/多规格2
    const beforeUpload = (file) => {
        // console.log('文件类型校验--', file)
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传JPG/PNG文件!');
        }
        return isJpgOrPng;
    }

    const [multiSpecData, setMultiSpecData] = useState(); //多规格

    const handleOk = async () => {
        let data1, data2, data3, data4
        // 显示错误提示(防抖处理)
        const showErrorMsg = debounce(message.warning, 20)
        try {
            data1 = await form1.validateFields();
            data2 = await form2.validateFields();
            data3 = await form3.validateFields();
            data4 = await form4.validateFields();

            console.log(data1, data2, data3, data4)
            //创建商品接口
            //返回列表页面
            history.goBack()
        } catch (error) {
            error?.errorFields &&
                error.errorFields.map((item, index) => {
                    showErrorMsg(item.errors[0])
                })
        }

    }


    const baseInfoForm = () => {
        return (
            <Form
                form={form1}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 10 }}
                initialValues={{
                    productState: 2,
                    sortNum: 1,
                    productCategory: '甲类'
                }}
            >
                <Form.Item
                    label={'商品名称'}
                    name={'productName'}
                    rules={[
                        { required: true }
                    ]}
                >
                    <Input placeholder={'请输入商品名称'} />
                </Form.Item>
                <Form.Item
                    label={'商品分类'}
                    name={'productCategory'}
                    rules={[
                        { required: true }
                    ]}
                >
                    <TreeSelect treeData={[]} placeholder={'请选择商品分类'}></TreeSelect>
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 12 }}
                    label={'商品图片'}
                    name={'productImgs'}
                    rules={[
                        { required: true }
                    ]}
                    extra={'建议尺寸：750*750像素, 最多上传10张, 第1张将作为商品首图'}
                // getValueFromEvent={getValueFromEvent}
                >
                    <SelectImage multiple maxNum={10} />
                </Form.Item>
                <Form.Item
                    label="商品状态"
                    name={'productState'}
                    rules={[
                        { required: true },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={1}>上架</Radio>
                        <Radio value={2}>下架</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={'sortNum'}
                    label="商品排序"
                    rules={[
                        { required: true },
                    ]}
                    extra={<span>数字越小越靠前</span>}
                >
                    <InputNumber min={1} precision={0} />
                </Form.Item>
            </Form>
        )
    }


    const specificationForm = () => {

        return (
            <Form
                form={form2}
                initialValues={{
                    specType: 1,
                    price: 1.00,
                    inventory: 100
                }}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 8 }}
            >
                <Form.Item
                    label="规格类型"
                    name={'specType'}
                    rules={[
                        { required: true },
                    ]}
                >
                    <Radio.Group onChange={(e) => { setSpecType(e.target.value) }}>
                        <Radio value={1}>单规格</Radio>
                        <Radio value={2}>多规格</Radio>
                    </Radio.Group>
                </Form.Item>
                {
                    specType == 1 &&
                    <>
                        <Form.Item
                            name={'price'}
                            label="商品价格"
                            rules={[
                                { required: true },
                            ]}
                            extra={<span>商品的实际购买金额，最低0.01</span>}
                        >
                            <InputNumber min={0.01} precision={2} addonAfter={'元'} />
                        </Form.Item>
                        <Form.Item
                            name={'linePrice'}
                            label="划线价格"
                            extra={<span>划线价仅用于商品页展示</span>}
                        >
                            <InputNumber min={0.01} precision={2} addonAfter={'元'} />
                        </Form.Item>
                        <Form.Item
                            name={'inventory'}
                            label="当前库存"
                            rules={[
                                { required: true },
                            ]}
                            extra={<span>商品的实际库存数量，为0时用户无法下单</span>}
                        >
                            <InputNumber min={0} precision={0} />
                        </Form.Item>
                    </>
                }
                {
                    specType == 2 &&
                    <MultiSpec multiSpecData={multiSpecData} multiSpecOnChange={(e) => { setMultiSpecData(e); console.log('multiSpecOnChange', e) }} />
                }
            </Form>
        )
    }


    const otherSettingForm = () => {
        return (
            <Form
                form={form3}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 10 }}
                initialValues={{
                    init_sales: 0
                }}
            >
                {/* <Divider orientation="left"><span>模板选择</span></Divider> */}
                <Form.Item
                    label="初始销量"
                    name={'init_sales'}
                    rules={[
                        { required: true }
                    ]}
                    extra={'用户端展示的销量 = 初始销量 + 实际销量'}
                >
                    <InputNumber precision={0} min={0} />
                </Form.Item>
                {/* <Divider orientation="left"><span>菜单权限</span></Divider> */}
                <Form.Item
                    label="菜单权限"
                    name={'menuIds'}
                    rules={[
                        { required: true }
                    ]}
                >
                    <TreeSelect
                        treeData={testData}
                        fieldNames={{ label: 'name', value: 'id' }}
                        placeholder={'请选择菜单权限'}
                        multiple
                        treeCheckable
                    ></TreeSelect>
                </Form.Item>
            </Form>
        )
    }

    const detailForm = () => {

        return (
            <Form
                form={form4}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item
                    name={'description'}
                    wrapperCol={{ span: 8 }}
                    label={'商品详情'}
                >
                    <InputUEditor />
                </Form.Item>
            </Form>
        )
    }

    /**提交前校验表单 */
    const submitBeforeValid = () => {
        return new Promise(async (resolve, reject) => {
            let submitValues = {};
            await form1.validateFields().then(values => {
                submitValues["form1"] = values;
            }).catch(err => {
                console.log('err: form1', err);
                reject('1');
            });
            await form2.validateFields().then(values => {
                submitValues["form2"] = values;
            }).catch(err => {
                console.log('err: form2', err);
                reject('2')
            });
            if (specType == 2) {
                await verifyMultiSpecForm(multiSpecData).then(values => {
                    submitValues["multiSpecData"] = values;
                }).catch(err => {
                    message.error(err)
                    reject('2')
                });
            }
            await form3.validateFields().then(values => {
                submitValues["form3"] = values;
            }).catch(err => {
                console.log('err: form3', err);
                reject('3')
            });
            await form4.validateFields().then(values => {
                submitValues["form4"] = values;
            }).catch(err => {
                console.log('err: form4', err);
                reject('4')
            });
            resolve(submitValues);
        })
    }

    /**提交 */
    const submit = () => {
        submitBeforeValid().then(values => {
            console.log('submit', values);
        }).catch(index => {
            console.log('submit:catch', index);
            setActiveKey(index)
        })
    }

    return (
        <PageContainer
            title={<span>创建商品</span>}
            breadcrumb={false}
            loading={spinning}
            onBack={() => history.goBack()}
            className={styles.createProductPage}
        >
            <Card>
                <Tabs onChange={(activeKey) => { setActiveKey(activeKey) }} activeKey={activeKey}>
                    <Tabs.TabPane forceRender={true} tab="基本信息" key={'1'}>
                        <br />
                        {baseInfoForm()}
                    </Tabs.TabPane>
                    <Tabs.TabPane forceRender={true} tab="规格/库存" key={'2'}>
                        <br />
                        {specificationForm()}
                    </Tabs.TabPane>

                    <Tabs.TabPane forceRender={true} tab="商品详情" key={'4'}>
                        <br />
                        {detailForm()}
                    </Tabs.TabPane>
                    <Tabs.TabPane forceRender={true} tab="更多配置" key={'3'}>
                        <br />
                        {otherSettingForm()}
                    </Tabs.TabPane>
                </Tabs>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Button type={'primary'} onClick={() => { submit() }}>保存</Button>
                    </Col>
                </Row>
            </Card>
        </PageContainer>
    );
}

export default CreateProduct;