import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Card } from 'antd';
import styled from 'styled-components';
import { fetchUserRequest } from '@actions/user';
import cookies from '@utils/cookies';

const SpainWrapper = styled.div`
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
`;

const PaddingWrapper = styled.div`
    padding: 30px;
`;

export default function UserInfo() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserRequest(cookies.get('uname')));
    }, [dispatch])

    const userState = useSelector(state => state.get('user'));
    const userName = userState.getIn(['data', 'name']);
    const phone = userState.getIn(['data', 'phone']);
    const loading = userState.get('loading');

    const Info = (() => {
        if (loading) {
            return (
                <SpainWrapper>
                    <Spin />
                </SpainWrapper>
            )
        }
        return (
            <PaddingWrapper>
                <Card title="用户信息">
                    <p>用户名: {userName}</p>
                    <p>手机号: {phone}</p>
                </Card>
            </PaddingWrapper>
        )
    })

    return <Info />;
}
