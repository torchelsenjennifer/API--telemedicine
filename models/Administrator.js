import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Administrator = sequelize.define("administrator", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  crm: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});
