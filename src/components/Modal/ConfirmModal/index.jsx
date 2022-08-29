import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const ConfirmModal = (props) => {

    const { visible, title, icon, content, onOk, onCancel } = props

    return (
        Modal.confirm({
            title: title,
            icon: icon || <ExclamationCircleOutlined />,
            content: content || null,
            onOk() {
                onOk();
            },
            onCancel() {
                onCancel();
            },
            visible: visible || false,
        });
    );
}

export default ConfirmModal;