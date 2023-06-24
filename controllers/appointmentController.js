import { sequelize } from "../databases/conecta.js";
import { Appointment } from "../models/Appointment.js";

export const appointmentIndex = async (req, res) => {
  try {
    const appointment = await Appointment.findAll();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const appointmentCreate = async (req, res) => {
  const { appointment_data, modality, patient_id, specialist_id } = req.body;

  if (!appointment_data || !modality || !patient_id || !specialist_id) {
    res.status(400).json({
      id: 0,
      msg: "Erro...Informe os dados.",
    });
    return;
  }
  try {
    const appointment = await Appointment.create({
      appointment_data,
      modality,
      patient_id,
      specialist_id,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};
