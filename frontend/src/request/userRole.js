import { ajax } from './index';

export const userRoleList = (page, pageSize) => ajax({
  method: 'GET',
  url: `/api/v1.0/user/role/list?page=${page}&pageSize=${pageSize}`,
  needToken: true,
});

export const userRoleAdd = params => ajax({
  method: 'POST',
  url: `/api/v1.0/user/role/add`,
  data: params,
  needToken: true
});

export const userRoleUpdate = params => ajax({
  method: 'POST',
  url: `/api/v1.0/user/role/update`,
  data: params,
  needToken: true
});

