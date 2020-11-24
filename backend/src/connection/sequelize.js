import Sequelize from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});

export default sequelize;
