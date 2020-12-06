import moment from 'moment';
import userRoleModel from '../models/userRoleModel.js';

import sequelize from '../connection/sequelize.js';

class UserRole {
    async list(ctx) {
        const { page, pageSize } = ctx.query;
        const list = await sequelize.query(`SELECT user_role.id as id,  user.username as username, role.title as title, user_role.createdAt as createdAt, user_role.updatedAt as updatedAt FROM user_role left join user on user_role.userId = user.id left join role on user_role.roleId = role.id  limit ${(page - 1) * pageSize}, ${parseInt(pageSize)};`, { type: sequelize.QueryTypes.SELECT })
        const count = await userRoleModel.count();
        if (list) {
            ctx.body = {
                code: 0,
                msg: 'success',
                body: {
                    data: {
                        count,
                        list,
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
        const { userId, roleId } = ctx.request.body;
        const date = moment(new Date(), 'YYYY/MM/DD');
        const result = await userRoleModel.create({
            userId,
            roleId,
            createdAt: date,
            updatedAt: date,
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


    async update(ctx) {
        const { userId, roleId, id } = ctx.request.body;
        const date = moment(new Date(), 'YYYY/MM/DD');
        if (!id) {
            ctx.body = {
                code: 101,
                msg: '请输入正确参数！',
                body: null
            }
        }
        const result = await userRoleModel.update({
            userId,
            roleId,
            updatedAt: date,
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

export default new UserRole();