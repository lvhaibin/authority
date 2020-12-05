import sequelize from '../connection/sequelize.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const PermissionModel = sequelize.define('permission', {
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
    createdAt: {
        type: DataTypes.DATEONLY
    },
    updatedAt: {
        type: DataTypes.DATEONLY
    }
});

export default PermissionModel;
