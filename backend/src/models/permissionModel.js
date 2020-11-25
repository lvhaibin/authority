import sequelize from '../connection/sequelize.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const permissionModel = sequelize.define('permission', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    type: {
        type: DataTypes.INTEGER(1),
        comment: '1:表示模块 2:表示菜单3:操作',
    },
    title: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '0: 无效,1:有效'
    },
    permissionId: {
        type: DataTypes.INTEGER(11),
        comment: '自关联id'
    },
    createdAt: {
        type: DataTypes.DATEONLY
    },
    updatedAt: {
        type: DataTypes.DATEONLY
    }
});

export default permissionModel;
