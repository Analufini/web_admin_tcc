import { useState } from "react";
import "./App.css";

import {
  Home,
  LayoutDashboard,
  Users,
  ShieldCheck,
  TriangleAlert,
  MessageCircle,
  BookOpen,
  Headphones,
  BarChart3,
  FileClock,
  Settings,
  Menu,
  Bell,
  UserCircle,
  ChevronDown,
  Search
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Denuncias from "./pages/Denuncias";
import Conteudos from "./pages/Conteudos";
import Suporte from "./pages/Suporte";
import Administradores from "./pages/Administradores";
import Relatorios from "./pages/Relatorios";
import Logs from "./pages/Logs";

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
          {pagina === "dashboard" && <Dashboard setPagina={setPagina} />}
          {pagina === "usuarios" && <Usuarios />}
          {pagina === "denuncias" && <Denuncias />}
          {pagina === "conteudos" && <Conteudos />}
          {pagina === "suporte" && <Suporte />}
          {pagina === "administradores" && <Administradores />}
          {pagina === "relatorios" && <Relatorios setPagina={setPagina} />}
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
          </div>
        )}

        <button className="botao-menu" onClick={() => setMenuAberto(!menuAberto)}>
          <Menu size={22} />
        </button>
      </div>

      <nav className="menu">
        {menuAberto && <p className="categoria">GERAL</p>}

        <BotaoMenu
          icone={<Home size={19} />}
          texto="Início"
          ativo={pagina === "dashboard"}
          menuAberto={menuAberto}
          onClick={() => setPagina("dashboard")}
        />

        <BotaoMenu
          icone={<LayoutDashboard size={19} />}
          texto="Dashboard"
          ativo={pagina === "dashboard"}
          menuAberto={menuAberto}
          onClick={() => setPagina("dashboard")}
        />

        {menuAberto && <p className="categoria">GERENCIAMENTO</p>}

        <BotaoMenu
          icone={<Users size={19} />}
          texto="Usuários"
          ativo={pagina === "usuarios"}
          menuAberto={menuAberto}
          onClick={() => setPagina("usuarios")}
        />

        <BotaoMenu
          icone={<ShieldCheck size={19} />}
          texto="Administradores"
          ativo={pagina === "administradores"}
          menuAberto={menuAberto}
          onClick={() => setPagina("administradores")}
        />

        <BotaoMenu
          icone={<TriangleAlert size={19} />}
          texto="Denúncias"
          ativo={pagina === "denuncias"}
          menuAberto={menuAberto}
          onClick={() => setPagina("denuncias")}
        />

        <BotaoMenu
          icone={<BookOpen size={19} />}
          texto="Conteúdos Informativos"
          ativo={pagina === "conteudos"}
          menuAberto={menuAberto}
          onClick={() => setPagina("conteudos")}
        />

        <BotaoMenu
          icone={<Headphones size={19} />}
          texto="Suporte"
          ativo={pagina === "suporte"}
          menuAberto={menuAberto}
          onClick={() => setPagina("suporte")}
        />

        {menuAberto && <p className="categoria">RELATÓRIOS</p>}

        <BotaoMenu
          icone={<BarChart3 size={19} />}
          texto="Relatórios"
          ativo={pagina === "relatorios"}
          menuAberto={menuAberto}
          onClick={() => setPagina("relatorios")}
        />

        {menuAberto && <p className="categoria">SISTEMA</p>}

        <BotaoMenu
          icone={<FileClock size={19} />}
          texto="Segurança e Logs"
          ativo={pagina === "logs"}
          menuAberto={menuAberto}
          onClick={() => setPagina("logs")}
        />

        <BotaoMenu
          icone={<Settings size={19} />}
          texto="Configurações"
          ativo={false}
          menuAberto={menuAberto}
          onClick={() => alert("Configurações ficarão para uma próxima etapa.")}
        />
      </nav>
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
  const [perfilAberto, setPerfilAberto] = useState(false);

  return (
    <header className="topbar">
      <div className="campo-busca">
        <Search size={18} />
        <input type="text" placeholder="Buscar no painel..." />
      </div>

      <div className="acoes-topbar">
        <button className="botao-topbar">
          <Bell size={20} />
        </button>

        <div className="perfil-topbar">
          <button
            className="botao-perfil"
            onClick={() => setPerfilAberto(!perfilAberto)}
          >
            <UserCircle size={25} />
            <ChevronDown size={16} />
          </button>

          {perfilAberto && (
            <div className="dropdown-perfil">
              <div className="perfil-cabecalho">
                <UserCircle size={42} />
                <div>
                  <strong>Ana Luiza</strong>
                  <span>Administradora</span>
                </div>
              </div>

              <div className="perfil-info">
                <p>
                  <strong>E-mail:</strong> ana.luiza@orami.com
                </p>
                <p>
                  <strong>Cargo:</strong> Administradora
                </p>
                <p>
                  <strong>Status:</strong> Ativa
                </p>
              </div>

              <button className="botao-sair">Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default App;