import { sequelize } from "../databases/conecta.js";
import { Appointment } from "../models/Appointment.js";
import { Log } from "../models/Log.js";
import { Op } from "sequelize";
import { Patient } from "../models/Patient.js";
import { Specialist } from "../models/Specialist.js";

export const appointmentIndex = async (req, res) => {
  try {
    const appointment = await Appointment.findAll({include: [Patient, Specialist]});
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const appointmentCreate = async (req, res) => {
  const { appointment_Date, modality, address, patient_id, specialist_id } = req.body;

  if (!appointment_Date || !modality || !address || !patient_id || !specialist_id) {
    res.status(400).json({
      id: 0,
      msg: "Erro...Informe os dados.",
    });
    return;
  }
  try {
    const appointment = await Appointment.create({
      appointment_Date,
      modality,
      address,
      patient_id,
      specialist_id,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const appointmentDestroy = async (req, res) => {
  const { id } = req.params;
  const patient_id = req.user_logado_id;
  try {
    //o paciente logado precisa ser o dono da consulta marcada para poder desmarcar
    const deletado = await Appointment.destroy({ where: { id, patient_id } });
    if (!deletado) {
      await Log.create({
        descricao: `O Paciente de id ${patient_id} tentontou desmarcar a consulta de id ${id} e foi impedido pelo sistema`,
      });
      return res.status(400).json({ msg: "Nao foi possivel excluir!" });
    }
    //regista se paciente desmarco a consulta
    await Log.create({
      descricao: `O Paciente de id ${patient_id} desmarcou a consulta de id ${id}`,
    });

    res.status(200).json({ msg: "Ok! Consulta Desmarcada com Sucesso" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const appointmentAlter = async (req, res) => {
  const { id } = req.params;
  const { appointment_Date, modality, address, patient_id, specialist_id } =
    req.body;

  if (!appointment_Date || !modality || !address || !patient_id || !specialist_id) {
    res.status(400).json({
      id: 0,
      msg: "Erro... Informe a Data, modalidade, endereco, paciente e especialidade da consulta.",
    });
    return;
  }

  try {
    const appointment = await Appointment.update(
      {
        appointment_Date,
        modality,
        address,
        patient_id,
        specialist_id,
      },
      {
        where: { id },
      }
    );
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const appointmentPesq = async (req, res) => {
	const { appointment_Date } = req.params;

	try {
	  const appointment_list_day = await Appointment.findAll({
		where: {
			appointment_Date: {
			[Op.lte]: new Date(appointment_Date + ' 23:59:59'),
			[Op.gte]: new Date(appointment_Date + ' 00:00:00')
		  },
		},
	  });
	  res.status(200).json(appointment_list_day);
	} catch (error) {
	  console.log(error);
	  res.status(400).send(error);
	}
  };