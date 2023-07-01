"use strict";
import nodemailer from "nodemailer";
import md5 from "md5";
import { Patient } from "../models/Patient.js";

async function main(name, email, hash) {

  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "bd0c95a92862ec",
      pass: "01a7473cb832c7",
    },
  });

	const link = "http://localhost:3000/trocasenha/"+hash

	let mensa = "<h5>Sistema de Telemedicina</h5>"
	mensa += `<h6>Estimado: ${name} </h6>`
	mensa += "<h6>Você solicitou a troca de senha. "
	mensa += "Clique no link abaixo para alterar:</h6>"
	mensa += `<a href="${link}">Aterar sua senha</a>`

  let info = await transporter.sendMail({
    from: '"Sistema de Telemedicina" <telemedicina@gmail.com>',
    to: email,
    subject: "Solicitação de Alteração de Senha",
    text: `Copie e cole o endereço: ${link}`,
    html: mensa,
  });

  console.log("Message sent: %s", info.messageId);

}

export const sendEmail = async (req, res) => {
	const { email, password, newPassword } = req.body

	if (!email || !password || !newPassword) {
		res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
		return
	  }

	try {
	  const patient = await Patient.findOne({ where: { email } })

	  if (patient == null) {
		res.status(400).json({ erro: "Erro... E-mail invalido" })
		return
	  }

	  const hash = md5(patient.name + email + Date.now())
	  main(patient.name, email, hash).catch(console.error);

	  res.status(200).json({ msg: "ok. Email para alteração enviado com sucesso!" })
  }catch (error) {
    res.status(400).json(error)
  }
}
