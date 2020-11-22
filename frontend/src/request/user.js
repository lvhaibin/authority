import axios from 'axios';
import { ajax } from './index';


export const userInfo = name => ajax({
  method: 'GET',
  url: `/api/v1.0/user?name=${name}`,
  needToken: true,
});

export const login = params => axios({
    method: 'POST',
    url: `/api/v1.0/login`,
    data: params,
    needToken: false
})

export const register = params => axios({
  method: 'POST',
  url: `/api/v1.0/register`,
  data: params,
  needToken: false
})

