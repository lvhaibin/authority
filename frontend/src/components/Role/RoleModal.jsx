import React from 'react';
import { Modal, Select, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createRoleRequest } from '@actions/role';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

export default function UserModal(props) {
    const dispatch = useDispatch();
    const { visible, onCancel } = props;
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            dispatch(createRoleRequest(values))
        }).catch(() => {
            message.warning('请重新检查表单！')
        });
    }

    const handleOk = () => {
        handleSubmit();
        onCancel && onCancel();
    }

    const handleCancel = () => {
        onCancel && onCancel();
    }

    const renderForm = () => {
        return (
            <Form form={form} name="basic" {...layout}>
                <Form.Item
                    shouldUpdate
                    label="角色名"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: '请输入角色名！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="角色描述"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="状态"
                    rules={[{ required: true, message: '请选择状态！' }]}
                >
                    <Select placeholder="请选择">
                        <Select.Option value={1}>有效</Select.Option>
                        <Select.Option value={0}>无效</Select.Option>
                    </Select>
                </Form.Item>

            </Form>
        );
    }

    return (
        <Modal
            destroyOnClose
            title="新建角色"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {renderForm()}
        </Modal>
    );
}
