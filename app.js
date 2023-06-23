import express from "express";
import cors from "cors";
import routes from "./routes.js";

import { sequelize } from "./databases/conecta.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

async function conecta_db() {
  try {
    await sequelize.authenticate();
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