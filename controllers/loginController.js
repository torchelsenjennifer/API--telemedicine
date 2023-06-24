import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

import { Patient } from "../models/Patient.js";
import { Log } from "../models/Log.js";

dotenv.config();

export const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  const mensaErroPadrao = "Erro... Login ou senha invalida";

  if (!email || !password) {
    res.status(400).json({ erro: mensaErroPadrao });
    return;
  }

  // verifica se o e-mail esta cadastrado
  try {
    const patient = await Patient.findOne({ where: { email } });

    if (patient == null) {
      await Log.create({
        descricao: "Tentativa de Login com Email Inválido",
      });
      res.status(400).json({ erro: mensaErroPadrao });
      return;
    }

    if (bcrypt.compareSync(password, patient.password)) {
      const token = jwt.sign(
        {
          user_logado_id: patient.id,
          user_logado_nome: patient.nome,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ msg: "Ok. Paciente Logado no Sistema!", token });
    } else {
      // registra um log desta tentativa de acesso
      await Log.create({
        descricao: `O Paciente de id ${patient.id} tentou acessar com Senha Invalida`,
      });

      res.status(400).json({ erro: mensaErroPadrao });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
