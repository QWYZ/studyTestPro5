import { parse } from 'querystring';
import { message } from 'antd';
import defaultSettings from '../../config/defaultSettings';
import proxy from '../../config/proxy';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 获取Token
 * @returns Token
 */
export const getAccessToken = () => {
  return JSON.parse(localStorage.getItem('loginUserData'))?.token || 'null';
};

/**
 *  UUID生成
 *  @returns {string}
 */
export const getUUID = () => {
  return 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 生成随机数
export const randomString = (length) => {
  const tempLength = length || 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < tempLength; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 根据key和value获取数组中的对象,数组中的每个对象的key必须是唯一的。
 * example: list = [{id:1, name:'测试1'},{id:2, name:'测试2'}]
 * transfer: getObjectFromArrByKey(arr, 'id', 2)
 * result: {id:2, name:'测试2'}
 * @param list    原项目列表
 * @param key     查询的key
 * @param  value  查询的value
 * @return  item 查询的结果
 */
export const getObjectFromArrByKey = (list, key, value) => {
  for (const item of list) {
    if (item[key] == value) {
      return item;
    }
  }
};

/**
 * 利用正则表达式实现模糊查询项目（name属性）。
 * @param  {Array}  list     原项目列表
 * @param  {String} value  查询的关键词
 * @return {Array}           查询的结果
 */
export const searchTermListByKeyWord = (list, value) => {
  const reg = new RegExp(value);
  const arr = [];
  for (const item of list) {
    if (reg.test(item.name)) {
      arr.push(item);
    }
  }
  return arr;
};

/**
 * 利用正则表达式实现模糊查询项目(进化版)
 * @param  {Array}  list     原项目列表
 * @param  {String} value  查询内容
 * @param  {String} value  查询的关键词
 * @return {Array}           查询的结果
 */
export const searchListByKeyWord = (list, value, keyWord) => {
  const reg = new RegExp(value);
  const arr = [];
  for (const item of list) {
    if (reg.test(item[keyWord])) {
      arr.push(item);
    }
  }
  return arr;
};

/**
 * 实现树形列表模糊查询，查询字段name
 * @param {*} value 查询内容
 * @param {*} arr 树形列表数据
 * @param {*} keyWord 查询关键字
 * @returns
 */
export const searchTreeListByKeyWord = (value, arr, keyWord) => {
  if (!arr) {
    return [];
  }
  if (!value) {
    return arr;
  }
  let newarr = [];
  arr.forEach((element) => {
    if (element[keyWord].indexOf(value) > -1) {
      const ab = searchTreeListByKeyWord(value, element.children, keyWord);
      let obj = {
        ...element,
      };
      if (ab && ab.length > 0) {
        obj['children'] = ab;
      }
      newarr.push(obj);
    } else {
      if (element.children && element.children.length > 0) {
        const ab = searchTreeListByKeyWord(value, element.children, keyWord);
        let obj = {
          ...element,
        };
        if (ab && ab.length > 0) {
          obj['children'] = ab;
          newarr.push(obj);
        }
      }
    }
  });
  return newarr;
};

//将json数据转为formData格式
export const jsonToFormData = (json) => {
  const formData = new FormData();
  Object.getOwnPropertyNames(json).forEach(function (key) {
    formData.append(key, json[key]);
  });
  return formData;
};

/**
 * 将列表数据转化成标准的下拉数据
 * @param {Array} datelist
 * @param {String} lable
 * @param {String} value
 */
export const listToDropDownList = (datelist, label, value) => {
  let a = JSON.parse(JSON.stringify(datelist).replace(new RegExp(label, 'g'), 'label'));
  let b = JSON.parse(JSON.stringify(a).replace(new RegExp(value, 'g'), 'value'));
  return b;
};

/**
 * 提取数组中指定字段
 * @param {Array<any>} datelist
 * @param {Array<string>|String} fieldArray
 */
// export const pickFieldArray = (datelist,fieldArray) =>{
//   let b = [];
//   datelist.map(item => {
//     b.push(_.pick(item,fieldArray));
//   });
//   console.log('pickFieldArray',b);
//   return b
// }

/**
 * 数组转对象
 * @param {*} list
 * @param {*} keyField key字段
 * @param {*} keyValueField keyvalue字段
 */
export const arrayToObject = (list, key, keyValue) => {
  let obj = {};
  list.map((e) => {
    obj[e[key]] = e[keyValue];
  });
  // console.log('arrayToObject',obj);
  return obj;
};

/**
 * 图片预览
 * @example   <Upload
                name="face"
                listType="picture-card"
                accept=".jpg, .png, .jpeg"
                maxCount={1}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onPreview={onPreview}
              >
                {fileList.length > 0 ? null : <PlusOutlined />}
              </Upload>
 * @param {File} file 图片
 */
export const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow.document.write(image.outerHTML);
};

/**
 * 数组去重
 * 去除数组中的重复数据
 * 更多参考：https://www.jb51.net/article/128453.htm / https://www.cnblogs.com/hanyudanei/p/9496757.html
 * @param {Array} arr
 * @returns
 */
export function unique1(arr) {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) == -1) {
      hash.push(arr[i]);
    }
  }
  return hash;
}

/**数组内数据重复性检查
 * @param {Array} arr
 * @event unique1() 数组去重
 * @returns
 */
export const arrayDataRepetitionCheck = (arr) => {
  let len = arr.length;
  let len_2 = unique1(arr).length;
  return len === len_2;
};

/**
 * 手势滑动(pc)
 * 支持上下和 左右滑动
 * @param {*} id 传入产生滚动条的 dom id
 */
export const creatDrag = (id) => {
  var oBox = document.getElementById(id);
  oBox.onmousedown = function (ev) {
    var ev = ev || event;
    var Y = ev.clientY;
    var X = ev.clientX;
    var ToTop = document.getElementById(id).scrollTop;
    var Toleft = document.getElementById(id).scrollLeft;
    oBox.onmousemove = function (ev) {
      ev = ev || event;
      var subY = ev.clientY - Y;
      var subX = ev.clientX - X;
      Y = ev.clientY;
      X = ev.clientX;
      ToTop -= subY;
      Toleft -= subX;
      document.getElementById(id).scrollTop = ToTop;
      document.getElementById(id).scrollLeft = Toleft;
    };
    document.onmouseup = function () {
      oBox.onmousemove = function () {
        null;
      };
    };
  };
};

/**
 * 按钮触发滑动（pc）
 * 支持上下和 左右滑动
 * @param {String} id  传入产生滚动条的 dom id
 * @param {String} direction 传入滚动方向 left|right|top|down
 * @param {Number} len 传入滚动长度
 */
export const btnScroll = (id, direction, len = 50) => {
  var currentScrollLeft = document.getElementById(id).scrollLeft;
  var currentScrollTop = document.getElementById(id).scrollTop;
  switch (direction) {
    case 'left':
      document.getElementById(id).scrollLeft = currentScrollLeft - len;
      break;
    case 'right':
      document.getElementById(id).scrollLeft = currentScrollLeft + len;
      break;
    case 'top':
      document.getElementById(id).scrollLeft = currentScrollTop - len;
      break;
    case 'down':
      document.getElementById(id).scrollLeft = currentScrollTop + len;
      break;
    default:
      break;
  }
};

/**
 * 移除对象中所有的null
 * @param {*} obj
 * @returns
 */
export const removePropertyOfNull = (obj) => {
  Object.keys(obj).forEach((item) => {
    if (!obj[item]) delete obj[item];
  });
  return obj;
};

// 递归实现树结构转列表
export const treeToList = (tree, result = [], level = 0) => {
  tree.forEach((node) => {
    result.push(node);
    node.level = level + 1;
    node.children && treeToList(node.children, result, level + 1);
  });
  return result;
};

// 递归实现列表转树结构
export const listToTree = (list) => {
  let info = list.reduce((map, node) => ((map[node.id] = node), (node.children = []), map), {});
  return list.filter((node) => {
    info[node.parentId] && info[node.parentId].children.push(node);
    return !node.parentId;
  });
};

// 获取父节点的key
export const getParentKey = (tree, key) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(node.children, key)) {
        parentKey = getParentKey(node.children, key);
      }
    }
  }
  return parentKey;
};

// 数据结构不确定层级，不确定是否有子集（children） ，要求通过id获得指定数据的位置并记录他的层级内容信息
// 获取指定id的位置   并以层级的形式放入数组
export const getCidList = (data, key) => {
  let cid_list = [];
  data.forEach((item) => {
    if (item.key === key) {
      cid_list = [item.key];
      return false;
    } else {
      if (item.children) {
        let newCid_list = [item.key];
        let list = nodefun(item.children, key, newCid_list);
        if (list) {
          cid_list = list;
        }
      }
    }
  });
  // 递归函数
  function nodefun(newVal, newId, newCid_list) {
    let flag = false;
    newVal.forEach((j) => {
      if (j.key === newId) {
        newCid_list.push(j.key);
        flag = true;
      } else {
        if (j.children) {
          let cid_list = JSON.parse(JSON.stringify(newCid_list));
          cid_list.push(j.key);
          let list = nodefun(j.children, newId, cid_list);
          if (list) {
            newCid_list = list;
            flag = true;
          }
        }
      }
    });
    if (flag) {
      return newCid_list;
    }
  }
  return cid_list;
};

// 判断文件类型是否是设备类型要求的图片格式
export const isDeviceTypeImg = (file) => {
  const isJpgOrPng =
    file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('只允许上传jpeg/jpg/png格式的图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能大于2M!');
  }
  return isJpgOrPng && isLt2M;
};

//(开发环境) 处理代理转发地址
export const wrapAPI = (url) => {
  // console.log('REACT_APP_ENV',REACT_APP_ENV);
  if (REACT_APP_ENV === 'dev') {
    //开发环境
    return url.replace(
      `${defaultSettings.serverApiName}/`,
      proxy.dev[`${defaultSettings.serverApiName}/*`].target,
    );
  }
  return url;
};

// 容错图片
export const errorImg =
  'data:image/png;base64,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';

/**
 * 下载文件
 * @param {*} record 内容
 * @param {*} fileName  文件名
 */
export const downloadObject = (record, fileName) => {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a');
  eleLink.download = `${fileName}-${
    record.name || moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
  }.json`;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  const blob = new Blob([JSON.stringify(record)]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

/**
 * 格式化查询参数
 * @param {*} params
 * @returns
 */
export const encodeQueryParam = (params) => {
  if (!params) return {};
  const queryParam = {};
  // 格式化查询参数
  const { terms } = params;
  const { sorts } = params;
  Object.keys(params).forEach((key) => {
    if (key === 'terms') {
      let index = 0;
      if (!terms) return;
      Object.keys(terms).forEach((k) => {
        if (
          !(terms[k] === '' || terms[k] === undefined || terms[k].length === 0 || terms[k] === {})
        ) {
          if (k.indexOf('$LIKE') > -1 && terms[k].toString().indexOf('%') === -1) {
            terms[k] = `%${terms[k]}%`;
          }
          if (k.indexOf('$IN') > -1) {
            terms[k] = terms[k].toString();
          } else if (k.indexOf('$START') > -1) {
            terms[k] = `%${terms[k]}`;
          } else if (k.indexOf('$END') > -1) {
            terms[k] = `${terms[k]}%`;
          }
          if (k.indexOf('@') > -1) {
            const temp = k.split('@');
            // eslint-disable-next-line prefer-destructuring
            queryParam[`terms[${index}].column`] = temp[0];
            // eslint-disable-next-line prefer-destructuring
            queryParam[`terms[${index}].type`] = temp[1];
          } else {
            queryParam[`terms[${index}].column`] = k;
          }
          queryParam[`terms[${index}].value`] = terms[k];
          index += 1;
        }
      });
    } else if (key === 'sorts') {
      // 当前Ant Design排序只支持单字段排序
      if (!sorts) return;
      if (Object.keys(sorts).length > 0) {
        queryParam[`sorts[0].name`] = Object.keys(sorts)[0];
        queryParam[`sorts[0].order`] = (sorts[Object.keys(sorts)[0]] || '').replace('end', '');

        // queryParam[`sorts[0].name`] = sorts.field;
        // queryParam[`sorts[0].order`] = (sorts.order || '').replace('end', '');
      }
    } else {
      queryParam[key] = params[key];
    }
  });

  return queryParam;
};

/**
 * 节流
 * @param {Function} fn
 * @param {Number} delay
 * @returns
 */
export function throttle(fn, delay) {
  // 记录上次触发的时间戳
  var lastTime = 0;
  return function () {
    // 记录当前触发的时间戳
    var nowTime = Date.now();
    // 如果当前触发与上次触发的时间差值 大于 设置的周期则允许执行
    if (nowTime - lastTime > delay) {
      fn.call(this);
      // 更新时间戳
      lastTime = nowTime;
    }
  };
}

/**防抖*/
// 首次运行时把定时器赋值给一个变量， 第二次执行时，
// 如果间隔没超过定时器设定的时间则会清除掉定时器，
// 重新设定定时器， 依次反复， 当我们停止下来时，
// 没有执行清除定时器， 超过一定时间后触发回调函数。
export function debounce(fun, delay) {
  return function (args) {
    // 获取函数的作用域和变量
    const that = this;
    const _args = args;
    // 每次事件被触发，都会清除当前的timeer，然后重写设置超时调用
    clearTimeout(fun.id);
    fun.id = setTimeout(function () {
      fun.call(that, _args);
    }, delay);
  };
}

/**
 * 判断是否为对象
 * @param {*} object
 */
export function isObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
}

/**
 * 判断是否为数组
 * @param {*} array
 */
export function isArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
}

/**
 * 判断是否为空
 * @param {*} object 源对象
 */
export function isEmpty(value) {
  if (isArray(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return isEmptyObject(value);
  }
  return !value;
}

/**读取当前系统环境 */
export function systemInfo() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = {};
  const MAP_EXP = {
    Weixin: /micromessenger/i,
    Mac: /(mac os x)\s+([\w_]+)/,
    Windows: /(windows nt)\s+([\w.]+)/,
    Ios: /(i(?:pad|phone|pod))(?:.*)cpu(?: i(?:pad|phone|pod))? os (\d+(?:[\.|_]\d+){1,})/,
    Android: /(android)\s+([\d.]+)/,
    Ipad: /(ipad).*os\s([\d_]+)/,
    Iphone: /(iphone\sos)\s([\d_]+)/,
  };
  for (let key in MAP_EXP) {
    const uaMatch = ua.match(MAP_EXP[key]);
    platform[`is${key}`] = !!uaMatch;
    if (!!uaMatch && !platform.version) {
      platform.version = key === 'Ios' ? uaMatch[2].replace(/_/g, '.') : uaMatch[2];
    }
  }
  return platform;
}

/**移动文件位置
 * @param preList 原数组
 */
 export const arrayMoveImmutable = (array,oldIndex,newIndex) =>{
  array = [...array]
  if(oldIndex===newIndex){return array}
  const [item] = array.splice(oldIndex,1);
  array.splice(newIndex, 0, item);

  return array
 }
