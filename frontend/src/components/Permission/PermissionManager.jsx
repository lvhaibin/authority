import React, { useState, useEffect } from 'react';
import { Table, Button, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPermissionListRequest} from '@actions/permission';
import PermissionModal from '@component/Permission/PermissionModal';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 30px;
`;

export default function PermissionManager() {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);
    const [visible, setVisible] = useState(false);

    const handleOnUpdate = (record) => {
        setVisible(true);
    }

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '路由',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '节点类型',
            dataIndex: 'type',
            key: 'type',
            render: (text, row, index) => {
                if (row.type === 1) {
                    return '模块权限';
                }
                if (row.type === 2) {
                    return '菜单权限'
                }
                if (row.type === 3) {
                    return '操作权限'
                }
                return null;
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
                    <a onClick={(record) => { handleOnUpdate(record) }}>更新</a>
                );
            },
          },
    ];

    useEffect(() => {
        loadData(current, pageSize)
    }, [dispatch, current, pageSize]);


    const loadData = (page, size) => {
        dispatch(fetchPermissionListRequest({ page, size }));
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

    const permissionData = useSelector(state => state.get('permission'));
    const loading = permissionData.get('loading');
    const count = permissionData.getIn([ 'data', 'count']);
    const list = permissionData.getIn([ 'data','list']);

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
            <PermissionModal visible={visible} onCancel={handleOnCancel} />
        </Wrapper>
    );
}
