const express = require("express");
const cors = require("cors");

const app = express();
const porta = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Orami funcionando!");
});

app.get("/api/teste", (req, res) => {
  res.json({
    mensagem: "Conexão entre front e back funcionando!"
  });
});

app.listen(porta, () => {
  console.log(`API rodando em http://localhost:${porta}`);
});