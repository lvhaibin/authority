import permissionController from '../controller/permissionController.js';

export const permissionRoutes = [
    {
        path: '/api/v1.0/permission/list',
        method: 'get',
        action: permissionController.list
    },
    {
        path: '/api/v1.0/permission/add',
        method: 'post',
        action: permissionController.add
    },
    {
        path: '/api/v1.0/permission/update',
        method: 'post',
        action: permissionController.update
    },
]
