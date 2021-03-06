import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Redirect, Route, Link, Switch, useHistory } from 'react-router-dom'
import { Layout as AntdLayout, Menu, Spin, Avatar, Dropdown } from 'antd';
import {
    LikeOutlined,
    HomeOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    LoginOutlined
} from '@ant-design/icons';

import { clearCookies } from '@utils/cookieManage';

const { Content, Sider, Header } = AntdLayout;

const UserInfo = React.lazy(() => import('@component/User/UserInfo'));
const UserManager = React.lazy(() => import('@component/User/UserManager'));
const RoleManager = React.lazy(() => import('@component/Role/RoleManager'));
const PermissionManager = React.lazy(() => import('@component/Permission/PermissionManager'));
const UserRoleManager = React.lazy(() => import('@component/UserRole/UserRoleManager'));


export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    }

    const logout = ({ key }) => {
        if (key === 'logout' ) {
            clearCookies()
            history.push('/login');
        }
    }

    const menu = (
        <Menu onClick={logout}>
            <Menu.Item key="userInfo" icon={<UsergroupAddOutlined />}>
                <Link to="/user">用户信息</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LoginOutlined />}>
                退出登陆
            </Menu.Item>
        </Menu>
      );

    return (
        <ConfigProvider locale={zhCN}>
            <AntdLayout style={{ height: '100%'}}>
                <Header className="header">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 15 }}>
                        <Dropdown overlay={menu} placement="bottomLeft" arrow>
                            <Avatar icon={<UserOutlined />} />
                        </Dropdown>
                    </div>
                </Header>
                <AntdLayout>
                    <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="dashboard" icon={<HomeOutlined />}>
                                <Link to="/">dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="UserManager" icon={<HomeOutlined />}>
                                <Link to="/user/list">用户列表</Link>
                            </Menu.Item>
                            <Menu.Item key="RoleManager" icon={<HomeOutlined />}>
                                <Link to="/role/list">角色列表</Link>
                            </Menu.Item>
                            <Menu.Item key="PermissionManager" icon={<HomeOutlined />}>
                                <Link to="/permission/list">权限列表</Link>
                            </Menu.Item>
                            <Menu.Item key="UserRoleManager" icon={<HomeOutlined />}>
                                <Link to="/user/role">用户角色</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <AntdLayout>
                        <Content>
                            <div className="content">
                                <React.Suspense fallback={<Spin />}>
                                    <Switch>
                                        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                                        <Route exact path="/dashboard" render={() => <div>dashboard</div>} />
                                        <Route exact path="/user" component={UserInfo} />
                                        <Route exact path="/user/list" component={UserManager} />
                                        <Route exact path="/role/list" component={RoleManager} />
                                        <Route exact path="/permission/list" component={PermissionManager} />
                                        <Route exact path="/user/role" component={UserRoleManager} />
                                    </Switch>
                                </React.Suspense>
                            </div>
                        </Content>
                    </AntdLayout>
                </AntdLayout>
            </AntdLayout>
        </ConfigProvider>
    );
}