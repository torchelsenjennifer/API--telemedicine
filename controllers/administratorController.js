import { sequelize } from "../databases/conecta.js";
import { Administrator } from "../models/Administrator.js";

export const administratorIndex = async (req, res) => {
  try {
    const administrator = await Administrator.findAll();
    res.status(200).json(administrator);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const administratorCreate = async (req, res) => {
  const { name, role, email, password } = req.body;

  if (!name || !role || !email || !password) {
    res.status(400).json({
      id: 0,
      msg: "Erro...Informe os dados.",
    });
    return;
  }
  try {
    const administrator = await Administrator.create({
      name,
      role,
      email,
      password,
    });
    res.status(201).json(administrator);
  } catch (error) {
    res.status(400).send(error);
  }
};
