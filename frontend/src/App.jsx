import { useState } from "react";
import "./App.css";

import Dashboard from "./paginas/Dashboard";
import Usuarios from "./paginas/Usuarios";
import Denuncias from "./paginas/Denuncias";
import Conteudos from "./paginas/Conteudos";
import Suporte from "./paginas/Suporte";
import Administradores from "./paginas/Administradores";
import Logs from "./paginas/Logs";

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

export default App;