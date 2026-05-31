import { useEffect, useState } from "react";

const API = "http://localhost:3001/api";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [aba, setAba] = useState("Todos");

  useEffect(() => {
    fetch(`${API}/logs`)
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  const filtrados = logs.filter(log => {
    if (aba === "Todos") return true;
    return log.modulo === aba;
  });

  const abas = ["Todos", "Logins", "Usuários", "Conteúdos", "Denúncias", "Administradores", "Ações críticas"];

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>Segurança e Logs</h2>
          <p>Acompanhe todas as ações e acessos realizados no sistema.</p>
        </div>

        <div className="acoes-logs">
          <button>🔎 Filtros</button>
          <button>⬇ Exportar</button>
        </div>
      </div>

      <div className="abas-logs">
        {abas.map(item => (
          <button
            key={item}
            className={aba === item ? "aba-ativa" : ""}
            onClick={() => setAba(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="painel-grande">
        <table className="tabela-admin">
          <thead>
            <tr>
              <th>Data e hora</th>
              <th>Administrador</th>
              <th>Ação</th>
              <th>Módulo</th>
              <th>Detalhes</th>
              <th>IP</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map(log => (
              <tr key={log.id}>
                <td>{log.dataHora}</td>
                <td>{log.administrador}</td>
                <td>{log.acao}</td>
                <td>{log.modulo}</td>
                <td>{log.detalhes}</td>
                <td>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="rodape-logs">
          <p>Mostrando 1 a {filtrados.length} de 1.245 registros</p>

          <div className="paginacao-logs">
            <button>{"<"}</button>
            <button className="pagina-ativa">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>178</button>
            <button>{">"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logs;