import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Card } from 'antd';
import { fetchUserRequest } from '@actions/user';
import Loading from '@component/Loading/Loading';
import cookies from '@utils/cookies';

const PaddingWrapper = styled.div`
    padding: 30px;
`;

export default function UserInfo() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserRequest(cookies.get('uname')));
    }, [dispatch])

    const userState = useSelector(state => state.get('user'));
    const userName = userState.getIn(['data', 'username']);
    const phone = userState.getIn(['data', 'phone']);
    const loading = userState.get('loading');

    const Info = (() => {
        if (loading) {
            return <Loading />
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
