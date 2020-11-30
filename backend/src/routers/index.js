import { userRoutes } from './userRoute.js';
import { roleRoutes } from './roleRoute.js';

export const appRoutes = [...userRoutes, ...roleRoutes];
