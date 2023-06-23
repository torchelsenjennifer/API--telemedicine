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
  cargo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

//Um administrador pertence a um especialista
Administrator.belongsTo(Specialist, {
  foreignKey: {
    name: "specialist_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

//um especialista tem vários administrador
Specialist.hasMany(Administrator, {
  foreignKey: "specialist_id",
});
