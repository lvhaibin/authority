import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRequest } from '@actions/user';
import cookies from '@utils/cookies';
import { Spin, Card } from 'antd';
import './userInfo.less';

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
                <div className="loading">
                    <Spin />
                </div>
            )
        }
        return (
            <div className="pd" >
                <Card title="用户信息">
                    <p>用户名: {userName}</p>
                    <p>手机号: {phone}</p>
                </Card>
            </div>
        )
    })

    return <Info />;
}
