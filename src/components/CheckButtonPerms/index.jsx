

import {treeToList} from "@/utils/utils";
import { useModel, useAccess } from 'umi';

/**
 * @description: 按钮权限校验组件, 主要校验按钮权限，有权限即显示，无权限返回null
 * @date 2021/8/19
 */
export const CheckButtonPerms =  (props) => {
  const access = useAccess();
  // console.log('access',access);
  // const { initialState } = useModel('@@initialState');
  const { children, perms, noPermsNode = null } = props;

  // const noPermsChildren = noPermsNode ? noPermsNode : null;

  // // 获取本地保存的菜单数据
  // const menuData = initialState?.currentUser?.menuData || [];

  // // 获取扁平化后的菜单列表
  // const menuFlat = treeToList(menuData)

  // // 将按钮过滤出来(可以不过滤，因为some也遍历了一遍)
  // // const buttonPerms = menuFlat.filter(item => item.menuType === 2);

  // 判断有没有按钮权限
  // const check = menuFlat.some((item) => item.perms === perms && item.menuType === 2);

  // 有便返回包裹的children, 无则返回null
  return (REACT_APP_ENV === false)?children : access[perms] ? children : noPermsNode
}
