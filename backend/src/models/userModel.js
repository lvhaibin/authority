import sequelize from '../connection/sequelize.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const UserModel = sequelize.define('user', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '0: 无效,1:有效'
    },
    isAdmin: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '0:超级管理员,1:普通管理员'
    },
    createdAt: {
        type: DataTypes.DATEONLY
    },
    updatedAt: {
        type: DataTypes.DATEONLY
    }
});

export default UserModel;
