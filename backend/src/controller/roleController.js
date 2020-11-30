import moment from 'moment';
import RoleModel from '../models/roleModel.js';

class Role {
    async list(ctx) {
        const { page, pageSize } = ctx.query;
        const { count, rows } = await RoleModel.findAndCountAll({
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
        const { title, description, status = 1 } = ctx.request.body;
        const roleData = await RoleModel.findOne({
            where: {
                title,
            }
        });
        const date = moment().format('YYYY/MM/DD');
        if (roleData) {
            ctx.body = {
                code: 101,
                msg: '角色已存在！',
                body: null
            }
        } else {
            const result = await RoleModel.create({
                title,
                description,
                createdAt: date,
                updatedAt: date,
                status
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
        const { title, description, status, id } = ctx.request.body;
        const date = moment().format('YYYY/MM/DD');
        if (!id) {
            ctx.body = {
                code: 101,
                msg: '请输入正确参数！',
                body: null
            }
        }
        const result = await RoleModel.update({
            title,
            description,
            updatedAt: date,
            status
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
}

export default new Role();