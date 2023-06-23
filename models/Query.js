import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Patient } from "./Patient.js";
import { Specialist } from "./Specialist.js";

export const Query = sequelize.define("query", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  day: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(20),
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
});

//Uma consulta pertence a um paciente
Query.belongsTo(Patient, {
  foreignKey: {
    name: "patient_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

//um paciente pode pertencer a varias consultas
Patient.hasMany(Query, {
  foreignKey: "patient_id",
});

//uma consulta é realizada por um especialista
Query.belongsTo(Specialist, {
  foreignKey: {
    name: "specialist_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// um especialista pode ter varias consultas
Specialist.hasMany(Query, {
  foreignKey: "patient_id",
});
