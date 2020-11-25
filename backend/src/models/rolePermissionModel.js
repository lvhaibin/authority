import sequelize from '../connection/sequelize.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const userRoleModel = sequelize.define('role_permission', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    roleId: {
        type: DataTypes.INTEGER(11)
    },
    permissionId: {
        type: DataTypes.INTEGER(11)
    },
    createdAt: {
        type: DataTypes.DATEONLY
    },
    updatedAt: {
        type: DataTypes.DATEONLY
    }
});

export default userRoleModel;
