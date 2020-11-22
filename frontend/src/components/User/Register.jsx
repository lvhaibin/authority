import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Button,
  message,
  notification
} from 'antd';

import { register } from '@request/user';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 8 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 12,
        offset: 0,
      },
      sm: {
        span: 8,
        offset: 8,
      },
    },
  };

export default function Register() {
    const [form] = Form.useForm();
    const history = useHistory();

    const onFinish = values => {
        register(values).then(res => {
            console.log(res);
            if (res.status === 200 && res.data.code === 0) {
                notification.success({
                    message: '注册成功！',
                    description: '3秒之后去登陆！',
                });
                setTimeout(() => {
                    history.push('/login');
                }, 3000);
            } else {
                message.error({content: res.data.msg})
            }
        });
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: '100%'}}>
            <Form
                style={{width: '100%', height: 500}}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名!', whitespace: true }]} >
                <Input />
            </Form.Item>
            
            <Form.Item
                name="password"
                label="密码"
                rules={[
                {
                    required: true,
                    message: '请输入密码!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: '请与输入的密码保持一致!',
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject('两次密码输入不一致!');
                    },
                }),
                ]}
            >
                <Input.Password />
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
                label="身份"
                name="profile"
                rules={[{
                    required: true,
                    message: '请选择身份!'
                }]}
            >
                <Select value="demand">
                    <Select.Option value="admin">举办方</Select.Option>
                    <Select.Option value="demand">需求方</Select.Option>
                    <Select.Option value="supplier">供应商</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                注册
                </Button>
            </Form.Item>
            </Form>
        </div>

    );
}
