import sequelize from '../connection/sequelize.js';
import Sequelize from 'sequelize';
import UserModel from './userModel.js';
import roleModel from './roleModel.js';

const { DataTypes } = Sequelize;

const userRoleModel = sequelize.define('user_role', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER(11)
    },
    roleId: {
        type: DataTypes.INTEGER(11)
    },
    createdAt: {
        type: DataTypes.DATEONLY
    },
    updatedAt: {
        type: DataTypes.DATEONLY
    }
});

// A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C

UserModel.belongsToMany(roleModel, { through: 'userRoleModel' });

export default userRoleModel;
