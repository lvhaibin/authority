import axios from 'axios';
import { ajax } from './index';


export const userInfo = (name, uId = '') => ajax({
  method: 'GET',
  url: `/api/v1.0/user?name=${name}&uId=${uId}`,
  needToken: true,
});

export const userList = (page, pageSize) => ajax({
  method: 'GET',
  url: `/api/v1.0/user/list?page=${page}&pageSize=${pageSize}`,
  needToken: true,
});

export const login = params => axios({
    method: 'POST',
    url: `/api/v1.0/login`,
    data: params,
    needToken: false
});

export const register = params => axios({
  method: 'POST',
  url: `/api/v1.0/register`,
  data: params,
  needToken: false
});

export const userAdd = params => ajax({
  method: 'POST',
  url: `/api/v1.0/user/add`,
  data: params,
  needToken: true
});

export const userUpdate = params => ajax({
  method: 'POST',
  url: `/api/v1.0/user/update`,
  data: params,
  needToken: true
});
