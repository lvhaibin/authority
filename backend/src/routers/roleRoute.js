import roleController from '../controller/roleController.js';

export const roleRoutes = [
    {
        path: '/api/v1.0/role/list',
        method: 'get',
        action: roleController.list
    },
    {
        path: '/api/v1.0/role/add',
        method: 'post',
        action: roleController.add
    },
    {
        path: '/api/v1.0/role/update',
        method: 'post',
        action: roleController.update
    },
]
