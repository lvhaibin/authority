import React, { useState, useEffect } from 'react';
import { Table, Button, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoleListRequest} from '@actions/role';
import RoleModal from '@component/Role/RoleModal';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 30px;
`;

export default function RoleManager() {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);
    const [visible, setVisible] = useState(false);
    // const [userId, setUserId] = useState('');
    // const [action, setAction] = useState('create');

    const handleOnUpdate = (record) => {
        // setUserId(record.id);
        // setAction('update');
        setVisible(true);
    }

    const columns = [
        {
            title: '角色名',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
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
                    <a onClick={(record) => { handleOnUpdate(record) }}>更新</a>
                );
            },
          },
    ];

    useEffect(() => {
        loadData(current, pageSize)
    }, [dispatch, current, pageSize]);


    const loadData = (page, size) => {
        dispatch(fetchRoleListRequest({ page, size }));
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

    const roleData = useSelector(state => state.get('role'));
    const loading = roleData.get('loading');
    const count = roleData.getIn([ 'data', 'count']);
    const list = roleData.getIn([ 'data','list']);

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
            <RoleModal visible={visible} onCancel={handleOnCancel} />
        </Wrapper>
    );
}
