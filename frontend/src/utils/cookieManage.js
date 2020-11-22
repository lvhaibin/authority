import cookies from './cookies';

export const clearCookies = () => {
    cookies.remove('access_token')
    cookies.remove('uname')
    cookies.remove('uid')
    cookies.remove('email')
}

export const getToken = () => {
    return cookies.get('access_token');
}
