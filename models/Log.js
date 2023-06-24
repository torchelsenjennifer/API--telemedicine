import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Log = sequelize.define('log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
});
