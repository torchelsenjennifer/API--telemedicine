import { sequelize } from "../databases/conecta.js";
import { Patient } from "../models/Patient.js";

export const patientIndex = async (req, res) => {
  try {
    const patient = await Patient.findAll();
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const patientCreate = async (req, res) => {
  const { name, cpf, email, password } = req.body;

  if (!name || !cpf || !email || !password) {
    res.status(400).json({
      id: 0,
      msg: "Erro...Informe os dados.",
    });
    return;
  }
  try {
    const patient = await Patient.create({
      name,
      cpf,
      email,
      password,
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).send(error);
  }
};
