import { isEmpty } from '@/utils/utils';
var error = '';

// 表单验证
export const verifyMultiSpecForm = (multiSpecData) => {
  return new Promise((resolve, reject) => {
    // 验证规格
    if (!verifySpec(multiSpecData)) {
      //   message.error(error);
      reject(error);
    }
    // 验证sku
    if (!verifySkuList(multiSpecData)) {
      //   message.error(error);
      reject(error);
    }
    resolve(multiSpecData);
  });
};

// 验证sku
const verifySkuList = (multiSpecData) => {
  const columns = [
    { field: 'goods_price', name: '商品价格' },
    { field: 'stock_num', name: '库存数量' },
  ];
  const skuList = multiSpecData.skuList;
  for (const skuIndex in skuList) {
    const skuItem = skuList[skuIndex];
    for (const colIndex in columns) {
      const value = skuItem[columns[colIndex].field];
      if (value === '' || value === null) {
        error = `${columns[colIndex].name}不能为空`;
        return false;
      }
    }
  }
  return true;
};

// 验证规格
const verifySpec = (multiSpecData) => {
  const specList = multiSpecData.specList;
  if (!specList.length) {
    error = '亲，还没有添加规格组~';
    return false;
  }
  for (const index in specList) {
    // 验证规格组
    const specGroup = specList[index];
    if (isEmpty(specGroup.spec_name)) {
      error = '规格组名称不能为空~';
      return false;
    }
    // 验证规格值
    const valueList = specGroup.valueList;
    if (!valueList.length) {
      error = '还没有添加规格值~';
      return false;
    }
    for (const i in valueList) {
      if (isEmpty(valueList[i].spec_value)) {
        error = '规格值不能为空~';
        return false;
      }
    }
  }
  return true;
};
