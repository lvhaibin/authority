import { userRoutes } from './userRoute.js';
import { roleRoutes } from './roleRoute.js';
import { permissionRoutes } from './permissionRoute.js';
import { userRoleRoutes } from './userRoleRoute.js';


export const appRoutes = [
    ...userRoutes,
    ...roleRoutes,
    ...permissionRoutes,
    ...userRoleRoutes,
];
