import _ from 'lodash';
import { debounce, isEmpty } from '@/utils/utils';

const defaultSkuItemData = {
  image_id: 0,
  image: [],
  // imageList: [],
  goods_price: '',
  line_price: '',
  stock_num: '',
  goods_weight: '',
  goods_sku_no: '',
};

/**整理所有的规格 */
function dealSpecGroupArr(multiSpecData) {
  const specGroupArr = [];
  multiSpecData.specList.forEach((specGroup) => {
    const itemArr = [];
    specGroup.valueList.forEach((value) => {
      itemArr.push(value);
    });
    specGroupArr.push(itemArr);
  });
  return specGroupArr;
}

/**合并单元格 */
function dealRowSpanArr(specGroupArr, cartesianList) {
  const rowSpanArr = [];
  var rowSpan = cartesianList.length;
  for (let i = 0; i < specGroupArr.length; i++) {
    rowSpanArr[i] = parseInt(rowSpan / specGroupArr[i].length);
    rowSpan = rowSpanArr[i];
  }
  return rowSpanArr;
}

/**生成skuList */
function buildSkuList(cartesianList, multiSpecData) {
  // 生成新的skuList
  // 默认的sku记录值

  const newSkuList = [];
  for (let i = 0; i < cartesianList.length; i++) {
    const newSkuItem = {
      ...defaultSkuItemData,
      key: i,
      // skuKey用于合并旧记录
      skuKey: cartesianList[i].map((item) => item.key).join('_'),
      // skuKeys用于传参给后端
      skuKeys: cartesianList[i].map((item) => {
        return {
          groupKey: item.groupKey,
          valueKey: item.key,
        };
      }),
    };
    cartesianList[i].forEach((val, idx) => {
      newSkuItem[`spec_value_${idx}`] = val.spec_value;
    });
    newSkuList.push(newSkuItem);
  }
  // 兼容旧的sku数据
  let skuList = oldSkuList(newSkuList, multiSpecData);

  return skuList;
}

/**合并已存在的sku数据*/
function oldSkuList(newSkuList, multiSpecData) {
  // const oldSkuList = _.cloneDeep(this.multiSpecData.skuList)
  const oldSkuList = multiSpecData.skuList.concat();
  if (!oldSkuList.length || !newSkuList.length) {
    return newSkuList;
  }
  for (const index in newSkuList) {
    // 查找符合的旧记录
    let oldSkuItem = {};
    if (oldSkuList.length === newSkuList.length) {
      oldSkuItem = _.cloneDeep(oldSkuList[index]);
    } else {
      oldSkuItem = oldSkuList.find((item) => {
        return item.skuKey === newSkuList[index].skuKey;
      });
    }
    // 写入新纪录
    if (oldSkuItem) {
      newSkuList[index] = {
        ...newSkuList[index],
        ..._.pick(oldSkuItem, Object.keys(defaultSkuItemData)),
      };
      // console.log(newSkuList[index].image)
    }
  }
  return newSkuList;
}

/**生成sku表格字段名*/
function buildSkuColumns(rowSpanArr, multiSpecData, defaultColumns) {
  const specList = multiSpecData.specList;
  const newColumns = defaultColumns.concat();
  // 渲染字段的rowSpan
  const customRender = (specIndex, value, row, index) => {
    const obj = {
      children: value,
    };
    return obj;
  };
  // 遍历规格组整理字段
  for (let specIndex = specList.length; specIndex > 0; specIndex--) {
    const specGroupItem = specList[specIndex - 1];
    newColumns.unshift({
      title: specGroupItem.spec_name,
      dataIndex: `spec_value_${specIndex - 1}`,
      align: 'center',
      render: (text, record, index) => customRender(specIndex, text, record, index),
      onCell: (_, index) => {
        const obj = {};
        const rowSpan = rowSpanArr[specIndex - 1];
        if (index % rowSpan === 0) {
          obj.rowSpan = rowSpan;
        } else {
          obj.rowSpan = 0;
        }
        return obj;
      },
    });
  }
  return newColumns;
}

/**
 * 生成笛卡尔积数据
 * cartesianProductOf([arr1, arr2, arr3 ...])
 * 方法array.reduce(callback(accumlator, currentValue, index, array), initalValue)
 * 对数组中的每个元素执行一次传入的回调函数（按索引升序执行），并将结果汇总为单个值
 */
export const cartesianProductOf = (arrays) => {
  if (!arrays.length) {
    return [];
  }
  //写法一
  return arrays.reduce(
    (arr1, arr2) => {
      var ret = [];
      arr1.forEach((v1) => {
        arr2.forEach((v2) => {
          ret.push(v1.concat([v2]));
        });
      });
      return ret;
    },
    [[]],
  );
  //写法二
  // return Array.prototype.reduce.call(
  //   arrays,
  //   (arr1, arr2) => {
  //     var ret = [];
  //     arr1.forEach((v1) => {
  //       arr2.forEach((v2) => {
  //         ret.push(v1.concat([v2]));
  //       });
  //     });
  //     return ret;
  //   },
  //   [[]],
  // );
};

/**生成并获取多规格数据*/
export function getData(data, defaultColumns) {
  let newData = {};
  let specList = _.cloneDeep(data.specList);
  newData['specList'] = data.specList;
  // let skuList = _.cloneDeep(data.skuList);
  // 整理所有的规格组
  const specGroupArr = dealSpecGroupArr(data);
  // sku记录的规格属性集(生成笛卡尔积)
  const cartesianList = cartesianProductOf(specGroupArr);
  // 合并单元格
  const rowSpanArr = dealRowSpanArr(specGroupArr, cartesianList);
  // 生成sku字段名
  newData['skuColumns'] = buildSkuColumns(rowSpanArr, data, defaultColumns);
  // 生成sku列表数据
  newData['skuList'] = buildSkuList(cartesianList, data);
  // 返回多规格数据
  return newData;
}
