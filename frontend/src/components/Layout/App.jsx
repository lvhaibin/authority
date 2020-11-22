import React from 'react';
import { Spin } from 'antd';
import Loading from '@component/Loading/Loading'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ValideRoute from './ValideRoute';

const Dashboard = React.lazy(() => import('@component/Layout/Dashboard'));
const Login = React.lazy(() => import('@component/User/Login'));
const Register = React.lazy(() => import('@component/User/Register'));


export function App() {
    return (
        <React.Suspense fallback={<Spin />}>
            <Router>
                <Switch>
                    <ValideRoute sensitive exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <ValideRoute path="/" render={() => <Dashboard />} />
                </Switch>
            </Router>
        </React.Suspense>
    );
}