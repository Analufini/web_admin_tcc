import { useEffect, useState } from "react";
import CardResumo from "../components/CardResumo";

const API = "http://localhost:3001/api";

function Dashboard() {
  const [mensagemApi, setMensagemApi] = useState("Testando conexão...");

  useEffect(() => {
    fetch(`${API}/teste`)
      .then((res) => res.json())
      .then((dados) => setMensagemApi(dados.mensagem))
      .catch(() => setMensagemApi("Não foi possível conectar com a API."));
  }, []);

  return (
    <>
      <div className="cabecalho-dashboard">
        <div>
          <h2>Olá, Giovanna! 👋</h2>
          <p>Aqui está o resumo da plataforma Orami.</p>
        </div>

        <button className="botao-periodo">Últimos 30 dias</button>
      </div>

      <div className="cards-topo-dashboard">
        <CardResumo titulo="Usuários" valor="12.845" detalhe="+8,2% vs. mês passado" icone="👥" />
        <CardResumo titulo="Denúncias" valor="23" detalhe="-12% vs. mês passado" icone="⚠️" />
        <CardResumo titulo="Chamados abertos" valor="24" detalhe="-6% vs. período anterior" icone="🎧" />
        <CardResumo titulo="Conteúdos publicados" valor="56" detalhe="+13% vs. período anterior" icone="📚" />
        <CardResumo titulo="Posts no fórum" valor="856" detalhe="+8,2% vs. mês passado" icone="💬" />
        <CardResumo titulo="Registros de crise" valor="324" detalhe="+4% vs. período anterior" icone="📈" />
      </div>

      <div className="painel-dashboard">
        <div className="bloco-dashboard">
          <div className="painel-titulo">
            <h3>Indicadores principais</h3>
            <button>Ver todos</button>
          </div>

          <div className="indicadores-grid">
            <MiniIndicador
              titulo="Acessos ao app"
              valor="32.985"
              variacao="+13,5%"
              grafico="▁▂▃▂▄▅▄▆▇█"
            />

            <MiniIndicador
              titulo="Registros de crise"
              valor="856"
              variacao="-4,1%"
              grafico="▁▂▂▃▄▃▅▆▇█"
            />

            <MiniIndicador
              titulo="Posts no fórum"
              valor="2.450"
              variacao="+4,4%"
              grafico="▁▁▂▃▃▄▅▆▇█"
            />

            <MiniIndicador
              titulo="Guias acessados"
              valor="5.732"
              variacao="+12,3%"
              grafico="▁▂▂▃▄▅▆▇▇█"
            />
          </div>
        </div>

        <div className="bloco-inferior-dashboard">
          <div className="lista-card">
            <div className="painel-titulo">
              <h3>Alertas importantes</h3>
              <button>Ver todos</button>
            </div>

            <ItemLista
              icone="⚠️"
              titulo="18 denúncias aguardando análise"
              subtitulo="Ver denúncias"
            />
            <ItemLista
              icone="🎧"
              titulo="24 chamados de suporte abertos"
              subtitulo="Ver chamados"
            />
            <ItemLista
              icone="📚"
              titulo="4 conteúdos em revisão"
              subtitulo="Ver conteúdos"
            />
            <ItemLista
              icone="✅"
              titulo="2 solicitações de verificação pendentes"
              subtitulo="Ver solicitações"
            />
          </div>

          <div className="lista-card">
            <div className="painel-titulo">
              <h3>Atividades recentes</h3>
              <button>Ver todos</button>
            </div>

            <ItemLista
              icone="👤"
              titulo="Novo usuário registrado"
              subtitulo="Maria Clara se cadastrou no app"
              tempo="1 min atrás"
            />
            <ItemLista
              icone="⚠️"
              titulo="Nova denúncia recebida"
              subtitulo="Comentário inadequado reportado"
              tempo="10 min atrás"
            />
            <ItemLista
              icone="📚"
              titulo="Conteúdo publicado"
              subtitulo="Guia: Alimentação seletiva"
              tempo="30 min atrás"
            />
            <ItemLista
              icone="🎧"
              titulo="Chamado atualizado"
              subtitulo="Solicitação respondida pela equipe"
              tempo="1 hora atrás"
            />
          </div>
        </div>

        <div className="status-api">
          <strong>Status da API:</strong> {mensagemApi}
        </div>
      </div>
    </>
  );
}

function MiniIndicador({ titulo, valor, variacao, grafico }) {
  return (
    <div className="mini-indicador">
      <p>{titulo}</p>
      <strong>{valor}</strong>
      <span>{variacao}</span>
      <div className="grafico-fake">{grafico}</div>
    </div>
  );
}

function ItemLista({ icone, titulo, subtitulo, tempo }) {
  return (
    <div className="item-lista-dashboard">
      <div className="icone-item-lista">{icone}</div>

      <div className="conteudo-item-lista">
        <strong>{titulo}</strong>
        <p>{subtitulo}</p>
      </div>

      {tempo && <span className="tempo-item-lista">{tempo}</span>}
    </div>
  );
}

export default Dashboard;