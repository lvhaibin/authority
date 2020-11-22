import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { getToken } from '@utils/cookieManage';


export default withRouter(props => {
    const token = getToken();
    if (!token && props.path === '/login') {
        return <Route {...props} />;
    } else if (!token) {
        return <Redirect to="/login" />;
    } else if (token && props.path === '/login') {
        return <Redirect to="/" />;
    }

    return <Route {...props} />;
});
