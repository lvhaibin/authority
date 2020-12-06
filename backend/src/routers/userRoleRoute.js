import userRoleController from '../controller/userRoleController.js';

export const userRoleRoutes = [
    {
        path: '/api/v1.0/user/role/list',
        method: 'get',
        action: userRoleController.list
    },
    {
        path: '/api/v1.0/user/role/add',
        method: 'post',
        action: userRoleController.add
    },
    {
        path: '/api/v1.0/user/role/update',
        method: 'post',
        action: userRoleController.update
    },
]
