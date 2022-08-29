import React, { useState, useEffect } from 'react';
import { useRequest } from 'umi';
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Radio,
  Space,
  Button,
  Drawer,
  Select,
  Spin,
  InputNumber,
  Switch,
  Cascader,
  Tag,
  TreeSelect,
} from 'antd';
import { iconData } from '@/utils/iconData';
import ChoiceIconModal from './iconClassifyModal';
import { CloseCircleFilled, SettingOutlined, TableOutlined } from '@ant-design/icons';
import { editMenu, addMenu } from '@/services/system/menu';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { delay } from 'lodash-es';
import { NoEmojiRegexp, keyPerms } from '@/utils/regVerify';
import { backTagRender } from '../../apiList/share'
const testData = [
  {
    id: '1',
    prarentIds: null,
    name: '系统管理',
    type: 1,
    routeUrl: '/system',
    authorityKeyword: 'system',
    children: [
      {
        id: '11',
        prarentIds: ['1'],
        name: '菜单权限',
        type: 1,
        routeUrl: '/system/menu',
        authorityKeyword: 'system-menu',
      },
    ],
  },
];

const testApiData = [
  {
    id: 'A',
    name: '公共A',
    children: [
      {
        id: 1,
        name: '用户登录接口',
        requestType: 'POST',
        apiUrl: '/login/loginIn',
      },
      {
        id: 2,
        name: '退出登录接口',
        requestType: 'POST',
        apiUrl: '/login/loginOut',
      },
    ],
  },
  {
    id: 'A1',
    name: '菜单管理',
    children: [
      {
        id: 3,
        name: '菜单列表接口',
        requestType: 'GET',
        apiUrl: '/menu/list',
      },
      {
        id: 4,
        name: '新增菜单接口',
        requestType: 'POST',
        apiUrl: '/menu/list',
      },
      {
        id: 5,
        name: '删除菜单接口',
        requestType: 'DELETE',
        apiUrl: '/menu/list',
      },
    ],
  },
];

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 16,
};
const labelCol = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 6,
};
/**菜单编辑 */
export const EditMenuDrawer = (props) => {
  if (!props.modalVisible) return null; //增加此行判断避免浪费渲染资源

  const { editModalType, modalVisible, onSuccess, onCancel, modalData } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [formVals, setFormVals] = useState({
    id: modalData?.id,
    name: modalData?.name,
    type: modalData?.type,
    icon: modalData?.icon,
    parentIds: modalData?.parentIds || null,
    routeUrl: modalData?.routeUrl,
    authorityKeyword: modalData?.authorityKeyword,
    sortNo: modalData?.sortNo,
  });

  useEffect(() => {
    setApiList(apiOptions(testApiData))
  }, [])

  const [menuType, setMenuType] = useState(modalData?.type ?? 1);//菜单类型（菜单/接口）

  const [apiList, setApiList] = useState(testApiData);//api接口列表

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        onSuccess(values);
      })
      .catch((info) => { });
  };

  /**重写api下拉选择项 */
  const apiOptions = (list) => {
    for (let i = 0; i < list.length; i++) {
      let children = JSON.parse(JSON.stringify(list))[i].children;
      if (children) {
        list[i].children = children.map((item, i) => {
          return (
            {
              ...item,
              name: (
                <>
                  <div><span style={{ fontSize: 12, color: 'gray', fontWeight: 'bold', marginRight: 6 }}>{item.name}</span>{backTagRender(item.requestType)}</div>
                  <div style={{ fontSize: 12, color: 'gray' }}>接口地址: {item.apiUrl}</div>
                </>
              )
            }

          )
        })
      }

    }
    console.log(list);
    return list
  }

  const formMenuRender = () => {
    const selectOnChange = (e, parentPerms) => {
      for (let i = 0; i < optionBtn.length; i++) {
        if (optionBtn[i].value === e) {
          form.setFieldsValue({
            perms: parentPerms + optionBtn[i].perm,
          });
          break;
        }
      }
    };
    return (
      <Form
        labelAlign={'right'}
        form={form}
        initialValues={{
          type: formVals?.type ?? 1,
          id: formVals?.id,
          name: formVals?.name,
          icon: formVals?.icon,
          parentIds: formVals?.parentIds,
          routeUrl: formVals?.routeUrl,
          authorityKeyword: formVals?.authorityKeyword,
          sortNo: formVals?.sortNo,
        }}
      >
        <Form.Item labelCol={labelCol} wrapperCol={wrapperCol} name={'type'} label="类型">
          <Radio.Group
            onChange={(e) => {
              setMenuType(e.target.value);
            }}
          >
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮(包含功能)</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          name={'name'}
          label={`${menuType == 1 ? '菜单' : '按钮'}名称`}
          rules={[
            { required: true },
            {
              pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
              message: '请输入汉字、数字、英文,不超过20个字',
            },
            { max: 20, message: '请输入汉字、数字、英文,不超过20个字' },
          ]}
        >
          <Input placeholder="请输入名称" allowClear />
        </Form.Item>
        <Form.Item
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          name={'parentIds'}
          label="父级分类"
          extra={'不填时默认为顶级菜单'}
        >
          <Cascader
            getPopupContainer={trigger => trigger.parentElement}
            placeholder="请选择父级分类"
            options={testData}
            changeOnSelect
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Form.Item>

        {menuType === 1 && (
          <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={'routeUrl'}
            label="路由地址"
            extra={'指向页面的路径'}
            rules={[
              // { required: true },
              { pattern: /^[A-Za-z-/]+$/, message: '只能录入英文和"/"' },
            ]}
          >
            <Input placeholder="请输入路由地址" allowClear />
          </Form.Item>
        )}
        <Form.Item
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          name={'apiId'}
          label="API接口"
        >
          {/* <Cascader
              placeholder="请选择接口"
              multiple
              options={apiOptions(testApiData)}
              fieldNames={{ label: 'name', value: 'id' }}
            /> */}
          <TreeSelect
            treeCheckable
            multiple
            placeholder="请选择接口"
            treeData={apiList}
            fieldNames={{ label: 'name', value: 'id' }}
          ></TreeSelect>
        </Form.Item>
        {menuType === 1 && (
          <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={'icon'}
            label="菜单图标"
            extra={'图标仅在一级菜单前显示'}
          >
            <Input
              onFocus={() => {
                delay(() => {
                  _openEditIconModal(), 500;
                });
              }}
              // readOnly
              placeholder="请选择图标"
              allowClear
              addonAfter={
                // <SettingOutlined style={{ color: '#3165D9' }} onClick={() => { _openEditIconModal() }} />
                <TableOutlined
                  style={{ color: '#333' }}
                  onClick={() => {
                    _openEditIconModal();
                  }}
                />
              }
            />
          </Form.Item>
        )}

        <Form.Item
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          name={'authorityKeyword'}
          extra={'用于前端权限校验'}
          label="权限标识"
          rules={[{ pattern: keyPerms, message: '能录入英文字母和"-"' }]}
        >
          <Input placeholder="请输入权限标识" allowClear />
        </Form.Item>

        <Form.Item
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          label="排序"
          name={'sortNo'}
          extra={'数字越小越靠前'}
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="请输入排序" min={1} step={1} precision={0} />
        </Form.Item>
      </Form>
    );
  };


  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalIconData, setModalIconData] = useState(null);

  // 打开图标选择框
  const _openEditIconModal = (type) => {
    setModalVisible2(true);
    setModalIconData({
      icon: form.getFieldValue('icon'),
    });
  };

  // 图标选择成功
  const _editIconSuccess = (value) => {
    form.setFieldsValue({
      icon: value,
    });
    setModalVisible2(false);
    setModalIconData({});
  };


  return (
    <>
      <Drawer
        title={editModalType.type === 'update' ? '修改菜单/权限' : '新增菜单/权限'}
        width={'34vw'}
        placement="right"
        closeIcon={<CloseCircleFilled style={{ fontSize: 20 }} />}
        closable={true}
        onClose={onCancel}
        visible={modalVisible}
        height={'auto'}
        key={'add'}
        bodyStyle={{ border: '1px solid rgba(220, 220, 220, 0.5)', margin: 20 }}
        // maskClosable={false}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button type={'default'} onClick={onCancel}>
              关闭
            </Button>
            <Button
              loading={confirmLoading}
              style={{ marginLeft: '10px' }}
              type={'primary'}
              onClick={handleOk}
            >
              确认
            </Button>
          </div>
        }
        destroyOnClose
      >
        {formMenuRender()}
      </Drawer>
      <ChoiceIconModal
        onSuccess={_editIconSuccess}
        onCancel={() => {
          setModalVisible2(false);
          setModalIconData({});
        }}
        modalVisible={modalVisible2}
        data={modalIconData}
      />
    </>
  );
};

export default EditMenuDrawer;
