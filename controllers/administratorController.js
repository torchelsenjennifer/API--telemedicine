import { sequelize } from "../databases/conecta.js";
import { Administrator } from "../models/Administrator.js";
import bcrypt from 'bcrypt'
import { Log } from "../models/Log.js";

//validacao de padrao de senha
function validatePasswordAdministrator(password) {

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

//lista adm
export const administratorIndex = async (req, res) => {
  try {
    const administrator = await Administrator.findAll();
    res.status(200).json(administrator);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Cria adm
export const administratorCreate = async (req, res) => {
  const { name, role, email, password } = req.body;

  if (!name || !role || !email || !password) {
    res.status(400).json({
      id: 0,
      msg: "Erro...Informe os dados.",
    });
    return;
  }

  const mensaValidacao = validatePasswordAdministrator(password)
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao })
    return
  }

  try {
	const hasAdm = await Administrator.findOne({ where: { email } })
	if(hasAdm){
		return res.status(400).json({
			id: 0,
			msg: "Erro... Email cadastrado.",
		  });
	}
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

//aletra a senha do administrador
export const administratorAlterPassword = async (req, res) => {
	const { email, password, newPassword } = req.body

	if (!email || !password || !newPassword) {
	  res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
	  return
	}

	try {
	  const administrator = await Administrator.findOne({ where: { email } })

	 //se não encontrar o email
	  if (administrator == null) {
		res.status(400).json({ erro: "Erro... E-mail invalido" })
		return
	  }

	  const mensaValidacao = validatePasswordAdministrator(newPassword)
	  if (mensaValidacao.length >= 1) {
		res.status(400).json({ id: 0, msg: mensaValidacao })
		return
	  }

	  if (bcrypt.compareSync(password, administrator.password)) {

		// gera a criptografia da nova senha
		const salt = bcrypt.genSaltSync(12)
		const hash = bcrypt.hashSync(newPassword, salt)
		administrator.password = hash

		// salva a nova senha
		await administrator.save()

		res.status(200).json({ msg: "Ok. Senha do Administrador Alterada com Sucesso" })
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
