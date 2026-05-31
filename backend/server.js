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

/* =========================
   ADMINISTRADORES
========================= */

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

/* =========================
   USUÁRIOS
========================= */

let usuarios = [
  { id: 1, nome: "Ana Beatriz", tipo: "Cuidador", email: "ana@email.com", status: "Ativo", ultimoAcesso: "5 min atrás", cadastro: "12/04/2024" },
  { id: 2, nome: "João Ribeiro", tipo: "Profissional", email: "joao@email.com", status: "Ativo", ultimoAcesso: "27 min atrás", cadastro: "09/03/2024" },
  { id: 3, nome: "Maria Clara", tipo: "Responsável", email: "maria@email.com", status: "Ativo", ultimoAcesso: "1 dia atrás", cadastro: "18/02/2024" },
  { id: 4, nome: "Rafael Souza", tipo: "Cuidador", email: "rafael@email.com", status: "Suspenso", ultimoAcesso: "2 dias atrás", cadastro: "03/02/2024" }
];

app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

/* =========================
   CONTEÚDOS
========================= */

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

/* =========================
   DENÚNCIAS
========================= */

let denuncias = [
  {
    id: "DEN-001",
    tipo: "Post",
    motivo: "Comentário ofensivo",
    usuarioDenunciado: "Rafael Souza",
    prioridade: "Alta",
    status: "Pendente",
    data: "Hoje",
    detalhes: "Usuário denunciado por comentário ofensivo em uma comunidade."
  },
  {
    id: "DEN-002",
    tipo: "Comentário",
    motivo: "Spam",
    usuarioDenunciado: "João Marcos",
    prioridade: "Média",
    status: "Em análise",
    data: "Há 46 min",
    detalhes: "Comentário repetitivo enviado em várias publicações."
  },
  {
    id: "DEN-003",
    tipo: "Comunidade",
    motivo: "Desinformação",
    usuarioDenunciado: "Maria Clara",
    prioridade: "Média",
    status: "Pendente",
    data: "Há 1 hora",
    detalhes: "Comunidade denunciada por divulgar informações incorretas."
  },
  {
    id: "DEN-004",
    tipo: "Post",
    motivo: "Discurso de ódio",
    usuarioDenunciado: "Lucas Ferreira",
    prioridade: "Alta",
    status: "Resolvida",
    data: "Há 2 horas",
    detalhes: "Post removido após análise da equipe."
  },
  {
    id: "DEN-005",
    tipo: "Chat",
    motivo: "Assédio",
    usuarioDenunciado: "Juliana Lima",
    prioridade: "Alta",
    status: "Rejeitada",
    data: "Há 3 horas",
    detalhes: "Denúncia rejeitada por falta de evidências."
  }
];

app.get("/api/denuncias", (req, res) => {
  res.json(denuncias);
});

app.put("/api/denuncias/:id/status", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  denuncias = denuncias.map((denuncia) => {
    if (denuncia.id === id) {
      return { ...denuncia, status };
    }

    return denuncia;
  });

  res.json({
    mensagem: "Status da denúncia atualizado com sucesso."
  });
});

/* =========================
   SUPORTE
========================= */

let chamados = [
  {
    id: "SUP-001",
    usuario: "Ana Beatriz",
    assunto: "Não consigo fazer login",
    categoria: "Login",
    prioridade: "Alta",
    status: "Aberto",
    abertura: "Há 10 min",
    descricao: "Usuária relatou dificuldade para acessar a conta."
  },
  {
    id: "SUP-002",
    usuario: "João Marcos",
    assunto: "Erro ao enviar mensagem",
    categoria: "Comunidade",
    prioridade: "Média",
    status: "Em atendimento",
    abertura: "Há 1 hora",
    descricao: "Usuário informou erro ao tentar enviar mensagem em uma comunidade."
  },
  {
    id: "SUP-003",
    usuario: "Maria Clara",
    assunto: "Como editar meu perfil?",
    categoria: "Conta",
    prioridade: "Baixa",
    status: "Aguardando usuário",
    abertura: "Há 2 horas",
    descricao: "Usuária solicitou orientação sobre edição de dados pessoais."
  },
  {
    id: "SUP-004",
    usuario: "Lucas Ferreira",
    assunto: "Dúvida sobre guia",
    categoria: "Conteúdo",
    prioridade: "Baixa",
    status: "Resolvido",
    abertura: "Há 3 horas",
    descricao: "Chamado resolvido com orientação sobre conteúdo informativo."
  },
  {
    id: "SUP-005",
    usuario: "Rafael Souza",
    assunto: "Notificações não chegam",
    categoria: "Notificações",
    prioridade: "Média",
    status: "Aberto",
    abertura: "Há 5 horas",
    descricao: "Usuário relatou não receber notificações do aplicativo."
  }
];

app.get("/api/suporte", (req, res) => {
  res.json(chamados);
});

app.put("/api/suporte/:id/status", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  chamados = chamados.map((chamado) => {
    if (chamado.id === id) {
      return { ...chamado, status };
    }

    return chamado;
  });

  res.json({
    mensagem: "Status do chamado atualizado com sucesso."
  });
});

/* =========================
   LOGS
========================= */

let logs = [
  { id: 1, dataHora: "28/05/2024 16:35", administrador: "Gabriel Souza", acao: "Alterou permissões", modulo: "Administradores", detalhes: "Permissões de Ana Beatriz", ip: "191.36.0.15" },
  { id: 2, dataHora: "28/05/2024 14:12", administrador: "Yasmin Lima", acao: "Criou administrador", modulo: "Administradores", detalhes: "Novo admin: Felipe A.", ip: "191.36.0.22" },
  { id: 3, dataHora: "25/05/2024 13:02", administrador: "Ana Beatriz", acao: "Desativou administrador", modulo: "Administradores", detalhes: "Admin desativado: João M.", ip: "187.23.91" },
  { id: 4, dataHora: "28/05/2024 11:45", administrador: "Gabriel Souza", acao: "Redefiniu senha", modulo: "Usuários", detalhes: "Usuário Camila Dias", ip: "191.36.0.15" },
  { id: 5, dataHora: "28/05/2024 10:30", administrador: "Yasmin Lima", acao: "Suspendeu usuário", modulo: "Usuários", detalhes: "Usuário Rafael Souza", ip: "191.36.0.22" },
  { id: 6, dataHora: "28/05/2024 09:22", administrador: "Gabriel Souza", acao: "Removeu conteúdo", modulo: "Conteúdos", detalhes: "Conteúdo: Como lidar com crises", ip: "191.36.0.15" },
  { id: 7, dataHora: "28/05/2024 08:15", administrador: "Ana Beatriz", acao: "Resolveu denúncia", modulo: "Denúncias", detalhes: "Denúncia #DEN-8409", ip: "187.23.91" }
];

app.get("/api/logs", (req, res) => {
  res.json(logs);
});

/* =========================
   DASHBOARD
========================= */

app.get("/api/dashboard", (req, res) => {
  const usuariosAtivos = usuarios.filter((usuario) => usuario.status === "Ativo").length;
  const adminsAtivos = administradores.filter((admin) => admin.status === "Ativo").length;
  const conteudosPublicados = conteudos.filter((conteudo) => conteudo.status === "Publicado").length;
  const denunciasPendentes = denuncias.filter((denuncia) => denuncia.status === "Pendente").length;
  const chamadosAbertos = chamados.filter((chamado) => chamado.status === "Aberto").length;

  res.json({
    cards: {
      usuariosCadastrados: usuarios.length,
      usuariosAtivos,
      denunciasPendentes,
      chamadosAbertos,
      postsForum: 1245,
      conteudosPublicados,
      administradoresAtivos: adminsAtivos
    },
    indicadores: {
      acessosApp: 32985,
      registrosCrise: 856,
      postsForum: 2450,
      guiasAcessados: 5732
    },
    alertas: [
      `${denunciasPendentes} denúncias aguardando análise`,
      `${chamadosAbertos} chamados de suporte abertos`,
      "4 conteúdos em revisão",
      "2 solicitações de verificação pendentes"
    ],
    atividades: [
      {
        titulo: "Novo usuário registrado",
        descricao: "Maria Clara se cadastrou no app",
        tempo: "5 min atrás"
      },
      {
        titulo: "Nova denúncia recebida",
        descricao: "Comentário inadequado reportado",
        tempo: "10 min atrás"
      },
      {
        titulo: "Conteúdo publicado",
        descricao: "Guia de alimentação seletiva foi publicado",
        tempo: "32 min atrás"
      },
      {
        titulo: "Chamado atualizado",
        descricao: "Solicitação respondida pela equipe",
        tempo: "1 hora atrás"
      }
    ]
  });
});

/* =========================
   RELATÓRIOS
========================= */

app.get("/api/relatorios", (req, res) => {
  res.json({
    resumo: {
      usuarios: 12845,
      denuncias: 199,
      suporte: 130,
      conteudos: 284
    },

    crescimentoUsuarios: [
      { mes: "Jan", total: 1200 },
      { mes: "Fev", total: 1850 },
      { mes: "Mar", total: 2400 },
      { mes: "Abr", total: 3180 },
      { mes: "Mai", total: 4200 },
      { mes: "Jun", total: 5120 }
    ],

    denunciasPorStatus: [
      { status: "Pendentes", total: 23 },
      { status: "Em análise", total: 12 },
      { status: "Resolvidas", total: 156 },
      { status: "Rejeitadas", total: 8 }
    ],

    suportePorStatus: [
      { status: "Abertos", total: 24 },
      { status: "Em atendimento", total: 14 },
      { status: "Aguardando usuário", total: 7 },
      { status: "Resolvidos", total: 92 }
    ],

    conteudosMaisAcessados: [
      { titulo: "Como lidar com crises", acessos: 3540 },
      { titulo: "Comunicação não violenta", acessos: 2940 },
      { titulo: "Guia de direitos TEA", acessos: 1890 },
      { titulo: "Rotina e organização", acessos: 1432 }
    ]
  });
});

/* =========================
   INICIAR SERVIDOR
========================= */

app.listen(porta, () => {
  console.log(`API rodando em http://localhost:${porta}`);
});