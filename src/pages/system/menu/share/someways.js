

/**
 * 处理tree顶级菜单列表数据
 * @param list
 * 
 */
export function handleTreeData(list){
    // let len = list.length;
    if(list){
        for (let i = 0; i < list.length; i++) {
        list[i].icon = '';
        list[i].level = 1;
        if(list[i].children && list[i].children.length){
            for (let j = 0; j < list[i].children.length; j++) {
                list[i].children[j].level = 2;
                
            }
        }
        
    }
    return list;
    }

}


/**
 * 处理tree 子菜单列表数据
 * @param list
 * @param treeData
 */
export function handleTreeSOnData(list,treeData){
    // let len = list.length;
    if(list && list.length){
            for (let j = 0; j < treeData.length; j++) {
                if(list[0].parentId === treeData[j].id){
                    treeData[j].children = list;
                    return treeData;
                }
            }
    }
    return treeData;
}