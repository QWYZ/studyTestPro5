import React, { useEffect, useState } from 'react'
import { ueditorConfig } from './ueditorConfig';
import { message, Upload } from 'antd';
import { uploadImage } from '@/services/upload/upload';
import FileModal from '@/components/Modal/FileModal';
/**
 * 富文本编辑器组件
 * @description 在百度富文本编辑器的基础上进行了一次封装
 * @author 千万样子
 */
const UEditor = (props) => {
    const { config, initData, setContent } = props;
    console.log('UEditor.config:', config);
    //编辑图片选择模态框
    const [editModalType, setEditModalType] = useState({ type: '' });
    //
    const ueditorId = props?.ueditorId || "ueditor_id";
    const [ueditor, setUeditor] = useState(null)
    let instances = {};
    useEffect(() => {
        initUeditor();
    }, [])

    /**初始化编辑器 */
    const initUeditor = () => {
        try {
            window.UE.delEditor(ueditorId);
            let editor = window.UE.getEditor(ueditorId, {
                ...ueditorConfig,
                ...config
            })
            /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
            window.UE.registerUI('simpleupload', function (editor1, uiName) {
                // console.log(editor1, uiName);
                // 创建一个 button
                var btn = new window.UE.ui.Button({
                    // 按钮的名字
                    name: uiName,
                    // 提示
                    title: '插入图片',
                    // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
                    cssRules: '',
                    // 点击时执行的命令
                    onclick: () => {
                        // 打开文件选择器
                        // document.getElementById("ueditor_btn_file").click();
                        setEditModalType({ type: 'select' })
                    }
                })
                // 因为你是添加 button，所以需要返回这个 button
                return btn
            },
                undefined, /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */
                ueditorId
            );
            editor.ready(() => {
                if (initData) {
                    editor.setContent(initData)  //设置默认值/表单回显
                }
            })
            editor.addListener("contentChange", function () {
                setContent(editor.getContent())
            });
            setUeditor(editor)
        } catch (error) {
            //如果出错重新加载一次
            setTimeout(() => {
                initUeditor()
            }, 100)
        }
    }

    /**选择图片文件时触发 */
    const fileOnChange = (e) => {
        setEditModalType('select')
        // const file = new FormData();
        // file.append('imgFile', e.target.files[0]);
        // let imgWidth = e.target.files[0]
        // //此处更据你的实际情况添加图片上传接口
        // uploadImage(file).then(res => {
        //     ueditor.focus();
        //     ueditor.execCommand('inserthtml', `<p><img  src="https://smart.gd-hzkj.com/XZLY_images/headimg/20210422/1619070983002.jpg" /></p>`);
        // }).catch(err => {
        //     //测试使用正式使用时移除
        //     message.error('上传失败')
        //     // ueditor.focus();
        //     // ueditor.execCommand('inserthtml', `<img  src="https://smart.gd-hzkj.com/XZLY_images/headimg/20210422/1619070983002.jpg" />`);
        // })
    }

    return (
        <>
            <script id={ueditorId} type="text/plain" />
            <input type={"file"} id={"ueditor_btn_file"} accept={"image/*"} onChange={(e) => fileOnChange(e)} style={{ display: 'none' }} />
            <FileModal
                multiple={false}
                maxNum={1}
                selectedNum={0}
                editModalType={editModalType}
                onSuccess={(data) => {
                    setEditModalType({ type: '' });
                    console.log(data)
                    ueditor.focus();
                    ueditor.execCommand('inserthtml', `<p><img  src="${data[0].preview_url}" /></p>`);
                }}
                onCancel={() => {
                    setEditModalType({ type: '' });
                }}
                modalVisible={editModalType.type}
            />
        </>
    )
}

export default UEditor