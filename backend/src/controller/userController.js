import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import Sequelize from 'sequelize';
import UserModel from '../models/UserModel.js';

function md5(data) {
    // 以md5的格式创建一个哈希值
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('base64');
}

class User {
    async list(ctx) {
        const { page, pageSize } = ctx.query;
        const { count, rows } = await UserModel.findAndCountAll({
            attributes: {
                exclude: ['password'],
            },
            order: [['createdAt', 'DESC']],
            limit: parseInt(pageSize),
            offset: (page - 1) * pageSize
        });
        if (rows) {
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    data: {
                        count,
                        list: rows
                    }
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

    async add(ctx) {
        const { username, password = 'rbac123456', phone, email, avatar, status, isAdmin } = ctx.request.body;
        const userData = await UserModel.findOne({
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
            const result = await UserModel.create({
                username,
                password: md5(password),
                avatar: avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                phone,
                email,
                createdAt: date,
                updatedAt: date,
                status,
                isAdmin
            })
            if (!result) {
                ctx.body = {
                    code: 101,
                    msg: '添加失败！',
                    body: null
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: 'success',
                    body: null,
                }
            }
        }
    }


    async update(ctx) {
        const { username, phone, email, avatar, status, isAdmin, id } = ctx.request.body;
        const date = moment().format('YYYY/MM/DD');
        if (!id) {
            ctx.body = {
                code: 101,
                msg: '请输入正确参数！',
                body: null
            }
        }
        const result = await UserModel.update({
            username,
            avatar,
            phone,
            email,
            updatedAt: date,
            status,
            isAdmin
        }, {
            where: {
                id
            }
        });

        

        if (!result) {
            ctx.body = {
                code: 101,
                msg: '更新失败！',
                body: null
            }
        } else {
            ctx.body = {
                code: 0,
                msg: 'success',
                body: null,
            }
        }
    }


    async userInfo(ctx) {
        const uId = ctx.query.uId;
        const name = ctx.query.name;
        const userData = await UserModel.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { username: name },
                    { id: uId }
                ]
            },
            attributes: { exclude: ['password'] }
        });

        if (userData) {
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    ...userData
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
        const userData = await UserModel.findOne({
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
        const userData = await UserModel.findOne({
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
            const result = await UserModel.create({
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
                ctx.body = {
                    code: 0,
                    msg: 'success',
                    body: null
                }
            }
        }
    }
}

export default new User();