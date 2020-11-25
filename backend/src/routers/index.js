import userController from '../controller/userController.js';

export const appRoutes = [
    {
        path: '/api/v1.0/user',
        method: 'get',
        action: userController.userInfo
    },
    {
        path: '/api/v1.0/login',
        method: 'post',
        action: userController.login
    },
    {
        path: '/api/v1.0/register',
        method: 'post',
        action: userController.register
    },
]
