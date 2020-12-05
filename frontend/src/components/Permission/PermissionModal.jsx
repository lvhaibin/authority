import React from 'react';
import { Modal, Select, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createPermissionRequest } from '@actions/permission';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

export default function PermissionModal(props) {
    const dispatch = useDispatch();
    const { visible, onCancel } = props;
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            dispatch(createPermissionRequest(values))
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
                    name="type"
                    label="类型"
                    rules={[{ required: true, message: '请选择权限类型！' }]}
                >
                    <Select placeholder="请选择">
                        <Select.Option value={1}>模块权限</Select.Option>
                        <Select.Option value={2}>菜单权限</Select.Option>
                        <Select.Option value={3}>操作权限</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    shouldUpdate
                    label="标题"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: '请输入标题！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="路由"
                    rules={[
                        {
                            required: true,
                            message: '请输入路由！',
                        },
                    ]}
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
            title="新建权限"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {renderForm()}
        </Modal>
    );
}
