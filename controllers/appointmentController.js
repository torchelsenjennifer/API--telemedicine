import { sequelize } from "../databases/conecta.js";
import { Appointment } from "../models/Appointment.js";
import { Log } from "../models/Log.js";

export const appointmentIndex = async (req, res) => {
  try {
    const appointment = await Appointment.findAll();
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
	try{
		//o paciente logado precisa ser o dono da consulta marcada para poder desmarcar
		const deletado = await Appointment.destroy({where: { id, patient_id } });
		if (!deletado){
			await Log.create({
				descricao: `O Paciente de id ${patient_id} tentontou desmarcar a consulta de id ${id} e foi impedido pelo sistema`
			})
			return res.status(400).json({ msg: "Nao foi possivel excluir!"})
		}
		//regista se paciente desmarco a consulta
		await Log.create({
			descricao: `O Paciente de id ${patient_id} desmarcou a consulta de id ${id}`
		})

		res.status(200).json({ msg: "Ok! Consulta Desmarcada com Sucesso"})
	} catch (error) {
		res.status(400).send(error)
	}
}
