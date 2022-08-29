import styles from './index.less';
import React,{Component} from 'react';
import { Col, Row, Button, Input, message, Form, Tree, Drawer, Select, Radio, Spin, Modal, Divider, Popconfirm, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { createFromIconfontCN, PlusOutlined } from '@ant-design/icons';
import { 
    querySystemMenuTreeList,
    querySystemMenuList,
    querySystemSonMenuList,
    addMenu,
    deleteMenu,
    editMenu,
} from '@/services/system/menu';
import {
    handleTreeData
}from './share/someways';
import {optionBtn} from '@/utils/dictionary';
import ChoiceIconModal from './components/choiceIconModal';
import { iconData } from '@/utils/iconData';
import EditMenuDrawer from './components/EditMenuDrawer';
 // import {connect} from 'dva';
const Icon = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/font_2546793_9mt1zfi2wcn.js'],
});

const actionRef = React.createRef();

class Menu extends Component {
    constructor(props){
        super(props);
        // console.log('Menu',props);
        this.state={
            visibleDrawer:false,
            menuModalData:{},
            editType:null,
            menuType:'-1',
        }
    }

    componentDidMount() {
        // this._httpMemuList();
    }

    /** 获取菜单列表 */
    _httpMemuList = async() =>( 
        querySystemMenuTreeList().then((res)=>{
                if(res.errorType === 10){
                    return {
                        data: res.data || [],
                        success: true
                    }
                }
        })
    )

    _clickFirstMenu = () =>{
        this.setState({
            visibleDrawer: true,
            menuModalData:{
                editType:'add',
                menuType:'-1'
            } 
        })
    }

    _clickSonMenu = (data) =>{
        let menuType = data?.menuType;
        if(menuType === 0){
            this.setState({
                visibleDrawer: true,
                menuModalData:{
                    editType:'add',
                    ...data,
                    parentName:data.name,
                } 
            })
        }
        if(menuType === 1){
            this.setState({
                visibleDrawer: true,
                menuModalData:{
                    editType:'add',
                    ...data,
                    parentName:data.name,
                } 
            })
        }
    }

    _clickUpdateMenu = (data) =>{
        this.setState({
            visibleDrawer: true,
            menuModalData:{
                editType:'update',
                ...data,
            } 
        })
    }

    /**删除菜单 */
    _deleteMenu = (id) =>{
        
        deleteMenu({id:id}).then((res)=>{
            if(res && res.success){
                message.success('删除成功!');
                //刷新列表
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            } 
    
        })
    }

    /**菜单编辑成功回调 */
    _editSuccess = () => {
        this.setState({visibleDrawer: false, menuModalData:{}})
        //刷新当前页面
        if (actionRef.current) {
        actionRef.current.reload();
        }
    }
    
    render(){
        const columns=[
            {
              title: '菜单名称',
              key: 'menu_name',
              dataIndex: 'menu_name',
              align: 'left',
            },
            {
              title: '图标',
              key: 'icon',
              ellipsis:true,
              dataIndex: 'icon',
              hideInSearch: true,
              align: 'left',
            },
            {
                title: '菜单属性',
                dataIndex: 'bool_type',
                hideInSearch: true,
                align: 'left',
                valueEnum: {
                    0: '系统菜单',
                    1: '业务菜单',
                },
                render:(_, data)=>{
                    let menuAttributes = '';
                    if(data.bool_type === 0){ menuAttributes = '系统菜单' }
                    if(data.bool_type === 1 && data.tenantDefaultMenu){
                        menuAttributes = '业务菜单(租户基础)'
                    }
                    if(data.bool_type === 1 && (!data.tenantDefaultMenu)){
                        menuAttributes = '业务菜单'
                    }
                    return(
                        <Tag
                            size={'small'}
                            style={{backgroundColor:data.bool_type? 'yellowgreen' : '#1890ff', borderWidth:0, borderRadius:4, color:'white',cursor:'default'}}
                        >
                            {menuAttributes}
                        </Tag>
                    )
                }
            },
            {
                title: '菜单类型',
                dataIndex: ['menuType'],
                hideInSearch: true,
                align: 'left',
                valueEnum: {
                    0: '一级菜单',
                    1: '子菜单',
                    2: '按钮',
                },
            },
            {
              title: '路径',
              dataIndex: ['url'],
              hideInSearch: true,
              width:"100px",
              align: 'left',
              ellipsis:true,
            //   render:(_, data)=>{
            //       if(data.url && data.url.length>10){
            //         return (data.url.substring(0,10) + '...');
            //       }
            //       return data.url
            //   }
            },
            {
              title: '关键字',
              key: 'perm',
              ellipsis:true,
              dataIndex: ['perms'],
              hideInSearch: true,
              align: 'left',
            },
            {
              title: '排序',
              key: 'sortNo',
              dataIndex: 'sortNo',
              hideInSearch: true,
              align: 'left',
            },
            {
              title: '操作',
              valueType: 'option',
              width:"180px",
              align: 'left',
              hideInSearch: true,
              render:( _, data ) =>[
                <a key='option1' onClick={()=>{ this._clickUpdateMenu(data) }}>编辑</a>,
                <a key='option2' hidden={data?.menuType === 2} onClick={()=>{ this._clickSonMenu(data) }}>添加下级</a>,
                <Popconfirm 
                    key={'option3'}
                    title={`确认删除【${data.title}】该${data?.menuType === 2 ? '按钮' : '菜单'}吗？`}
                    onConfirm={()=>{this._deleteMenu(data.key)}}
                    okText="确认"
                    cancelText="取消"
                >
                <a>删除</a>
                </Popconfirm>,
              ]
            }
          ]
        return(
            <PageContainer
                header={{title:false}}
            >
            <div className={styles.container}>
                <ProTable
                    toolBarRender={() => [
                        <Button type="primary" onClick={() => { this._clickFirstMenu()  }}>
                            <PlusOutlined />新增
                        </Button>,
                    ]}
                    pagination={false}
                    headerTitle="菜单树表"
                    search={false}
                    actionRef={actionRef}
                    rowKey="menu_id"
                    columns={columns}
                    request={(params, sorter, filter) => this._httpMemuList()}
                >

                </ProTable>
            </div>
            <EditMenuDrawer 
                visible={this.state.visibleDrawer}
                onClose={()=>{ this.setState({visibleDrawer:false}) }}
                modalData={this.state.menuModalData}
                onSuccess={this._editSuccess}
            />
            </PageContainer>
        )
    }
}
export default Menu