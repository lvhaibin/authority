import { ajax } from './index';

export const roleList = (page, pageSize) => ajax({
  method: 'GET',
  url: `/api/v1.0/role/list?page=${page}&pageSize=${pageSize}`,
  needToken: true,
});

export const roleAdd = params => ajax({
  method: 'POST',
  url: `/api/v1.0/role/add`,
  data: params,
  needToken: true
});

export const roleUpdate = params => ajax({
  method: 'POST',
  url: `/api/v1.0/role/update`,
  data: params,
  needToken: true
});

