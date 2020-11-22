import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { login } from '@request/user';
import cookies from '@utils/cookies';
import styled from 'styled-components';

const LoginWrapper = styled.div`
    width: 600px;
    margin: 100px auto;
`;

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 16,
    },
};

export default function Login() {
    const history = useHistory();
    const onFinish = values => {
        login(values).then((res) => {
            const expires = 24 * 7 * 3600;
            if (res.status === 200 && res.data.code === 0) {
                const { token, uame, uid, email } = res.data.body;
                cookies.set('access_token', token, { expires });
                cookies.set('uname', uame, { expires });
                cookies.set('uid', uid, { expires });
                cookies.set('email', email, { expires });
                history.push('/');
            } else {
                message.error({content: res.data.msg})
            }
        })
    };

    return (
        <LoginWrapper>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的用户名!',
                        }
                    ]} >
                    <Input placeholder="用户名/手机号" />
                </Form.Item>

                <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码!',
                    },
                ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" style={{width: '100%'}} htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Link to="/register">注册</Link>
                </Form.Item>
            </Form>
        </LoginWrapper>

    );
}