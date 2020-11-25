import sequelize from '../connection/sequelize.js';
import Sequelize from 'sequelize';

const UserModel = sequelize.define('user', {
    // 在这里定义模型属性
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '0: 无效,1:有效'
    },
    isAdmin: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '0: 无效,1:有效'
    },
    createdAt: {
        type: Sequelize.DATEONLY
    },
    updatedAt: {
        type: Sequelize.DATEONLY
    },
    roleId: {
        type: Sequelize.INTEGER(11)
    }
});

export default UserModel;
