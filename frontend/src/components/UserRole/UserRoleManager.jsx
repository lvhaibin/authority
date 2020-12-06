import React, { useState, useEffect } from 'react';
import { Table, Button, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRoleListRequest} from '@actions/userRole';
import UserRoleModal from '@component/UserRole/UserRoleModal';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 30px;
`;

export default function UserRoleManager() {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);
    const [visible, setVisible] = useState(false);

    const handleOnUpdate = (record) => {
        setVisible(true);
    }

    const columns = [
        {
            title: '用户',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '角色',
            dataIndex: 'title',
            key: 'title',
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
                    <a onClick={(record) => { handleOnUpdate(record) }}>更新</a>
                );
            },
          },
    ];

    useEffect(() => {
        loadData(current, pageSize)
    }, [dispatch, current, pageSize]);


    const loadData = (page, size) => {
        dispatch(fetchUserRoleListRequest({ page, size }));
    }

    const openModal = () => {
        // setAction('create');
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

    const userRoleData = useSelector(state => state.get('userRole'));
    const loading = userRoleData.get('loading');
    const count = userRoleData.getIn([ 'data', 'count']);
    const list = userRoleData.getIn([ 'data','list']);

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
            <UserRoleModal visible={visible} onCancel={handleOnCancel} />
        </Wrapper>
    );
}
