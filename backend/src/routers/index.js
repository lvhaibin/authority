import { userRoutes } from './userRoute.js';
import { roleRoutes } from './roleRoute.js';
import { permissionRoutes } from './permissionRoute.js';

export const appRoutes = [...userRoutes, ...roleRoutes, ...permissionRoutes];
