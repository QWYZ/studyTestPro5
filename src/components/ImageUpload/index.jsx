import { arrayMoveImmutable } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons'
import { Tooltip, Upload } from 'antd';
// import { arrayMoveImmutable } from 'array-move';
// import update from 'immutability-helper'
import React, { useCallback, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './index.less';
const ImageUpload = (props) => {
    const type = 'DragableUploadList'
    const [fileList, setFileList] = useState([]);
    
    const DragableUploadListItem = useCallback(
        ({ originNode, moveRow, file, fileList, id, index}) => {
            const dragRef = useRef(null);
            // const index = fileList.indexOf(file);
            const [, drop] = useDrop({
                accept: type,
                hover: (item, monitor) => {
                    if (!dragRef.current) {
                        return
                    }
                    const dragIndex = item.index
                    const hoverIndex = index
                    // Don't replace items with themselves
                    if (dragIndex === hoverIndex) {
                        return
                    }
                    // monitor.isOver({ shallow: true })
                    // Determine rectangle on screen
                    const hoverBoundingRect = dragRef.current?.getBoundingClientRect()
                    // Get vertical middle
                    const hoverMiddleY =
                        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                    // 获取水平方向的中间值
                    const hoverMiddleX =
                        (hoverBoundingRect.right - hoverBoundingRect.left) / 2
                    // Determine mouse position
                    const clientOffset = monitor.getClientOffset()
                    // Get pixels to the top
                    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    
                    const hoverClientX = clientOffset.x - hoverBoundingRect.left
    
                    // Only perform the move when the mouse has crossed half of the items height
                    // When dragging downwards, only move when the cursor is below 50%
                    // When dragging upwards, only move when the cursor is above 50%
    
                    // Dragging 
                    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX && hoverClientY < hoverMiddleY) {
                        return
                    }
                    // Dragging 
                    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX && hoverClientY > hoverMiddleY) {
                        return
                    }
                    // Time to actually perform the action
                    moveRow(dragIndex, hoverIndex)
                    // Note: we're mutating the monitor item here!
                    // Generally it's better to avoid mutations,
                    // but it's good here for the sake of performance
                    // to avoid expensive index searches.
                    item.index = hoverIndex
                },
            });
            const [{ isDragging }, drag, dragPreview] = useDrag({
                type,
                item: () => {
                    return {id,index }
                },
                collect: (monitor) => ({
                    isDragging: monitor.isDragging(),
                }),
    
            });
    
            drop(drag(dragRef));
            // console.log('isDragging',isDragging);
            const opacity = isDragging ? 0 : 1
            const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
    
            return (
                
                <div
                    ref={dragRef}
                    style={{
                        cursor: 'move',
                        opacity
                    }}
                >
                    {file.status === 'error' ? errorNode : originNode}
                </div>
            );
        },
        []
    )
    /* 拖拽移动处理函数 */
    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            /*  */
            setFileList((val) => {
                return arrayMoveImmutable(val, dragIndex, hoverIndex)
            });
            /*原理同上 */
            // setFileList((preFileList)=>{
            //     return update(preFileList,{
            //         $splice: [
            //             [dragIndex, 1],
            //             [hoverIndex, 0, preFileList[dragIndex]],
            //         ],
            //     })
            // })
        },
        [fileList],
    );

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const uploadImageNew = () => {

        return (
            <DndProvider backend={HTML5Backend}>
                <Upload
                    listType={'picture-card'}
                    fileList={fileList}
                    onChange={onChange}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    itemRender={(originNode, file, currFileList) => {
                        const index = fileList.indexOf(file);
                        return (
                            <DragableUploadListItem
                                key={file.uid}
                                id={file.uid}
                                originNode={originNode}
                                file={file}
                                fileList={currFileList}
                                moveRow={moveRow}
                                index={index}
                            />
                        )
                    }}
                    multiple
                >
                    <PlusOutlined />
                </Upload>
            </DndProvider>
        )
    }


    return (
        <>
            {uploadImageNew()}
        </>
    )
}

export default ImageUpload