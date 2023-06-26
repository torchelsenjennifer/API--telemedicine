import express from "express";
import cors from "cors";
import routes from "./routes.js";

import { sequelize } from "./databases/conecta.js";
import { Patient } from "./models/Patient.js";
import { Specialist } from "./models/Specialist.js";
import { Administrator } from "./models/Administrator.js";
import { Appointment } from "./models/Appointment.js";
import { Log } from "./models/Log.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

async function conecta_db() {
  try {
    await sequelize.authenticate();

    await Administrator.sync({alter: true});
    await Patient.sync();
    await Specialist.sync();
    await Appointment.sync();
	await Log.sync();

    console.log("Conexao com banco de dados realizada com sucesso");
  } catch (error) {
    console.error("Erro na conexao com o banco: ", error);
  }
}
conecta_db();

app.get("/", (req, res) => {
  res.send("API cascade of specialists for medical consultation");
});

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`);
});
