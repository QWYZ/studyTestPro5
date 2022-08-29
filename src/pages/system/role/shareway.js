
/**
 * 处理菜单树权限数据
 * 过滤掉父级菜单id
 * @param data
 */
export function handleIds(data){
        let list = data?.treeList;
        let ids = data?.ids;
        let newIds = [];
        // console.log('所有Ids', ids);
         //叶子节点数据列表
        if(list && list.length && ids && ids.length){
            const leafNodeList = getAllLeafNode(list);
            for (let i = 0; i < ids.length; i++) {
                for (let j = 0; j < leafNodeList.length; j++) {
                   if( ids[i] === leafNodeList[j]){
                    // console.log('ids[i]  :  leafNodeList[j].id', ids[i], leafNodeList[j]);
                    newIds.push(ids[i]);
                   }                    
                }                
            }
            // console.log('被勾选的叶子节点',newIds);
            return newIds

        }else{
            return []
        }

}

/**
 * 筛选三级tree所有叶子节点
 * @param {*} treeList 
 * @returns
 */
export function getAllLeafNode(treeList) {
    let leafNodeList = [];
    for (let i = 0; i < treeList.length; i++) {
        if(treeList[i].children && treeList[i].children.length){
            let secondList = treeList[i].children
            for (let j = 0; j < secondList.length; j++) {
                if(secondList[j].children && secondList[j].children.length){
                    let thirdList = secondList[j].children
                    for (let k = 0; k < thirdList.length; k++) {
                        leafNodeList.push(thirdList[k].id);
                    }

                }else{
                    leafNodeList.push(secondList[j].id);
                }
                
            }
        }else{
            leafNodeList.push(treeList[i].id);
        }

        
    }
    // console.log('获取的叶子节点ids',leafNodeList);
    return leafNodeList;
}

/**
 * 数组转字符串
 * @param {*} list 
 * @returns 
 */
export function arrayToString(list){
    let a = list.toString();
    return a
}