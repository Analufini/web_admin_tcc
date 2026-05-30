import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3001/api";

function App() {
  const [pagina, setPagina] = useState("dashboard");
  const [menuAberto, setMenuAberto] = useState(true);

  return (
    <div className={`app ${menuAberto ? "menu-aberto" : "menu-fechado"}`}>
      <Sidebar
        pagina={pagina}
        setPagina={setPagina}
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
      />

      <main className="area-principal">
        <Topbar />

        <section className="conteudo">
          {pagina === "dashboard" && <Dashboard />}
          {pagina === "usuarios" && <Usuarios />}
          {pagina === "denuncias" && <Denuncias />}
          {pagina === "conteudos" && <Conteudos />}
          {pagina === "suporte" && <Suporte />}
          {pagina === "administradores" && <Administradores />}
          {pagina === "logs" && <Logs />}
        </section>
      </main>
    </div>
  );
}

function Sidebar({ pagina, setPagina, menuAberto, setMenuAberto }) {
  return (
    <aside className="sidebar">
      <div className="topo-sidebar">
        {menuAberto && (
          <div className="logo">
            <h1>orami</h1>
            <span>Painel de Controle</span>
          </div>
        )}

        <button className="botao-menu" onClick={() => setMenuAberto(!menuAberto)}>
          ☰
        </button>
      </div>

      <nav className="menu">
        {menuAberto && <p className="categoria">GERAL</p>}

        <BotaoMenu
          icone="🏠"
          texto="Dashboard"
          ativo={pagina === "dashboard"}
          menuAberto={menuAberto}
          onClick={() => setPagina("dashboard")}
        />

        {menuAberto && <p className="categoria">GERENCIAMENTO</p>}

        <BotaoMenu
          icone="👥"
          texto="Usuários"
          ativo={pagina === "usuarios"}
          menuAberto={menuAberto}
          onClick={() => setPagina("usuarios")}
        />

        <BotaoMenu
          icone="📚"
          texto="Conteúdos"
          ativo={pagina === "conteudos"}
          menuAberto={menuAberto}
          onClick={() => setPagina("conteudos")}
        />

        <BotaoMenu
          icone="🛡️"
          texto="Administradores"
          ativo={pagina === "administradores"}
          menuAberto={menuAberto}
          onClick={() => setPagina("administradores")}
        />

        {menuAberto && <p className="categoria">MODERAÇÃO</p>}

        <BotaoMenu
          icone="⚠️"
          texto="Denúncias"
          ativo={pagina === "denuncias"}
          menuAberto={menuAberto}
          onClick={() => setPagina("denuncias")}
        />

        <BotaoMenu
          icone="🎧"
          texto="Suporte"
          ativo={pagina === "suporte"}
          menuAberto={menuAberto}
          onClick={() => setPagina("suporte")}
        />

        {menuAberto && <p className="categoria">SISTEMA</p>}

        <BotaoMenu
          icone="📋"
          texto="Segurança e Logs"
          ativo={pagina === "logs"}
          menuAberto={menuAberto}
          onClick={() => setPagina("logs")}
        />
      </nav>

      <div className="usuario-logado">
        <div className="avatar">G</div>

        {menuAberto && (
          <div>
            <strong>Giovanna Torres</strong>
            <span>Administradora</span>
          </div>
        )}
      </div>
    </aside>
  );
}

function BotaoMenu({ icone, texto, ativo, menuAberto, onClick }) {
  return (
    <button className={`item-menu ${ativo ? "ativo" : ""}`} onClick={onClick}>
      <span className="icone-menu">{icone}</span>
      {menuAberto && <span>{texto}</span>}
    </button>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <input type="text" placeholder="Pesquisar no painel..." />

      <div className="acoes-topbar">
        <button>🔔</button>
        <button>👤</button>
      </div>
    </header>
  );
}

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

function CardResumo({ titulo, valor, detalhe, icone }) {
  return (
    <div className="card-resumo">
      <div className="icone-card">{icone}</div>
      <div>
        <p>{titulo}</p>
        <strong>{valor}</strong>
        <span>{detalhe}</span>
      </div>
    </div>
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

function Usuarios() {
  return (
    <PaginaSimples
      titulo="Usuários"
      descricao="Gerenciamento de usuários cadastrados na plataforma."
      cards={[
        ["Total de usuários", "12.845"],
        ["Usuários ativos", "11.902"],
        ["Bloqueados", "34"],
        ["Novos no mês", "428"],
      ]}
    />
  );
}

function Denuncias() {
  return (
    <PaginaSimples
      titulo="Denúncias"
      descricao="Análise e acompanhamento de denúncias feitas pelos usuários."
      cards={[
        ["Pendentes", "23"],
        ["Em análise", "12"],
        ["Resolvidas", "156"],
        ["Rejeitadas", "8"],
      ]}
    />
  );
}

function Conteudos() {
  return (
    <PaginaSimples
      titulo="Conteúdos Informativos"
      descricao="Controle de guias, artigos e materiais informativos."
      cards={[
        ["Publicados", "86"],
        ["Rascunhos", "12"],
        ["Em análise", "5"],
        ["Arquivados", "3"],
      ]}
    />
  );
}

function Suporte() {
  return (
    <PaginaSimples
      titulo="Suporte"
      descricao="Acompanhamento de chamados e solicitações dos usuários."
      cards={[
        ["Abertos", "14"],
        ["Em atendimento", "4"],
        ["Finalizados", "92"],
        ["Urgentes", "2"],
      ]}
    />
  );
}

function Administradores() {
  return (
    <PaginaSimples
      titulo="Administradores"
      descricao="Gerenciamento dos administradores e permissões do painel."
      cards={[
        ["Total", "16"],
        ["Ativos", "14"],
        ["Inativos", "2"],
        ["Último acesso médio", "2h 34m"],
      ]}
    />
  );
}

function Logs() {
  return (
    <PaginaSimples
      titulo="Segurança e Logs"
      descricao="Histórico das principais ações realizadas no painel."
      cards={[
        ["Ações hoje", "24"],
        ["Logins", "12"],
        ["Alterações", "8"],
        ["Alertas", "3"],
      ]}
    />
  );
}

function PaginaSimples({ titulo, descricao, cards }) {
  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
      </div>

      <div className="cards-resumo">
        {cards.map((card, index) => (
          <CardResumo
            key={index}
            titulo={card[0]}
            valor={card[1]}
            detalhe="Dados simulados"
            icone="●"
          />
        ))}
      </div>

      <div className="painel-grande">
        <div className="painel-titulo">
          <h3>{titulo}</h3>
          <button>Filtros</button>
        </div>

        <div className="placeholder-tabela">
          <p>Área reservada para tabela de {titulo.toLowerCase()}.</p>
          <span>Na próxima etapa vamos conectar esta página com dados da API fake.</span>
        </div>
      </div>
    </>
  );
}

export default App;