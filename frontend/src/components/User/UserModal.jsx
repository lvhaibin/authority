import React, { useState, useEffect } from 'react';
import { Modal, Select, Form, Input, message, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { userUpdate, userInfo, userAdd } from '@request/user';
import { fetchUserListRequest} from '@actions/user';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

export default function UserModal(props) {
    const dispatch = useDispatch();
    const { visible, onCancel, userId, action } = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        if (userId) {
            setLoading(true);
            userInfo('', userId).then((res) => {
                form.setFieldsValue(res.dataValues);
                setLoading(false);
            })
        }
    }, [userId]);

    const refreshData = () => {
        dispatch(
            fetchUserListRequest({
            page: 1,
            size: 10
            })
        );
        onCancel && onCancel();
        form.setFieldsValue();
    }

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            if (action === 'create') {
                userAdd(values).then(() => {
                    refreshData();
                }).catch(() => {
                    message.error({
                        content: '操作失败！'
                    })
                });
            } else {
                values.id = userId;
                userUpdate(values).then(() => {
                    refreshData();
                });
            }
        }).catch(() => {
            message.warning('请重新检查表单！')
        });
    }

    const handleOk = () => {
        handleSubmit();
    }

    const handleCancel = () => {
        onCancel && onCancel();
    }

    const renderForm = () => {
        return (
            <Form form={form} name="basic" {...layout}>
                <Form.Item
                    shouldUpdate
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="电话号码"
                    rules={[
                        {
                            required: true,
                            message: '请输入电话号码!'
                        },
                        {
                            pattern: /^1[0-9]{10}/,
                            message: '请输入正确的手机号!'
                        }
                    ]} >
                    <Input addonBefore="+86 " style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱格式不正确!',
                        },
                        {
                            required: true,
                            message: '请输入邮箱!',
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

                <Form.Item
                    name="isAdmin"
                    label="身份"
                    rules={[{ required: true, message: '请选择身份！' }]}>
                    <Select placeholder="请选择">
                        <Select.Option value={0}>超级管理员</Select.Option>
                        <Select.Option value={1}>普通管理员</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }

    const renderLoading = () => {
        return <Spin />;
    }

    return (
        <Modal
            destroyOnClose
            title="新建用户"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {loading ? renderLoading(): renderForm()}
        </Modal>
    );
}
