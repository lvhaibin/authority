import React, { useState, useEffect } from 'react';
import { Table, Button, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserListRequest} from '@actions/user';
import CreateUserModal from '@component/User/CreateUserModal';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 30px;
`;

export default function UserManager() {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState('');
    const [action, setAction] = useState('create');

    const handleOnUpdate = (record) => {
        setUserId(record.id);
        setAction('update');
        setVisible(true);
    }

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
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => {
                return (
                    <a onClick={handleOnUpdate.bind(this, record)}>更新</a>
                );
            },
          },
    ];

    useEffect(() => {
        loadData(current, pageSize)
    }, [dispatch, current, pageSize]);


    const loadData = (page, size) => {
        dispatch(fetchUserListRequest({ page, size }));
    }

    const openModal = () => {
        setAction('create');
        setVisible(true);
    }

    const OperatetHeader = () => {
        return <Button type="primary" onClick={openModal}>新建</Button>
    }

    const handleOnCancel = () => {
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
            <CreateUserModal visible={visible} onCancel={handleOnCancel} userId={userId} action={action} />
        </Wrapper>
    );
}
