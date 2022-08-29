import { CheckOutlined, CloudUploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, ConfigProvider, Dropdown, Empty, Input, Menu, message, Modal, Pagination, Popconfirm, Row, Spin, Tree, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useRequest } from 'umi';
import styles from './styles.less';
import './styles.less'
import { uploadImage } from '@/services/upload/upload';
import { debounce } from '@/utils/utils';
import EditGroup from './EditGroup'

const testData = {
    "total": 225,
    "per_page": 15,
    "current_page": 1,
    "last_page": 15,
    "data": [
        {
            "file_id": 10266,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "白.jpg",
            "file_path": "10001/20210313/9d3947cc8b561706d1f0033e14a2048d.jpg",
            "file_size": 82343,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/10001/20210313/9d3947cc8b561706d1f0033e14a2048d.jpg",
            "external_url": "http://static.yoshop.xany6.com/10001/20210313/9d3947cc8b561706d1f0033e14a2048d.jpg"
        },
        {
            "file_id": 10265,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "紫.jpg",
            "file_path": "10001/20210313/0927cb5df622721601dc8c582c245b92.jpg",
            "file_size": 84540,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/10001/20210313/0927cb5df622721601dc8c582c245b92.jpg",
            "external_url": "http://static.yoshop.xany6.com/10001/20210313/0927cb5df622721601dc8c582c245b92.jpg"
        },
        {
            "file_id": 10264,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "2.jpg",
            "file_path": "10001/20210313/074646782cfec5e7d327148c3fe61dce.jpg",
            "file_size": 73521,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/10001/20210313/074646782cfec5e7d327148c3fe61dce.jpg",
            "external_url": "http://static.yoshop.xany6.com/10001/20210313/074646782cfec5e7d327148c3fe61dce.jpg"
        },
        {
            "file_id": 10263,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "1.jpg",
            "file_path": "10001/20210313/b51b4840c24250a67210d59e345e206d.jpg",
            "file_size": 90963,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/10001/20210313/b51b4840c24250a67210d59e345e206d.jpg",
            "external_url": "http://static.yoshop.xany6.com/10001/20210313/b51b4840c24250a67210d59e345e206d.jpg"
        },
        {
            "file_id": 10262,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "3.jpg",
            "file_path": "10001/20210313/2632aff97ad54a67f6c905acb1ee78bb.jpg",
            "file_size": 30417,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/10001/20210313/2632aff97ad54a67f6c905acb1ee78bb.jpg",
            "external_url": "http://static.yoshop.xany6.com/10001/20210313/2632aff97ad54a67f6c905acb1ee78bb.jpg"
        },
        {
            "file_id": 10261,
            "group_id": 0,
            "channel": 10,
            "storage": "local",
            "domain": "",
            "file_type": 10,
            "file_name": "头像.jpg",
            "file_path": "10001/20210312/dedca73a26589d5e93c08b77969bb43c.jpg",
            "file_size": 33006,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "https://pro2.yiovo.com/uploads/10001/20210312/dedca73a26589d5e93c08b77969bb43c.jpg",
            "external_url": "https://pro2.yiovo.com/uploads/10001/20210312/dedca73a26589d5e93c08b77969bb43c.jpg"
        },
        {
            "file_id": 10259,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "20200608163151489591533.jpg",
            "file_path": "20200608163151489591533.jpg",
            "file_size": 39657,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/20200608163151489591533.jpg",
            "external_url": "http://static.yoshop.xany6.com/20200608163151489591533.jpg"
        },
        {
            "file_id": 10256,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "2019071916532778cf84323.jpg",
            "file_path": "2019071916532778cf84323.jpg",
            "file_size": 14463,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/2019071916532778cf84323.jpg",
            "external_url": "http://static.yoshop.xany6.com/2019071916532778cf84323.jpg"
        },
        {
            "file_id": 10253,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "20190610153602a29925572.png",
            "file_path": "20190610153602a29925572.png",
            "file_size": 14612,
            "file_ext": "png",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/20190610153602a29925572.png",
            "external_url": "http://static.yoshop.xany6.com/20190610153602a29925572.png"
        },
        {
            "file_id": 10251,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "201906101521450bca36648.png",
            "file_path": "201906101521450bca36648.png",
            "file_size": 5435,
            "file_ext": "png",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/201906101521450bca36648.png",
            "external_url": "http://static.yoshop.xany6.com/201906101521450bca36648.png"
        },
        {
            "file_id": 10250,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "201906101521451b0d11430.png",
            "file_path": "201906101521451b0d11430.png",
            "file_size": 6857,
            "file_ext": "png",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/201906101521451b0d11430.png",
            "external_url": "http://static.yoshop.xany6.com/201906101521451b0d11430.png"
        },
        {
            "file_id": 10249,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "201906101521459f3b11917.png",
            "file_path": "201906101521459f3b11917.png",
            "file_size": 7341,
            "file_ext": "png",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/201906101521459f3b11917.png",
            "external_url": "http://static.yoshop.xany6.com/201906101521459f3b11917.png"
        },
        {
            "file_id": 10248,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "201906101521454c6306954.png",
            "file_path": "201906101521454c6306954.png",
            "file_size": 7062,
            "file_ext": "png",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/201906101521454c6306954.png",
            "external_url": "http://static.yoshop.xany6.com/201906101521454c6306954.png"
        },
        {
            "file_id": 10243,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "20190610132154e74bb5921.jpg",
            "file_path": "20190610132154e74bb5921.jpg",
            "file_size": 88411,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/20190610132154e74bb5921.jpg",
            "external_url": "http://static.yoshop.xany6.com/20190610132154e74bb5921.jpg"
        },
        {
            "file_id": 10242,
            "group_id": 0,
            "channel": 10,
            "storage": "qiniu",
            "domain": "http://static.yoshop.xany6.com",
            "file_type": 10,
            "file_name": "201906101321536e2883041.jpg",
            "file_path": "201906101321536e2883041.jpg",
            "file_size": 91419,
            "file_ext": "jpg",
            "cover": "",
            "uploader_id": 0,
            "is_recycle": 0,
            "is_delete": 0,
            "store_id": 10001,
            "create_time": "2021-03-01 08:00:00",
            "update_time": "2021-03-01 08:00:00",
            "preview_url": "http://static.yoshop.xany6.com/201906101321536e2883041.jpg",
            "external_url": "http://static.yoshop.xany6.com/201906101321536e2883041.jpg"
        }
    ]
}
const FileModal = (props) => {
    if (!props.modalVisible) return null//增加此行判断避免浪费渲染资源

    const { editModalType, modalVisible, onSuccess, onCancel, multiple, maxNum, selectedNum } = props;

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [spinning, setSpinning] = useState(false);

    const [fileList, setFileList] = useState(testData.data); //文件列表

    const [title, setTitle] = useState('图片库');//模态框标题

    const [selectedIndexs, setSelectedIndexs] = useState([])//选中的文件

    //编辑分组
    const [editGroupType, setEditGroupType] = useState({ type: '' });
    const [groupData, setGroupData] = useState();

    //选择分组
    const [selectedKey, setSelectedKey] = useState(['-1']); //当前选择的节点
    const [expandedKeys, setExpandedKeys] = useState(selectedKey);//当前展开的节点

    /**确认 */
    const handleOk = () => {
        let data = getSelectedItems();
        onSuccess(data)
    }

    /**tree展开操作 */
    const onExpand = (keys, e) => {
        setExpandedKeys(keys)
    }

    /**tree选择操作 */
    const onSelectGroup = (keys, e) => {
        setSelectedKey(keys)
    }

    /**记录选中的文件*/
    const onSelectItem = (index) => {
        // 记录选中状态
        if (!multiple) {
            setSelectedIndexs([index])
            return
        }
        const key = selectedIndexs.indexOf(index)
        const selected = key > -1
        // 验证数量限制
        if (!selected && (selectedIndexs.length + selectedNum) >= maxNum) {
            message.warning(`最多可选${maxNum}个文件`, 1)
            return
        }
        let a = JSON.parse(JSON.stringify(selectedIndexs));
        !selected ? a.push(index) : a.splice(key, 1);
        setSelectedIndexs(a);
    }

    /**获取选中的文件*/
    const getSelectedItems = () => {
        let a = []
        for (const key in selectedIndexs) {
            const index = selectedIndexs[key]
            a.push(fileList[index])
        }
        return a
    }

    /**上传文件之前校验*/
    const beforeUpload = (file, fileList) => {
        // 显示错误提示(防抖处理)
        const showErrorMsg = debounce(message.error, 20)
        // 验证文件上传数量
        if (fileList.length > 5) {
            showErrorMsg('一次上传的文件数量不能超出5个')
            return false
        }
        // 验证文件大小
        const isLt1M = file.size / 1024 / 1024 < 2
        if (!isLt1M) {
            showErrorMsg('文件大小不能超出2MB')
            return false
        }

        return true
    }

    /**
     * 事件: 自定义上传事件
     */
    const onUpload = (info) => {
        setSpinning(true)
        let uploading = [];
        // 记录上传状态
        uploading.push(true)
        // 构建上传参数
        const formData = new FormData()
        formData.append('iFile', info.file)
        // formData.append('groupId', this.queryParam.groupId)
        // 开始上传
        uploadImage(formData).finally(() => {
            uploading.pop()
            if (uploading.length === 0) {
                setSpinning(false)

            }
        })
    }

    /**翻页 */
    const onChangePage = () => {

    }

    /**编辑分组成功 */
    const editGroupSuccess = () => {

    }

    const menu = (data) => (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => {
                    setEditGroupType({ type: 'update' });
                    setGroupData(data)
                }}
            >
                <EditOutlined /> 编辑
            </Menu.Item>
            <Menu.Item key="2">
                <Popconfirm
                    title={`确定删除此【${data?.title}】分组?`}
                    onConfirm={() => { }}
                >
                    <a><DeleteOutlined /> 删除</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    )


    return (
        <Modal
            className={styles.fileBox}
            destroyOnClose
            title={title}
            visible={editModalType.type !== ''}
            okText="确认"
            cancelText="取消"
            onCancel={() => onCancel()}
            onOk={handleOk}
            width={'54vw'}
            centered
            confirmLoading={confirmLoading}
        >
            <Spin spinning={spinning}>
                <div className="library-box clearfix">
                    <div className="file-group">
                        <div className="group-tree">
                            <Tree
                                treeData={[{ position: null, title: '全部', id: '-1', children: [{ position: ['-1'], title: '未知组', id: '-2' }] }]}
                                blockNode={true}
                                showIcon={false}
                                titleRender={(data) => {

                                    return (
                                        data.id !== '-1' ?
                                            <Dropdown
                                                key={data.id}
                                                arrow
                                                overlay={menu(data)}
                                                placement={'bottomRight'}
                                                trigger={['contextMenu']}
                                            >
                                                <Row style={{ padding: 0, margin: 0 }}>
                                                    <Col span={24}><span style={{ width: '100%' }}>{data?.title}</span></Col>
                                                </Row>
                                            </Dropdown>
                                            :
                                            <span key={data.id} style={{ width: '100%' }}>{data?.title}</span>
                                    )
                                }}
                                fieldNames={{ key: 'id' }}
                                autoExpandParent={true}
                                onExpand={onExpand}
                                expandedKeys={expandedKeys}
                                selectedKeys={selectedKey}
                                onSelect={onSelectGroup}
                            >

                            </Tree>
                        </div>
                        <a className="group-add" onClick={() => { setEditGroupType({ type: 'add' }) }}>新增分组</a>
                    </div>
                    <div className="file-list">

                        <div className="top-operate clearfix">
                            <Input.Search
                                className="fl-l"
                                style={{ width: '200px' }}
                                placeholder="搜索文件名称"
                                onSearch={(value) => { console.log(value) }}
                            />
                            <div className="file-upload fl-r">
                                <span className="upload-desc">大小不能超过2M</span>
                                <Upload
                                    name="iFile"
                                    accept="image/*"
                                    beforeUpload={beforeUpload}
                                    customRequest={onUpload}
                                    multiple={true}
                                    showUploadList={false}
                                >
                                    <Button icon={<CloudUploadOutlined />}>上传</Button>
                                </Upload>
                            </div>
                        </div>
                        <div className="file-list-body">
                            {fileList.length < 0 && <Empty />}
                            <ul className='file-list-ul clearfix'>
                                {
                                    fileList.map((item, index) => {

                                        return (
                                            <li
                                                className={`file-item ${selectedIndexs.indexOf(index) == -1 ? null : 'active'}`}
                                                key={index}
                                                onClick={() => { onSelectItem(index) }}
                                            >
                                                <div className="img-cover" style={{ backgroundImage: `url('${item.preview_url}')` }}></div>
                                                <p className="file-name oneline-hide">{item.file_name}</p>
                                                <div className="select-mask">
                                                    <CheckOutlined className="selected-icon" />
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                            <div className="footer-operate clearfix">
                                <div className="fl-l" hidden={selectedIndexs.length == 0}>
                                    <span className="footer-desc">已选择{selectedIndexs.length}项</span>
                                    <ConfigProvider autoInsertSpaceInButton={false}>
                                        <Button.Group>
                                            <Button className="btn-mini" size="small" >删除</Button>
                                            <Button className="btn-mini" size="small" >移动</Button>
                                        </Button.Group>
                                    </ConfigProvider>
                                </div>
                                <Pagination
                                    size={'small'}
                                    hideOnSinglePage
                                    className="fl-r"
                                    current={1}
                                    onChange={onChangePage}
                                    total={80}
                                    pageSizeOptions={[]}
                                    pageSize={15}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Spin >
            <EditGroup
                editModalType={editGroupType}
                onSuccess={editGroupSuccess}
                onCancel={() => {
                    setEditGroupType({ type: '' });
                    setGroupData({});
                }}
                modalVisible={editGroupType.type}
                modalData={groupData}
            />
        </Modal >
    );
}

export default FileModal;