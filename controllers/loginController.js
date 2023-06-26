import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

import { Patient } from "../models/Patient.js";
import { Log } from "../models/Log.js";
import { Administrator } from "../models/Administrator.js";

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

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const mensaErroPadrao = "Opa... Erro... Login ou senha invalida";

  // verifica se as informaçoes foram preenchidas
  if (!email || !password) {
    res.status(400).json({ erro: mensaErroPadrao });
    return;
  }

  // verifica se o e-mail esta cadastrado
  try {
    const adm = await Administrator.findOne({ where: { email } });

    // se variavel receber null
    if (adm == null) {
      await Log.create({
        descricao: "Opa... Tentativa de Login com Email Inválido... Procure a Telemedicena para saber!",
      });
      res.status(400).json({ erro: mensaErroPadrao });
      return;
    }

	//Depois de encontrar o email na lista, verifica se a senha esta correta
    if (bcrypt.compareSync(password, adm.password)) {
      const token = jwt.sign(
        {
          user_logado_id: adm.id,
          user_logado_nome: adm.nome,
        },
        process.env.JWT_ADIM_KEY,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({ msg: "Ok. Você esta Logado como Administrador no sitema da Telemedicena!", token });
    } else {
      //Se a senha estiver errada, registra um log desta tentativa de acesso
      await Log.create({
        descricao: `O Administrador de id ${adm.id} tentou acessar com Senha Invalida`,
      });

      res.status(400).json({ erro: mensaErroPadrao });
    }
  } catch {
    res.status(400).json(error);
  }
};
