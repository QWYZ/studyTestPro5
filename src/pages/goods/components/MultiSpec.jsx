import { CloseCircleFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';
import { getData } from './MultiSpecModel.js';
import SelectImage from '@/components/SelectImage';
import _ from 'lodash';
import { debounce } from '@/utils/utils';



/**商品多规格 */
const MultiSpec = (props) => {
    const labelCol = { span: 3 };// 标签布局属性
    const wrapperCol = { span: 21 };// 输入框布局属性
    const [multiSpecData, setMultiSpecData] = useState(props.multiSpecData || {
        specList: [],// 规格列表
        skuList: [],// SKU列表
    })
    const defaultColumns = [
        {
            title: '预览图',
            dataIndex: 'image',
            align: 'center',
            width: 90,
            render: (text, record, index) => {
                return (<SelectImage value={record.image} onChange={(e) => { inputChangeTable(e, record, index, 'image') }} multiple maxNum={1} width={60} />)
            },
        },
        {
            title: '商品价格',
            dataIndex: 'goods_price',
            align: 'center',
            width: 120,
            render: (text, record, index) => {
                return (<InputNumber value={record.goods_price} onChange={(e) => { inputChangeTable(e, record, index, 'goods_price') }} size={"small"} min={0.01} precision={2} />)
            },
        },
        {
            title: '划线价格',
            align: 'center',
            dataIndex: 'line_price',
            width: 120,
            render: (text, record, index) => {
                return (<InputNumber value={record.line_price} onChange={(e) => { inputChangeTable(e, record, index, 'line_price') }} size={"small"} min={0} precision={2} />)
            },
        },
        {
            title: '库存数量',
            align: 'center',
            dataIndex: 'stock_num',
            width: 120,
            render: (text, record, index) => {
                return (<InputNumber value={record.stock_num} onChange={(e) => { inputChangeTable(e, record, index, 'stock_num') }} size={"small"} min={0} precision={0} />)
            },
        }
    ];
    const [columns, setColumns] = useState(multiSpecData.skuColumns || defaultColumns)

    useEffect(() => {
        props.multiSpecOnChange(multiSpecData);
    }, [multiSpecData])

    useEffect(() => {
        getRefreshData()
    }, [])



    /**获取处理规格及SKU信息(展示)*/
    const getRefreshData = () => {
        let data = getData(multiSpecData, defaultColumns);
        // console.log(data);
        let cloneMultiSpecData = _.cloneDeep(data);
        setMultiSpecData(cloneMultiSpecData)
        setColumns(cloneMultiSpecData.skuColumns)
    }

    /**
     * 使用防抖节流方式刷新sku列表
     */
    const onUpdate = (isDebounce = true) => {
        getRefreshData()
        // if (isDebounce) {
        //     debounce(getRefreshData, 200)()
        // } else {
        //     getRefreshData()
        // }
    }


    /**新增规格组 */
    const handleAddSpecGroup = () => {
        let specList = multiSpecData.specList
        specList.push({
            key: specList.length || 0,
            spec_name: '',
            valueList: []
        });
        let cloneMultiSpecData = _.cloneDeep(multiSpecData);
        // 默认规格值
        const groupIndex = specList.length - 1
        handleAddSpecValue(groupIndex)
    }
    /**新增规格值 */
    const handleAddSpecValue = (index) => {
        const specGroupItem = multiSpecData.specList[index];
        const specValueList = specGroupItem.valueList;
        specValueList.push({
            key: specValueList.length || 0,
            groupKey: specGroupItem.key,
            spec_value: '',
        });
        let cloneMultiSpecData = _.cloneDeep(multiSpecData);
        setMultiSpecData(cloneMultiSpecData)
    }

    // 删除规格组
    const handleDeleteSpecGroup = (groupIndex) => {
        multiSpecData.specList.splice(groupIndex, 1);
        let cloneMultiSpecData = _.cloneDeep(multiSpecData);
        setMultiSpecData(cloneMultiSpecData)
        onUpdate(true)
    }

    // 删除规格值
    const handleDeleteSpecValue = (groupIndex, valueIndex) => {
        multiSpecData.specList[groupIndex].valueList.splice(valueIndex, 1);
        let cloneMultiSpecData = _.cloneDeep(multiSpecData);
        setMultiSpecData(cloneMultiSpecData)
        onUpdate(true)
    }

    /**编辑规格组 */
    const inputChangeGroup = (e, index) => {
        multiSpecData.specList[index].spec_name = e.target.value;
        let cloneMultiSpecData = _.cloneDeep(multiSpecData);
        setMultiSpecData(cloneMultiSpecData)
        onUpdate(true)

    }

    /**编辑规格值 */
    const inputChangeValue = (e, groupIndex, valueIndex) => {
        multiSpecData.specList[groupIndex].valueList[valueIndex].spec_value = e.target.value;
        let cloneMultiSpecData = _.cloneDeep(multiSpecData);
        setMultiSpecData(cloneMultiSpecData)
        onUpdate(true)
    }

    /**编辑sku */
    const inputChangeTable = (e, item, index, dataIndex) => {
        // console.log(e);
        item[dataIndex] = e
        multiSpecData.skuList[index] = item;
        let cloneMultiSpecData = _.cloneDeep(multiSpecData);
        setMultiSpecData(cloneMultiSpecData)
        onUpdate(true)
    }

    return (
        <div id='multiSpec'>
            <Form.Item label="商品规格" wrapperCol={wrapperCol}>
                <div className='form-item-help'>
                    <small>最多添加3个商品规格组，生成的SKU数量不能超出50个</small>
                </div>
                {
                    multiSpecData.specList &&
                    multiSpecData.specList.map((item_group, index_group) => (
                        <div className="spec-group" key={index_group}>
                            <div className="spec-group-item clearfix">
                                <Input className='group-item-input' value={item_group.spec_name} onChange={(e) => { inputChangeGroup(e, index_group) }} placeholder="请输入规格名称" />
                                <a
                                    className="group-item-delete"
                                    onClick={() => { handleDeleteSpecGroup(index_group) }}
                                >删除规格组</a>
                            </div>
                            <div className="spec-value clearfix">
                                {item_group.valueList &&
                                    item_group.valueList.map((item_value, index_value) => (
                                        <div className="spec-value-item" key={`value_${index_value}`}>
                                            <Input className='value-item-input' placeholder="请输入规格值" value={item_value.spec_value} onChange={(e) => { inputChangeValue(e, index_group, index_value) }} />
                                            <CloseCircleFilled className='icon-close' onClick={() => { handleDeleteSpecValue(index_group, index_value) }} />
                                        </div>
                                    ))
                                }
                                <div className="spec-value-add">
                                    <a
                                        className="group-item-delete"
                                        onClick={() => { handleAddSpecValue(index_group) }}
                                    >新增规格值</a>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    multiSpecData.specList.length < 3 &&
                    <Button
                        className="spec-group-add-btn"
                        icon={<PlusOutlined />}
                        onClick={handleAddSpecGroup}
                    >添加规格组</Button>
                }

            </Form.Item>
            {multiSpecData.skuList.length > 0 &&
                <Form.Item label="SKU列表" wrapperCol={wrapperCol}>
                    <Table className="sku-list" columns={columns} dataSource={multiSpecData.skuList || []} scroll={{ x: true }} pagination={false} bordered>

                    </Table>
                </Form.Item>
            }

        </div>
    );
}

export default MultiSpec;