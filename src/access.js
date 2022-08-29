import routes from '../config/routes';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  const initPageAuthority = initHandleRoutes(routes);
  const menuData = currentUser?.menuData || [];
  const authority = filterAccessMenu(initPageAuthority, menuData);
  console.log('authority:', authority);
  return authority;
}

/**初始化路由页面权限
 * @description 初始化拥有access字段值不为空的path路径的访问权限为false
 */
const initHandleRoutes = (menu) => {
  let body = {};
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].access) {
      body[menu[i].access] = false;
    }
    if (menu[i].routes && menu[i].routes.length > 0) {
      let menu2 = menu[i].routes;
      for (let j = 0; j < menu2.length; j++) {
        if (menu2[j].access) {
          body[menu2[j].access] = false;
        }
      }
    }
  }
  console.log('路由:', menu);
  console.log('初始化路由页面权限:', body);
  return body;
};

/** 根据服务器菜单数据，重新渲染菜单权限 */
const filterAccessMenu = (routeKeyValue, menu) => {
  let body = routeKeyValue;
  if (menu) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].children && menu[i].children.length > 0) {
        let menu2 = menu[i].children;
        for (let j = 0; j < menu2.length; j++) {
          if (menu2[j].perms) {
            body[menu2[j].perms] = true;
          }
          if (menu2[j].children && menu2[j].children.length > 0) {
            let menu3 = menu2[j].children;

            for (let k = 0; k < menu3.length; k++) {
              if (menu3[k]?.perms) {
                body[menu3[k].perms] = true;
              }
            }
          }
        }
      }
    }
  }

  return body;
};
