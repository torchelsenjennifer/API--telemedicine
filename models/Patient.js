import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import brcryp from 'bcrypt'

export const Patient = sequelize.define("patient", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
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
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
});

// Faz a criptografia da senha e atribui o hash ao campo senha
Patient.beforeCreate((patient) => {
	const salt = brcryp.genSaltSync(12)
	const hash = brcryp.hashSync(patient.password, salt)
	patient.password = hash
});
