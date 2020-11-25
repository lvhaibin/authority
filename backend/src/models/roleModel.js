import sequelize from '../connection/sequelize.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const roleModel = sequelize.define('role', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
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

export default roleModel;
