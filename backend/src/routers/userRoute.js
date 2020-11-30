import userController from '../controller/userController.js';

export const userRoutes = [
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
    {
        path: '/api/v1.0/user/list',
        method: 'get',
        action: userController.list
    },
    {
        path: '/api/v1.0/user/add',
        method: 'post',
        action: userController.add
    },
]
