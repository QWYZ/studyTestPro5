import { Tag } from 'antd';

/**更据接口类型返回不同颜色标签 */
const backTagRender = (t) => {
  const obj = {
    POST: 'blue',
    GET: 'green',
    DELETE: 'red',
  };
  return <Tag color={obj[t]}>{t}</Tag>;
};

export { backTagRender };
