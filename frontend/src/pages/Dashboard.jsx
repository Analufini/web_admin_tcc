import { useState } from "react";

function Dashboard({ setPagina }) {
  const [periodo, setPeriodo] = useState("Últimos 7 dias");
  const [mensagemAcao, setMensagemAcao] = useState("");

  const dadosPorPeriodo = {
  "Últimos 7 dias": {
    cards: {
      usuariosCadastrados: 8,
      usuariosAtivos: 6,
      denunciasPendentes: 2,
      chamadosAbertos: 2,
      postsForum: 13,
      conteudosPublicados: 1
    },
    detalhes: {
      usuariosCadastrados: "+3 usuários na semana",
      usuariosAtivos: "6 usuários ativos recentemente",
      denunciasPendentes: "2 denúncias aguardando análise",
      chamadosAbertos: "2 chamados aguardando atendimento",
      postsForum: "13 publicações recentes",
      conteudosPublicados: "1 conteúdo publicado"
    },
    indicadores: {
      acessosApp: 74,
      registrosCrise: 9,
      postsForum: 13,
      guiasAcessados: 28
    },
    variacoes: {
      acessosApp: "+6,2%",
      registrosCrise: "-2,4%",
      postsForum: "+3,4%",
      guiasAcessados: "+7,1%"
    },
    alertas: [
      "2 denúncias aguardando análise",
      "2 chamados de suporte abertos",
      "1 conteúdo em revisão",
      "1 solicitação de verificação pendente"
    ],
    atividades: [
      {
        titulo: "Novo usuário registrado",
        descricao: "Um responsável concluiu o cadastro no app",
        tempo: "5 min atrás"
      },
      {
        titulo: "Nova denúncia recebida",
        descricao: "Comentário inadequado reportado",
        tempo: "10 min atrás"
      },
      {
        titulo: "Chamado atualizado",
        descricao: "Solicitação respondida pela equipe",
        tempo: "1 hora atrás"
      }
    ]
  },

  "Últimos 30 dias": {
    cards: {
      usuariosCadastrados: 42,
      usuariosAtivos: 31,
      denunciasPendentes: 5,
      chamadosAbertos: 4,
      postsForum: 58,
      conteudosPublicados: 7
    },
    detalhes: {
      usuariosCadastrados: "+12 usuários no mês",
      usuariosAtivos: "31 usuários ativos no período",
      denunciasPendentes: "5 denúncias exigem análise",
      chamadosAbertos: "4 chamados aguardando atendimento",
      postsForum: "58 interações no fórum",
      conteudosPublicados: "7 conteúdos publicados"
    },
    indicadores: {
      acessosApp: 386,
      registrosCrise: 34,
      postsForum: 58,
      guiasAcessados: 126
    },
    variacoes: {
      acessosApp: "+13,5%",
      registrosCrise: "-4,1%",
      postsForum: "+4,4%",
      guiasAcessados: "+12,3%"
    },
    alertas: [
      "5 denúncias aguardando análise",
      "4 chamados de suporte abertos",
      "2 conteúdos em revisão",
      "1 solicitação de verificação pendente"
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
  },

  "Últimos 12 meses": {
    cards: {
      usuariosCadastrados: 186,
      usuariosAtivos: 139,
      denunciasPendentes: 12,
      chamadosAbertos: 9,
      postsForum: 312,
      conteudosPublicados: 28
    },
    detalhes: {
      usuariosCadastrados: "+96 usuários no ano",
      usuariosAtivos: "139 usuários ativos no período",
      denunciasPendentes: "12 denúncias ainda pendentes",
      chamadosAbertos: "9 chamados em aberto",
      postsForum: "312 publicações no fórum",
      conteudosPublicados: "28 conteúdos publicados"
    },
    indicadores: {
      acessosApp: 2840,
      registrosCrise: 218,
      postsForum: 312,
      guiasAcessados: 870
    },
    variacoes: {
      acessosApp: "+22,5%",
      registrosCrise: "+8,7%",
      postsForum: "+18,6%",
      guiasAcessados: "+19,3%"
    },
    alertas: [
      "12 denúncias aguardando análise",
      "9 chamados de suporte abertos",
      "5 conteúdos em revisão",
      "3 solicitações de verificação pendentes"
    ],
    atividades: [
      {
        titulo: "Crescimento de usuários",
        descricao: "A plataforma teve aumento gradual de cadastros",
        tempo: "Resumo anual"
      },
      {
        titulo: "Maior uso dos guias",
        descricao: "Guias de rotina e crise tiveram mais acessos",
        tempo: "Resumo anual"
      },
      {
        titulo: "Fórum mais ativo",
        descricao: "Comunidades tiveram aumento de publicações",
        tempo: "Resumo anual"
      },
      {
        titulo: "Suporte monitorado",
        descricao: "Chamados foram acompanhados pela equipe administrativa",
        tempo: "Resumo anual"
      }
    ]
  }
};

  const dados = dadosPorPeriodo[periodo];

  function trocarPeriodo() {
  if (periodo === "Últimos 7 dias") {
    setPeriodo("Últimos 30 dias");
    setMensagemAcao("Dados atualizados para os últimos 30 dias.");
  } else if (periodo === "Últimos 30 dias") {
    setPeriodo("Últimos 12 meses");
    setMensagemAcao("Dados atualizados para os últimos 12 meses.");
  } else {
    setPeriodo("Últimos 7 dias");
    setMensagemAcao("Dados atualizados para os últimos 7 dias.");
  }
}

  function navegarPara(pagina, mensagem) {
    if (setPagina) {
      setPagina(pagina);
    }

    if (mensagem) {
      setMensagemAcao(mensagem);
    }
  }

  function mostrarMensagem(mensagem) {
    setMensagemAcao(mensagem);
  }

  return (
    <>
      <div className="cabecalho-dashboard">
        <div>
          <h2>Olá, Ana! 👋</h2>
          <p>Aqui está o resumo geral da plataforma Orami.</p>
        </div>

        <button className="botao-periodo" onClick={trocarPeriodo}>
          {periodo}
        </button>
      </div>

      {mensagemAcao && (
        <div className="mensagem-acao-dashboard">
          <span>{mensagemAcao}</span>
          <button onClick={() => setMensagemAcao("")}>×</button>
        </div>
      )}

      <div className="cards-topo-dashboard">
        <CardDashboard
          icone="👥"
          titulo="Usuários cadastrados"
          valor={formatarNumero(dados.cards.usuariosCadastrados)}
          detalhe={dados.detalhes.usuariosCadastrados}
          onClick={() => navegarPara("usuarios")}
        />

        <CardDashboard
          icone="✅"
          titulo="Usuários ativos"
          valor={formatarNumero(dados.cards.usuariosAtivos)}
          detalhe={dados.detalhes.usuariosAtivos}
          onClick={() => navegarPara("usuarios")}
        />

        <CardDashboard
          icone="⚠️"
          titulo="Denúncias pendentes"
          valor={dados.cards.denunciasPendentes}
          detalhe={dados.detalhes.denunciasPendentes}
          onClick={() => navegarPara("denuncias")}
        />

        <CardDashboard
          icone="🎧"
          titulo="Chamados abertos"
          valor={dados.cards.chamadosAbertos}
          detalhe={dados.detalhes.chamadosAbertos}
          onClick={() => navegarPara("suporte")}
        />

        <CardDashboard
          icone="💬"
          titulo="Posts no Fórum"
          valor={formatarNumero(dados.cards.postsForum)}
          detalhe={dados.detalhes.postsForum}
          onClick={() => mostrarMensagem("A página de Fóruns e Comunidades ficará para uma próxima etapa.")}
        />

        <CardDashboard
          icone="📚"
          titulo="Conteúdos publicados"
          valor={dados.cards.conteudosPublicados}
          detalhe={dados.detalhes.conteudosPublicados}
          onClick={() => navegarPara("conteudos")}
        />
      </div>

      <div className="painel-dashboard">
        <div className="bloco-dashboard">
          <div className="painel-titulo">
            <h3>Indicadores principais</h3>
            <button onClick={() => navegarPara("relatorios")}>
              Ver todos
            </button>
          </div>

          <div className="indicadores-grid">
            <MiniIndicador
              titulo="Acessos ao app"
              valor={formatarNumero(dados.indicadores.acessosApp)}
              variacao={dados.variacoes.acessosApp}
              grafico="▁▂▃▂▄▅▄▆▇█"
              onClick={() => navegarPara("relatorios")}
            />

            <MiniIndicador
              titulo="Registros de crise"
              valor={formatarNumero(dados.indicadores.registrosCrise)}
              variacao={dados.variacoes.registrosCrise}
              grafico="▁▂▂▃▄▃▅▆▇█"
              onClick={() => navegarPara("relatorios")}
            />

            <MiniIndicador
              titulo="Posts no fórum"
              valor={formatarNumero(dados.indicadores.postsForum)}
              variacao={dados.variacoes.postsForum}
              grafico="▁▁▂▃▃▄▅▆▇█"
              onClick={() => navegarPara("relatorios")}
            />

            <MiniIndicador
              titulo="Guias acessados"
              valor={formatarNumero(dados.indicadores.guiasAcessados)}
              variacao={dados.variacoes.guiasAcessados}
              grafico="▁▂▂▃▄▅▆▇▇█"
              onClick={() => navegarPara("relatorios")}
            />
          </div>
        </div>

        <div className="bloco-inferior-dashboard">
          <div className="lista-card">
            <div className="painel-titulo">
              <h3>Alertas importantes</h3>
              <button onClick={() => navegarPara("logs")}>Ver todos</button>
            </div>

            {dados.alertas.map((alerta, index) => (
              <ItemLista
                key={index}
                icone={index === 0 ? "⚠️" : index === 1 ? "🎧" : index === 2 ? "📚" : "✅"}
                titulo={alerta}
                subtitulo="Clique para abrir a área relacionada"
                onClick={() => {
                  if (index === 0) navegarPara("denuncias");
                  else if (index === 1) navegarPara("suporte");
                  else if (index === 2) navegarPara("conteudos");
                  else mostrarMensagem("Solicitações de verificação ficarão para uma próxima etapa.");
                }}
              />
            ))}
          </div>

          <div className="lista-card">
            <div className="painel-titulo">
              <h3>Atividades recentes</h3>
              <button onClick={() => navegarPara("logs")}>Ver todas</button>
            </div>

            {dados.atividades.map((atividade, index) => (
              <ItemLista
                key={index}
                icone={index === 0 ? "👤" : index === 1 ? "⚠️" : index === 2 ? "📚" : "🎧"}
                titulo={atividade.titulo}
                subtitulo={atividade.descricao}
                tempo={atividade.tempo}
                onClick={() => {
                  if (index === 0) navegarPara("usuarios");
                  else if (index === 1) navegarPara("denuncias");
                  else if (index === 2) navegarPara("conteudos");
                  else if (index === 3) navegarPara("suporte");
                }}
              />
            ))}
          </div>
        </div>

        <div className="bloco-dashboard">
          <div className="painel-titulo">
            <h3>Ações rápidas</h3>
            <button onClick={() => mostrarMensagem("Escolha uma das ações rápidas abaixo.")}>
              Gerenciar
            </button>
          </div>

          <div className="acoes-rapidas-dashboard">
            <button onClick={() => navegarPara("conteudos")}>📚 Criar conteúdo</button>
            <button onClick={() => navegarPara("denuncias")}>⚠️ Revisar denúncias</button>
            <button onClick={() => navegarPara("suporte")}>🎧 Ver suporte</button>
            <button onClick={() => navegarPara("administradores")}>🛡️ Gerenciar admins</button>
          </div>
        </div>
      </div>
    </>
  );
}

function CardDashboard({ icone, titulo, valor, detalhe, onClick }) {
  return (
    <button className="card-resumo card-clicavel" onClick={onClick}>
      <div className="icone-card">{icone}</div>

      <div>
        <p>{titulo}</p>
        <strong>{valor}</strong>
        <span>{detalhe}</span>
      </div>
    </button>
  );
}

function MiniIndicador({ titulo, valor, variacao, grafico, onClick }) {
  return (
    <button className="mini-indicador mini-indicador-clicavel" onClick={onClick}>
      <p>{titulo}</p>
      <strong>{valor}</strong>
      <span>{variacao}</span>
      <div className="grafico-fake">{grafico}</div>
    </button>
  );
}

function ItemLista({ icone, titulo, subtitulo, tempo, onClick }) {
  return (
    <button className="item-lista-dashboard item-lista-clicavel" onClick={onClick}>
      <div className="icone-item-lista">{icone}</div>

      <div className="conteudo-item-lista">
        <strong>{titulo}</strong>
        <p>{subtitulo}</p>
      </div>

      {tempo && <span className="tempo-item-lista">{tempo}</span>}
    </button>
  );
}

function formatarNumero(numero) {
  return Number(numero).toLocaleString("pt-BR");
}

export default Dashboard;