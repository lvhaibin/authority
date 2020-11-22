import query from '../connection/mysql.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';

function md5(data) {
    // 以md5的格式创建一个哈希值
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('base64');
}

class User {
    async userInfo(ctx) {
        const name = ctx.query.name;
        if (name) {
            const res = await query(`select username, phone from user where username='${escape(name)}';`);
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    name: res[0].username,
                    phone: res[0].phone
                }
            }
        } else {
            ctx.body = {
                code: 101,
                msg: '未查到相关信息！',
                body: null
            }
        }
    }

    async login(ctx) {
        const { username, password } = ctx.request.body;
        const res = await query(`select id, username, phone, password, email from user where username='${escape(username)}' or phone='${escape(username)}';`);
        if (!res || !res[0]) {
            ctx.body = {
                code: 101,
                msg: '用户不存在！',
                body: null
            }
        } else if (res[0].password != md5(password)) {
            ctx.body = {
                code: 101,
                msg: '密码错误',
                body: null
            }
        } else if (res[0].password === md5(password)) {
            const payload = { userName: res[0].username, id: res[0].id, email: res[0].email };
            const token = jwt.sign(payload, 'rbac_secret', { expiresIn: '12h' });
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    uame: res[0].username,
                    uid: res[0].id,
                    email: res[0].email,
                    token
                }
            }
        }
    }

    async register(ctx) {
        const { username, password, phone, email, avatar } = ctx.request.body;
        const date = moment().format('YYYY/MM/DD');
        const res = await query(`select id, username, phone, password, email from user where username='${escape(username)}' or phone='${escape(phone)}';`);
        if (res && res[0]) {
            ctx.body = {
                code: 101,
                msg: '用户已存在！',
                body: null
            }
        } else {
            const curAvater = avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
            const result = await query(`INSERT INTO user (username, password, avatar, phone, email, createdAt, updatedAt) values ('${username}', '${md5(password)}', '${curAvater}', '${phone}', '${email}', '${date}', '${date}');`);
            if (!result) {
                ctx.body = {
                    code: 101,
                    msg: '注册失败！',
                    body: null
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: 'success',
                    body: {
                        ...result[0]
                    }
                }
            }
        }
    }
}

export default new User();