import { sequelize } from "../databases/conecta.js";
import { Specialist } from "../models/Specialist.js";

export const specialistIndex = async (req, res) => {
  try {
    const specialist = await Specialist.findAll();
    res.status(200).json(specialist);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const specialistCreate = async (req, res) => {
  const { name, role, email, password, administrator_id} = req.body;

  if (!name || !role || !email || !password || !administrator_id) {
    res.status(400).json({
      id: 0,
      msg: "Erro...Informe os dados.",
    });
    return;
  }
  try {
    const specialist = await Specialist.create({
      name,
      role,
      email,
      password,
	  administrator_id
    });
    res.status(201).json(specialist);
  } catch (error) {
    res.status(400).send(error);
  }
};
