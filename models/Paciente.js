import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Paciente = sequelize.define("paciente", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
});
