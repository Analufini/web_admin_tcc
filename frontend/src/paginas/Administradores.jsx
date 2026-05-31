import { useEffect, useState } from "react";

const API = "http://localhost:3001/api";

function Administradores() {
  const [tela, setTela] = useState("lista");
  const [admins, setAdmins] = useState([]);
  const [busca, setBusca] = useState("");

  const [novoAdmin, setNovoAdmin] = useState({
    nome: "",
    email: "",
    usuario: "",
    senha: "",
    cargo: "",
    permissoes: []
  });

  useEffect(() => {
    carregarAdmins();
  }, []);

  function carregarAdmins() {
    fetch(`${API}/administradores`)
      .then(res => res.json())
      .then(data => setAdmins(data))
      .catch(() => setAdmins([]));
  }

  function criarAdmin(e) {
    e.preventDefault();

    fetch(`${API}/administradores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAdmin)
    })
      .then(res => res.json())
      .then(() => {
        setNovoAdmin({
          nome: "",
          email: "",
          usuario: "",
          senha: "",
          cargo: "",
          permissoes: []
        });

        carregarAdmins();
        setTela("lista");
      });
  }

  function alterarPermissao(permissao) {
    if (novoAdmin.permissoes.includes(permissao)) {
      setNovoAdmin({
        ...novoAdmin,
        permissoes: novoAdmin.permissoes.filter(p => p !== permissao)
      });
    } else {
      setNovoAdmin({
        ...novoAdmin,
        permissoes: [...novoAdmin.permissoes, permissao]
      });
    }
  }

  const adminsFiltrados = admins.filter(admin =>
    admin.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const ativos = admins.filter(a => a.status === "Ativo").length;
  const inativos = admins.filter(a => a.status === "Inativo").length;

  if (tela === "novo") {
    return (
      <>
        <div className="breadcrumb">Administradores &gt; Novo administrador</div>

        <div className="cabecalho-pagina">
          <div>
            <h2>Novo administrador</h2>
            <p>Preencha os dados para criar um novo administrador.</p>
          </div>
        </div>

        <form className="grid-form-admin" onSubmit={criarAdmin}>
          <div className="painel-grande">
            <h3>Informações básicas</h3>

            <label>Nome completo</label>
            <input
              placeholder="Digite o nome completo"
              value={novoAdmin.nome}
              onChange={e => setNovoAdmin({ ...novoAdmin, nome: e.target.value })}
              required
            />

            <label>E-mail</label>
            <input
              placeholder="exemplo@orami.com"
              value={novoAdmin.email}
              onChange={e => setNovoAdmin({ ...novoAdmin, email: e.target.value })}
              required
            />

            <label>Nome de usuário</label>
            <input
              placeholder="Digite o nome de usuário"
              value={novoAdmin.usuario}
              onChange={e => setNovoAdmin({ ...novoAdmin, usuario: e.target.value })}
            />

            <label>Senha temporária</label>
            <input
              placeholder="Digite uma senha ou gere automaticamente"
              value={novoAdmin.senha}
              onChange={e => setNovoAdmin({ ...novoAdmin, senha: e.target.value })}
            />

            <label className="checkbox-linha">
              <input type="checkbox" />
              Enviar e-mail com instruções de acesso
            </label>
          </div>

          <div className="painel-grande">
            <h3>Cargo e permissões</h3>

            <label>Cargo</label>
            <select
              value={novoAdmin.cargo}
              onChange={e => setNovoAdmin({ ...novoAdmin, cargo: e.target.value })}
              required
            >
              <option value="">Selecione o cargo</option>
              <option>Super Admin</option>
              <option>Gerente</option>
              <option>Moderador</option>
              <option>Editor de Conteúdo</option>
              <option>Suporte</option>
            </select>

            <label>Permissões</label>

            {[
              "Acesso total ao painel",
              "Gerenciar usuários",
              "Gerenciar conteúdos",
              "Gerenciar denúncias",
              "Acessar relatórios",
              "Configurações do sistema"
            ].map(permissao => (
              <label className="permissao" key={permissao}>
                <input
                  type="checkbox"
                  checked={novoAdmin.permissoes.includes(permissao)}
                  onChange={() => alterarPermissao(permissao)}
                />
                {permissao}
              </label>
            ))}
          </div>

          <div className="acoes-form-admin">
            <button type="button" onClick={() => setTela("lista")} className="botao-secundario">
              Cancelar
            </button>

            <button className="botao-roxo">
              Criar administrador
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>Administradores</h2>
          <p>Gerencie os administradores e permissões de acesso ao painel.</p>
        </div>

        <button className="botao-roxo" onClick={() => setTela("novo")}>
          + Novo administrador
        </button>
      </div>

      <div className="cards-resumo">
        <CardAdmin titulo="Total de administradores" valor={admins.length} detalhe="+2 este mês" />
        <CardAdmin titulo="Administradores ativos" valor={ativos} detalhe="87% do total" />
        <CardAdmin titulo="Administradores inativos" valor={inativos} detalhe="13% do total" />
        <CardAdmin titulo="Último acesso médio" valor="2h 34m" detalhe="há 1 dia" />
      </div>

      <div className="painel-grande">
        <div className="barra-filtros">
          <input
            placeholder="Buscar administrador..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />

          <button>Filtros</button>
        </div>

        <table className="tabela-admin">
          <thead>
            <tr>
              <th>Administrador</th>
              <th>Cargo</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Último acesso</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {adminsFiltrados.map(admin => (
              <tr key={admin.id}>
                <td>{admin.nome}</td>
                <td>{admin.cargo}</td>
                <td>{admin.email}</td>
                <td>
                  <span className={`badge ${admin.status === "Ativo" ? "ativo" : "inativo"}`}>
                    {admin.status}
                  </span>
                </td>
                <td>{admin.ultimoAcesso}</td>
                <td>
                  <button className="botao-acao">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="rodape-tabela">
          Mostrando {adminsFiltrados.length} de {admins.length} administradores
        </p>
      </div>
    </>
  );
}

function CardAdmin({ titulo, valor, detalhe }) {
  return (
    <div className="card-resumo">
      <div className="icone-card">👥</div>
      <div>
        <p>{titulo}</p>
        <strong>{valor}</strong>
        <span>{detalhe}</span>
      </div>
    </div>
  );
}

export default Administradores;