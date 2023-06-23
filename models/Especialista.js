import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Especialista = sequelize.define("especialista", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  crm: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});
