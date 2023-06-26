import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Specialist } from "./Specialist.js";
import brcryp from 'bcrypt'

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
	unique: true,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
});

Administrator.beforeCreate((administrador) => {
	const salt = brcryp.genSaltSync(12)
	const hash = brcryp.hashSync(administrador.password, salt)
	administrador.password = hash
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
