import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Select, Form, Input, message, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserListRequest, createUserRequest } from '@actions/user';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 30px;
`;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

export default function UserManager() {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);
    const [form] = Form.useForm();
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '身份',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (text, row, index) => {
                if (row.isAdmin === 0) {
                    return '超级管理员'
                }
                return '普通成员'
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, row, index) => {
                if (row.status === 0) {
                    return (
                        <span style={{color: 'red'}}>无效</span>
                    );
                }
                return (
                    <span style={{ color: 'green' }}>有效</span>
                );
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ellipsis: true,
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            ellipsis: true,
        },
    ];

    useEffect(() => {
        loadData(current, pageSize)
    }, [dispatch, current, pageSize])


    const loadData = (page, size) => {
        dispatch(fetchUserListRequest({ page, size }));
    }

    const openModal = () => {
        setVisible(true);
    }

    const OperatetHeader = () => {
        return <Button type="primary" onClick={openModal}>新建</Button>
    }

    const handleOk = () => {
        form.validateFields().then((values) => {
            dispatch(createUserRequest(values))
        }).catch(() => {
            message.warning('请重新检查表单！')
        })
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const tableOnChange = (pagination) => {
        setCurrent(pagination.current);
    }

    const userData = useSelector(state => state.get('user'));
    const loading = userData.get('loading');
    const count = userData.getIn(['list', 'data', 'count']);
    const list = userData.getIn(['list', 'data','list']);

    return (
        <Wrapper>
            <Skeleton loading={loading} active>
                <Table
                    rowKey="id"
                    dataSource={list ? list.toJS() : []}
                    columns={columns}
                    title={() => <OperatetHeader />}
                    pagination={{ current, pageSize, total: count }}
                    onChange={tableOnChange}
                />
            </Skeleton>
            <Modal
                title="新建用户"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="basic" {...layout}>
                    <Form.Item
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
                        hasFeedback
                        rules={[{ required: true, message: '请选择状态！' }]}
                    >
                        <Select placeholder="请选择">
                            <Select.Option value="0">无效</Select.Option>
                            <Select.Option value="1">有效</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="isAdmin"
                        label="身份"
                        hasFeedback
                        rules={[{ required: true, message: '请选择身份！' }]}>
                        <Select placeholder="请选择">
                            <Select.Option value="0">超级管理员</Select.Option>
                            <Select.Option value="1">普通管理员</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Wrapper>
    );
}
