import { sequelize } from "../databases/conecta.js";
import bcrypt from 'bcrypt'
import { Log } from "../models/Log.js";
import { Patient } from "../models/Patient.js";

//validacao da senha, ou seja, padrao estipulado para seguranca
function validatePassword(password) {

	const menssage = []

	if (password.length < 8) {
	  menssage.push(" Ops... Para a sua Segunrança a senha deve possuir, no minimo, 8 caracteres")
	}

	// contadores
	let small = 0
	let big = 0
	let number = 0
	let symbol = 0

	// percorre as letras da variavel senha
	for (const letra of password) {
	  // expressÃ£o regular
	  if ((/[a-z]/).test(letra)) {
		small++
	  }
	  else if ((/[A-Z]/).test(letra)) {
		big++
	  }
	  else if ((/[0-9]/).test(letra)) {
		number++
	  } else {
		symbol++
	  }
	}

	if (small == 0 || big == 0 || number == 0 || symbol == 0) {
		menssage.push("Ops... Para sua segurança a senha deve possuir letras minusculas, maiusculas, numeros e simbolos")
	}

	return menssage
}

//lista os pacientes
export const patientIndex = async (req, res) => {
  try {
    const patient = await Patient.findAll();
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).send(error);
  }
};

//cria um paciente
export const patientCreate = async (req, res) => {
  const { name, cpf, email, password } = req.body;

  if (!name || !cpf || !email || !password) {
    res.status(400).json({
      id: 0,
      msg: "Erro...Informe os dados.",
    });
    return;
  }

  const mensaValidacao = validatePassword(password)
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao })
    return
  }

  try {
	const hasPat = await Patient.findOne({ where: { email } })

	if(hasPat){
		return res.status(400).json({
			id: 0,
			msg: "Erro... Email cadastrado.",
		  });
	}

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

//ALTERAR SENHA DO PACIENTE
export const patientAlterPassword = async (req, res) => {
	const { email, password, newPassword } = req.body

	if (!email || !password || !newPassword) {
	  res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
	  return
	}

	try {
	  const patient = await Patient.findOne({ where: { email } })

	 //se não encontrar o email
	  if (patient == null) {
		res.status(400).json({ erro: "Erro... E-mail invalido" })
		return
	  }

	  const mensaValidacao = validatePassword(newPassword)
	  if (mensaValidacao.length >= 1) {
		res.status(400).json({ id: 0, msg: mensaValidacao })
		return
	  }

	  if (bcrypt.compareSync(password, patient.password)) {

		// gera a criptografia da nova senha
		const salt = bcrypt.genSaltSync(12)
		const hash = bcrypt.hashSync(newPassword, salt)
		patient.password = hash

		// salva a nova senha
		await patient.save()

		res.status(200).json({ msg: "Ok. Senha do Paciente Alterada com Sucesso" })
	  } else {

		// registra um log desta tentativa de troca de senha
		await Log.create({
		  descricao: "Tentativa de Alteracao de Senha",
		})

		res.status(400).json({ erro: "Ops... Erro... Senha Invalida!" })
	  }
	} catch (error) {
	  console.log(error);
	  res.status(400).json(error)
	}
}