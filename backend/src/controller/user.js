import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import Sequelize from 'sequelize';
import UserModal from '../modals/user.js';

function md5(data) {
    // 以md5的格式创建一个哈希值
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('base64');
}

class User {
    async userInfo(ctx) {
        const name = ctx.query.name;
        const userData = await UserModal.findOne({
            where: {
                username: name
            },
            attributes: { exclude: ['password'] }
        });
        if (name) {
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    name: userData.username,
                    phone: userData.phone
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
        const userData = await UserModal.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { username: username },
                    { phone: username }
                ]
            },
            attributes: ['id', 'username', 'phone', 'password', 'email']
        });
        if (!userData) {
            ctx.body = {
                code: 101,
                msg: '用户不存在！',
                body: null
            }
        } else if (userData.password != md5(password)) {
            ctx.body = {
                code: 101,
                msg: '密码错误',
                body: null
            }
        } else if (userData.password === md5(password)) {
            const payload = { userName: userData.username, id: userData.id, email: userData.email };
            const token = jwt.sign(payload, 'rbac_secret', { expiresIn: '12h' });
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    uame: userData.username,
                    uid: userData.id,
                    email: userData.email,
                    token
                }
            }
        }
    }

    async register(ctx) {
        const { username, password, phone, email, avatar } = ctx.request.body;
        const userData = await UserModal.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { username: username },
                    { phone: username }
                ]
            },
            attributes: ['id', 'username', 'phone', 'password', 'email']
        });
        const date = moment().format('YYYY/MM/DD');
        if (userData) {
            ctx.body = {
                code: 101,
                msg: '用户已存在！',
                body: null
            }
        } else {
            const result = await UserModal.create({
                username,
                password: md5(password),
                avatar: avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                phone,
                email,
                createdAt: date,
                updatedAt: date
            })
            if (!result) {
                ctx.body = {
                    code: 101,
                    msg: '注册失败！',
                    body: null
                }
            } else {
                console.log('result ===>', result)
                ctx.body = {
                    code: 0,
                    msg: 'success',
                    body: {
                        
                    }
                }
            }
        }
    }
}

export default new User();