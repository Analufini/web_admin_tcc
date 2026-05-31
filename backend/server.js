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

let administradores = [
  { id: 1, nome: "Gabriel Souza", cargo: "Super Admin", email: "gabriel@orami.com", status: "Ativo", ultimoAcesso: "há 5 minutos" },
  { id: 2, nome: "Ana Beatriz", cargo: "Gerente", email: "ana@orami.com", status: "Ativo", ultimoAcesso: "há 18 minutos" },
  { id: 3, nome: "Rafael Martins", cargo: "Moderador", email: "rafael@orami.com", status: "Ativo", ultimoAcesso: "há 2 horas" },
  { id: 4, nome: "Yasmin Lima", cargo: "Moderador", email: "yasmin@orami.com", status: "Ativo", ultimoAcesso: "há 3 horas" },
  { id: 5, nome: "Juliana Alves", cargo: "Editor de Conteúdo", email: "juliana@orami.com", status: "Inativo", ultimoAcesso: "há 12 dias" }
];

app.get("/api/administradores", (req, res) => {
  res.json(administradores);
});

app.post("/api/administradores", (req, res) => {
  const novoAdmin = {
    id: administradores.length + 1,
    nome: req.body.nome,
    cargo: req.body.cargo,
    email: req.body.email,
    usuario: req.body.usuario || "",
    permissoes: req.body.permissoes || [],
    status: "Ativo",
    ultimoAcesso: "agora"
  };

  administradores.push(novoAdmin);
  res.status(201).json(novoAdmin);
});

let usuarios = [
  { id: 1, nome: "Ana Beatriz", tipo: "Cuidador", email: "ana@email.com", status: "Ativo", ultimoAcesso: "5 min atrás", cadastro: "12/04/2024" },
  { id: 2, nome: "João Ribeiro", tipo: "Profissional", email: "joao@email.com", status: "Ativo", ultimoAcesso: "27 min atrás", cadastro: "09/03/2024" },
  { id: 3, nome: "Maria Clara", tipo: "Responsável", email: "maria@email.com", status: "Ativo", ultimoAcesso: "1 dia atrás", cadastro: "18/02/2024" },
  { id: 4, nome: "Rafael Souza", tipo: "Cuidador", email: "rafael@email.com", status: "Suspenso", ultimoAcesso: "2 dias atrás", cadastro: "03/02/2024" }
];

app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

let conteudos = [
  { id: 1, titulo: "Como lidar com crises", categoria: "Crises", autor: "Gabriel Souza", visualizacoes: 3540, status: "Publicado", atualizado: "26/05/2024", local: "App Orami", documento: "", foto: "", audio: "" },
  { id: 2, titulo: "Comunicação não violenta", categoria: "Comunicação", autor: "Larissa Oliveira", visualizacoes: 2940, status: "Publicado", atualizado: "27/05/2024", local: "App Orami", documento: "", foto: "", audio: "" },
  { id: 3, titulo: "Guia de direitos TEA", categoria: "Direitos", autor: "Gabriel Souza", visualizacoes: 1890, status: "Aguardando aprovação", atualizado: "25/05/2024", local: "Site e App", documento: "", foto: "", audio: "" },
  { id: 4, titulo: "Rotina e organização", categoria: "Rotina", autor: "Larissa Oliveira", visualizacoes: 1432, status: "Rascunho", atualizado: "24/05/2024", local: "App Orami", documento: "", foto: "", audio: "" }
];

app.get("/api/conteudos", (req, res) => {
  res.json(conteudos);
});

app.post("/api/conteudos", (req, res) => {
  const novoConteudo = {
    id: conteudos.length + 1,
    titulo: req.body.titulo,
    categoria: req.body.categoria,
    descricao: req.body.descricao || "",
    autor: req.body.autor || "Felipe Almeida",
    visualizacoes: 0,
    status: req.body.status || "Rascunho",
    atualizado: new Date().toLocaleDateString("pt-BR"),
    local: req.body.local,
    documento: req.body.documento || "",
    foto: req.body.foto || "",
    audio: req.body.audio || ""
  };

  conteudos.push(novoConteudo);
  res.status(201).json(novoConteudo);
});

app.listen(porta, () => {
  console.log(`API rodando em http://localhost:${porta}`);
});

let logs = [
  { id: 1, dataHora: "28/05/2024 16:35", administrador: "Gabriel Souza", acao: "Alterou permissões", modulo: "Administradores", detalhes: "Permissões de Ana Beatriz", ip: "191.36.0.15" },
  { id: 2, dataHora: "28/05/2024 14:12", administrador: "Yasmin Lima", acao: "Criou administrador", modulo: "Administradores", detalhes: "Novo admin: Felipe A.", ip: "191.34.0.22" },
  { id: 3, dataHora: "25/05/2024 13:02", administrador: "Ana Beatriz", acao: "Desativou administrador", modulo: "Administradores", detalhes: "Admin desativado: João M.", ip: "187.23.91" },
  { id: 4, dataHora: "28/05/2024 11:45", administrador: "Gabriel Souza", acao: "Redefiniu senha", modulo: "Usuários", detalhes: "Usuário Camila Dias", ip: "191.36.0.15" },
  { id: 5, dataHora: "28/05/2024 10:30", administrador: "Yasmin Lima", acao: "Suspendeu usuário", modulo: "Usuários", detalhes: "Usuário Rafael Souza", ip: "191.36.0.22" },
  { id: 6, dataHora: "28/05/2024 09:22", administrador: "Gabriel Souza", acao: "Removeu conteúdo", modulo: "Conteúdos", detalhes: "Conteúdo: Como lidar com crises", ip: "191.36.0.15" },
  { id: 7, dataHora: "28/05/2024 08:15", administrador: "Ana Beatriz", acao: "Resolveu denúncia", modulo: "Denúncias", detalhes: "Denúncia #DEN-8409", ip: "187.23.91" }
];

app.get("/api/logs", (req, res) => {
  res.json(logs);
});