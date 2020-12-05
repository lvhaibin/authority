import { ajax } from './index';

export const permissionList = (page, pageSize) => ajax({
  method: 'GET',
  url: `/api/v1.0/permission/list?page=${page}&pageSize=${pageSize}`,
  needToken: true,
});

export const permissionAdd = params => ajax({
  method: 'POST',
  url: `/api/v1.0/permission/add`,
  data: params,
  needToken: true
});

export const permissionUpdate = params => ajax({
  method: 'POST',
  url: `/api/v1.0/permission/update`,
  data: params,
  needToken: true
});

