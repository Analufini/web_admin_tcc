import { useEffect, useState } from "react";

const API = "http://localhost:3001/api";

function Denuncias() {
  const [denuncias, setDenuncias] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [denunciaSelecionada, setDenunciaSelecionada] = useState(null);

  useEffect(() => {
    carregarDenuncias();
  }, []);

  function carregarDenuncias() {
    fetch(`${API}/denuncias`)
      .then((res) => res.json())
      .then((data) => setDenuncias(data));
  }

  function alterarStatus(id, novoStatus) {
    fetch(`${API}/denuncias/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: novoStatus })
    })
      .then((res) => res.json())
      .then(() => {
        const listaAtualizada = denuncias.map((denuncia) => {
          if (denuncia.id === id) {
            return { ...denuncia, status: novoStatus };
          }

          return denuncia;
        });

        setDenuncias(listaAtualizada);

        if (denunciaSelecionada?.id === id) {
          setDenunciaSelecionada({
            ...denunciaSelecionada,
            status: novoStatus
          });
        }
      });
  }

  const denunciasFiltradas = denuncias.filter((denuncia) => {
    const textoBusca = busca.toLowerCase();

    const correspondeBusca =
      denuncia.id.toLowerCase().includes(textoBusca) ||
      denuncia.motivo.toLowerCase().includes(textoBusca) ||
      denuncia.usuarioDenunciado.toLowerCase().includes(textoBusca) ||
      denuncia.tipo.toLowerCase().includes(textoBusca);

    const correspondeStatus =
      statusFiltro === "Todos" || denuncia.status === statusFiltro;

    return correspondeBusca && correspondeStatus;
  });

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>Denúncias</h2>
          <p>Análise, acompanhamento e tratamento de denúncias feitas pelos usuários.</p>
        </div>
      </div>

      <div className="cards-resumo">
        <CardResumo titulo="Pendentes" valor={contarStatus(denuncias, "Pendente")} icone="⚠️" />
        <CardResumo titulo="Em análise" valor={contarStatus(denuncias, "Em análise")} icone="🔎" />
        <CardResumo titulo="Resolvidas" valor={contarStatus(denuncias, "Resolvida")} icone="✅" />
        <CardResumo titulo="Rejeitadas" valor={contarStatus(denuncias, "Rejeitada")} icone="❌" />
      </div>

      <div className={denunciaSelecionada ? "layout-usuarios com-detalhes" : "layout-usuarios"}>
        <div className="painel-grande">
          <div className="painel-titulo">
            <h3>Lista de denúncias</h3>

            <div className="grupo-filtros-tabela">
              <input
                type="text"
                placeholder="Pesquisar denúncia..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />

              <select
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value)}
              >
                <option>Todos</option>
                <option>Pendente</option>
                <option>Em análise</option>
                <option>Resolvida</option>
                <option>Rejeitada</option>
              </select>
            </div>
          </div>

          <table className="tabela-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Motivo</th>
                <th>Denunciado</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {denunciasFiltradas.map((denuncia) => (
                <tr
                  key={denuncia.id}
                  onClick={() => setDenunciaSelecionada(denuncia)}
                  className={denunciaSelecionada?.id === denuncia.id ? "linha-selecionada" : ""}
                >
                  <td>{denuncia.id}</td>
                  <td>{denuncia.tipo}</td>
                  <td>{denuncia.motivo}</td>
                  <td>{denuncia.usuarioDenunciado}</td>
                  <td>
                    <span className={`badge ${classePrioridade(denuncia.prioridade)}`}>
                      {denuncia.prioridade}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${classeStatus(denuncia.status)}`}>
                      {denuncia.status}
                    </span>
                  </td>
                  <td>{denuncia.data}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="rodape-tabela">
            Mostrando {denunciasFiltradas.length} de {denuncias.length} denúncias
          </div>
        </div>

        {denunciaSelecionada && (
          <div className="detalhes-usuario">
            <button className="fechar-detalhes" onClick={() => setDenunciaSelecionada(null)}>
              ×
            </button>

            <div className="avatar-grande">!</div>

            <h3>{denunciaSelecionada.id}</h3>
            <p className="subtitulo-modal">{denunciaSelecionada.status}</p>

            <div className="info-detalhes">
              <strong>Tipo</strong>
              <span>{denunciaSelecionada.tipo}</span>

              <strong>Motivo</strong>
              <span>{denunciaSelecionada.motivo}</span>

              <strong>Usuário denunciado</strong>
              <span>{denunciaSelecionada.usuarioDenunciado}</span>

              <strong>Prioridade</strong>
              <span>{denunciaSelecionada.prioridade}</span>

              <strong>Descrição</strong>
              <span>{denunciaSelecionada.detalhes}</span>
            </div>

            <button
              className="botao-modal"
              onClick={() => alterarStatus(denunciaSelecionada.id, "Em análise")}
            >
              Marcar como em análise
            </button>

            <button
              className="botao-modal"
              onClick={() => alterarStatus(denunciaSelecionada.id, "Resolvida")}
            >
              Resolver denúncia
            </button>

            <button
              className="botao-perigo"
              onClick={() => alterarStatus(denunciaSelecionada.id, "Rejeitada")}
            >
              Rejeitar denúncia
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
  if (status === "Pendente") return "aguardando";
  if (status === "Em análise") return "aguardando";
  if (status === "Resolvida") return "ativo";
  if (status === "Rejeitada") return "inativo";

  return "";
}

function classePrioridade(prioridade) {
  if (prioridade === "Alta") return "inativo";
  if (prioridade === "Média") return "aguardando";
  if (prioridade === "Baixa") return "ativo";

  return "";
}

export default Denuncias;