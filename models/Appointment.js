import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Patient } from "./Patient.js";
import { Specialist } from "./Specialist.js";

export const Appointment = sequelize.define("appointment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  appointment_Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  modality: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
},{
	paranoid: true
});

//Uma consulta pertence a um paciente
Appointment.belongsTo(Patient, {
  foreignKey: {
    name: "patient_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

//um paciente tem muitas consultas
Patient.hasMany(Appointment, {
  foreignKey: "patient_id",
});

//uma consulta pertence a especialista
Appointment.belongsTo(Specialist, {
  foreignKey: {
    name: "specialist_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// um especialista tem muitas consultas
Specialist.hasMany(Appointment, {
  foreignKey: "specialist_id",
});
