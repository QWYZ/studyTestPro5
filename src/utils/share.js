import { Tag } from 'antd';

/**更据接口类型返回不同颜色标签 */
const backTagRender = (t, obj) => {
  const { color, text } = obj[t];
  return <Tag color={color}>{text}</Tag>;
};

export { backTagRender };
