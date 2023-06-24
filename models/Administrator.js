import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Specialist } from "./Specialist.js";

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
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
});

//Um especialista pertence a um administrador
Specialist.belongsTo(Administrator, {
  foreignKey: {
    name: "administrator_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

//um adminsitardor tem vários especialista
Administrator.hasMany(Specialist, {
  foreignKey: "administrator_id",
});
