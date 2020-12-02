import moment from 'moment';
import PermissionModel from '../models/permissionModel.js';

class Permission {
    async list(ctx) {
        const { page, pageSize } = ctx.query;
        const { count, rows } = await PermissionModel.findAndCountAll({
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
        const { title, type, name, status = 1, permissionId } = ctx.request.body;
        const [, created] = await PermissionModel.findOrCreate({
            where: { title },
            defaults: {
                type,
                name,
                permissionId,
                createdAt: date,
                updatedAt: date,
                status
            }
        })
        if (!created) {
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
        const { title, type, name, status, permissionId, id } = ctx.request.body;
        const date = moment().format('YYYY/MM/DD');
        if (!id) {
            ctx.body = {
                code: 101,
                msg: '请输入正确参数！',
                body: null
            }
        }
        const result = await PermissionModel.update({
            title,
            type,
            name,
            permissionId,
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

export default new Permission();