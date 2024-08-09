import { Sequelize } from 'sequelize';
import gameModel from './game.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database_setup/mydatabase.db'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Game = gameModel(sequelize, Sequelize);

export default db;
