import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import './styles.less';
import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Space, Upload } from 'antd';
import { onPreview } from '@/utils/utils';
import FileModal from '../Modal/FileModal';


/**图片选择器组件
 * @param {any} props
 */
const SelectImage = (props) => {
    const {
        multiple,   // 多选模式, 如果false为单选
        maxNum,     // 最大选择的数量限制, multiple模式下有效
        value: defaultList,// 默认选中的文件
        onChange,
        width       // 元素的尺寸(宽)
    } = props;

    const [fileList, setFileList] = useState(defaultList || [])
    //编辑图片选择模态框
    const [editModalType, setEditModalType] = useState({ type: '' });
    const [modalData, setModalData] = useState();
    useEffect(() => {

    }, [])

    const handleDeleteFileItem = (index) => {
        let old_items = JSON.parse(JSON.stringify(defaultList))
        old_items.splice(index, 1)
        onChange(old_items)
    }

    /**移动位置触发 */
    const onSortEnd = ({ oldIndex, newIndex }) => {
        let re_items = arrayMoveImmutable(defaultList, oldIndex, newIndex)
        onChange(re_items)
    };

    /**组件单元 */
    const SortableItem = SortableElement(({ value, sortIndex }) => {

        return (
            <div className={'file-item'} style={{ width: `${width}px`, height: `${width}px` }}>
                <a href={value?.preview_url} target="_blank">
                    {/* <img className={"img-cover"} src={value?.preview_url} alt="" /> */}
                    <div className={"img-cover"} style={{ backgroundImage: `url('${value?.preview_url}')` }}></div>
                </a>
                <CloseCircleFilled className={"icon-close"} onClick={() => { handleDeleteFileItem(sortIndex) }} />
            </div>
        )
    });

    /**图片列表 */
    const SortableList = SortableContainer(({ items }) => {
        return (
            <div >
                {
                    items.map((value, index) => {
                        return (
                            <SortableItem key={`item-${index}`} sortIndex={index} index={index} value={value} />
                        )
                    })
                }
            </div>
        );
    });


    const handleChange = (e) => {
        if (multiple) {
            onChange(e.fileList)
        } else {
            onChange(e.file)
        }
    };

    /**图片上传 */
    const uploadImgRender = () => (
        <div
            className={'selector'}
            style={{ width: `${width}px`, height: `${width}px`, marginBottom: 8, marginLeft: `${defaultList && defaultList.length > 0 ? 8 : 0}px` }}
            title="点击选择图片"
            onClick={() => {
                setEditModalType({ type: 'select' })
            }}
        >
            <PlusOutlined className='icon-plus' style={{ fontSize: `${width * 0.4}px` }} />
        </div>

    )

    return (
        <div className='image-list'>
            {/* <Space direction={'horizontal'} > */}
            {
                multiple ?
                    <>
                        {
                            defaultList && defaultList.length > 0 &&
                            <SortableList
                                distance={2}
                                axis={'xy'}
                                items={defaultList}
                                onSortEnd={onSortEnd}
                                helperClass={'helperClass'}
                                // hideSortableGhost={false}
                                useWindowAsScrollContainer
                            />
                        }
                        {
                            ((defaultList && defaultList.length < maxNum) || !defaultList) && uploadImgRender()
                        }
                    </>
                    :
                    (!defaultList || defaultList.length == 0) ?
                        uploadImgRender() :
                        <SortableList
                            distance={10}
                            axis={'x'}
                            items={defaultList}
                            onSortEnd={onSortEnd}
                            helperClass={'helperClass'}
                            // hideSortableGhost={false}
                            useWindowAsScrollContainer
                        />
            }
            {/* </Space> */}
            <FileModal
                multiple={multiple}
                maxNum={maxNum}
                selectedNum={defaultList ? defaultList.length : 0}
                editModalType={editModalType}
                onSuccess={(data) => {
                    setEditModalType({ type: '' });
                    let a = defaultList || [];
                    let b = a.concat(data)
                    onChange(b)
                }}
                onCancel={() => {
                    setEditModalType({ type: '' });
                }}
                modalVisible={editModalType.type}
            />
        </div>
    );
}

export default SelectImage;

