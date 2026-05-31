import { useEffect, useState } from "react";

const API = "http://localhost:3001/api";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    fetch(`${API}/usuarios`)
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setSelecionado(data[0]);
      });
  }, []);

  const filtrados = usuarios.filter(usuario => {
    const bateBusca =
      usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busca.toLowerCase());

    const bateTipo =
      tipoFiltro === "Todos" || usuario.tipo === tipoFiltro;

    const bateStatus =
      statusFiltro === "Todos" || usuario.status === statusFiltro;

    return bateBusca && bateTipo && bateStatus;
  });

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>Usuários</h2>
          <p>Gerencie os usuários cadastrados na plataforma.</p>
        </div>
      </div>

      <div className={`layout-usuarios ${selecionado ? "com-detalhes" : ""}`}>
        <div className="painel-grande">
          <div className="filtros-usuarios">
            <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)}>
              <option value="Todos">Tipo de usuário</option>
              <option value="Cuidador">Cuidador</option>
              <option value="Profissional">Profissional</option>
              <option value="Responsável">Responsável</option>
            </select>

            <select value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)}>
              <option value="Todos">Status</option>
              <option value="Ativo">Ativo</option>
              <option value="Suspenso">Suspenso</option>
            </select>

            <input
              placeholder="Buscar usuário..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>

          <table className="tabela-admin">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Tipo</th>
                <th>E-mail</th>
                <th>Status</th>
                <th>Último acesso</th>
                <th>Cadastro</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map(usuario => (
                <tr
                  key={usuario.id}
                  onClick={() => setSelecionado(usuario)}
                  className={selecionado?.id === usuario.id ? "linha-selecionada" : ""}
                >
                  <td>{usuario.nome}</td>
                  <td>{usuario.tipo}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`badge ${usuario.status === "Ativo" ? "ativo" : "inativo"}`}>
                      {usuario.status}
                    </span>
                  </td>
                  <td>{usuario.ultimoAcesso}</td>
                  <td>{usuario.cadastro}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="rodape-tabela">
            Mostrando {filtrados.length} de {usuarios.length} usuários
          </p>
        </div>

        {selecionado && (
          <aside className="detalhes-usuario">
            <button className="fechar-detalhes" onClick={() => setSelecionado(null)}>
              ×
            </button>

            <div className="avatar-grande">{selecionado.nome[0]}</div>

            <h3>{selecionado.nome}</h3>
            <p className="subtitulo-modal">
              {selecionado.tipo} • {selecionado.status}
            </p>

            <div className="abas-modal">
              <button className="aba-ativa">Detalhes</button>
              <button>Histórico</button>
              <button>Denúncias</button>
            </div>

            <div className="info-detalhes">
              <strong>E-mail</strong>
              <span>{selecionado.email}</span>

              <strong>Status</strong>
              <span>{selecionado.status}</span>

              <strong>Último acesso</strong>
              <span>{selecionado.ultimoAcesso}</span>

              <strong>Cadastro</strong>
              <span>{selecionado.cadastro}</span>
            </div>

            <button className="botao-modal">✏️ Editar usuário</button>
            <button className="botao-modal">⏸️ Suspender conta</button>
            <button className="botao-modal">🔒 Redefinir senha</button>
            <button className="botao-perigo">🗑️ Excluir conta</button>
          </aside>
        )}
      </div>
    </>
  );
}

export default Usuarios;