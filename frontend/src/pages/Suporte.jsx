import { useEffect, useState } from "react";

const API = "http://localhost:3001/api";

function Suporte() {
  const [chamados, setChamados] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  useEffect(() => {
    carregarChamados();
  }, []);

  function carregarChamados() {
    fetch(`${API}/suporte`)
      .then((res) => res.json())
      .then((data) => setChamados(data));
  }

  function alterarStatus(id, novoStatus) {
    fetch(`${API}/suporte/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: novoStatus })
    })
      .then((res) => res.json())
      .then(() => {
        const listaAtualizada = chamados.map((chamado) => {
          if (chamado.id === id) {
            return { ...chamado, status: novoStatus };
          }

          return chamado;
        });

        setChamados(listaAtualizada);

        if (chamadoSelecionado?.id === id) {
          setChamadoSelecionado({
            ...chamadoSelecionado,
            status: novoStatus
          });
        }
      });
  }

  const chamadosFiltrados = chamados.filter((chamado) => {
    const textoBusca = busca.toLowerCase();

    const correspondeBusca =
      chamado.id.toLowerCase().includes(textoBusca) ||
      chamado.usuario.toLowerCase().includes(textoBusca) ||
      chamado.assunto.toLowerCase().includes(textoBusca) ||
      chamado.categoria.toLowerCase().includes(textoBusca);

    const correspondeStatus =
      statusFiltro === "Todos" || chamado.status === statusFiltro;

    return correspondeBusca && correspondeStatus;
  });

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>Suporte</h2>
          <p>Central de atendimento e acompanhamento dos chamados dos usuários.</p>
        </div>
      </div>

      <div className="cards-resumo">
        <CardResumo titulo="Abertos" valor={contarStatus(chamados, "Aberto")} icone="🎧" />
        <CardResumo titulo="Em atendimento" valor={contarStatus(chamados, "Em atendimento")} icone="💬" />
        <CardResumo titulo="Aguardando usuário" valor={contarStatus(chamados, "Aguardando usuário")} icone="⏳" />
        <CardResumo titulo="Resolvidos" valor={contarStatus(chamados, "Resolvido")} icone="✅" />
      </div>

      <div className={chamadoSelecionado ? "layout-usuarios com-detalhes" : "layout-usuarios"}>
        <div className="painel-grande">
          <div className="painel-titulo">
            <h3>Chamados de suporte</h3>

            <div className="grupo-filtros-tabela">
              <input
                type="text"
                placeholder="Pesquisar chamado..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />

              <select
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value)}
              >
                <option>Todos</option>
                <option>Aberto</option>
                <option>Em atendimento</option>
                <option>Aguardando usuário</option>
                <option>Resolvido</option>
              </select>
            </div>
          </div>

          <table className="tabela-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Assunto</th>
                <th>Usuário</th>
                <th>Categoria</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Abertura</th>
              </tr>
            </thead>

            <tbody>
              {chamadosFiltrados.map((chamado) => (
                <tr
                  key={chamado.id}
                  onClick={() => setChamadoSelecionado(chamado)}
                  className={chamadoSelecionado?.id === chamado.id ? "linha-selecionada" : ""}
                >
                  <td>{chamado.id}</td>
                  <td>{chamado.assunto}</td>
                  <td>{chamado.usuario}</td>
                  <td>{chamado.categoria}</td>
                  <td>
                    <span className={`badge ${classePrioridade(chamado.prioridade)}`}>
                      {chamado.prioridade}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${classeStatus(chamado.status)}`}>
                      {chamado.status}
                    </span>
                  </td>
                  <td>{chamado.abertura}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="rodape-tabela">
            Mostrando {chamadosFiltrados.length} de {chamados.length} chamados
          </div>
        </div>

        {chamadoSelecionado && (
          <div className="detalhes-usuario">
            <button className="fechar-detalhes" onClick={() => setChamadoSelecionado(null)}>
              ×
            </button>

            <div className="avatar-grande">?</div>

            <h3>{chamadoSelecionado.id}</h3>
            <p className="subtitulo-modal">{chamadoSelecionado.status}</p>

            <div className="info-detalhes">
              <strong>Usuário</strong>
              <span>{chamadoSelecionado.usuario}</span>

              <strong>Assunto</strong>
              <span>{chamadoSelecionado.assunto}</span>

              <strong>Categoria</strong>
              <span>{chamadoSelecionado.categoria}</span>

              <strong>Prioridade</strong>
              <span>{chamadoSelecionado.prioridade}</span>

              <strong>Descrição</strong>
              <span>{chamadoSelecionado.descricao}</span>
            </div>

            <button
              className="botao-modal"
              onClick={() => alterarStatus(chamadoSelecionado.id, "Aberto")}
            >
              Reabrir chamado
            </button>

            <button
              className="botao-modal"
              onClick={() => alterarStatus(chamadoSelecionado.id, "Em atendimento")}
            >
              Marcar em atendimento
            </button>

            <button
              className="botao-modal"
              onClick={() => alterarStatus(chamadoSelecionado.id, "Aguardando usuário")}
            >
              Aguardar usuário
            </button>

            <button
              className="botao-perigo"
              onClick={() => alterarStatus(chamadoSelecionado.id, "Resolvido")}
            >
              Encerrar chamado
            </button>
            
          </div>
        )}
      </div>
    </>
  );
}

function CardResumo({ titulo, valor, icone }) {
  return (
    <div className="card-resumo">
      <div className="icone-card">{icone}</div>

      <div>
        <p>{titulo}</p>
        <strong>{valor}</strong>
      </div>
    </div>
  );
}

function contarStatus(lista, status) {
  return lista.filter((item) => item.status === status).length;
}

function classeStatus(status) {
  if (status === "Aberto") return "inativo";
  if (status === "Em atendimento") return "aguardando";
  if (status === "Aguardando usuário") return "aguardando";
  if (status === "Resolvido") return "ativo";

  return "";
}

function classePrioridade(prioridade) {
  if (prioridade === "Alta") return "inativo";
  if (prioridade === "Média") return "aguardando";
  if (prioridade === "Baixa") return "ativo";

  return "";
}

export default Suporte;