import { useState } from "react";

function Relatorios({ setPagina }) {
  const [periodo, setPeriodo] = useState("Últimos 30 dias");
  const [tipoRelatorio, setTipoRelatorio] = useState("Geral");
  const [mensagem, setMensagem] = useState("");

const dadosPorPeriodo = {
  "Últimos 7 dias": {
    resumo: {
      usuarios: 8,
      denuncias: 6,
      suporte: 5,
      conteudos: 1
    },
    crescimentoUsuarios: [
      { mes: "Seg", total: 1 },
      { mes: "Ter", total: 1 },
      { mes: "Qua", total: 2 },
      { mes: "Qui", total: 1 },
      { mes: "Sex", total: 2 },
      { mes: "Sáb", total: 1 }
    ],
    denunciasPorStatus: [
      { status: "Pendentes", total: 2 },
      { status: "Em análise", total: 1 },
      { status: "Resolvidas", total: 2 },
      { status: "Rejeitadas", total: 1 }
    ],
    suportePorStatus: [
      { status: "Abertos", total: 2 },
      { status: "Em atendimento", total: 1 },
      { status: "Aguardando usuário", total: 1 },
      { status: "Resolvidos", total: 1 }
    ],
    conteudosMaisAcessados: [
      { titulo: "Como lidar com crises", acessos: 18 },
      { titulo: "Rotina visual", acessos: 14 },
      { titulo: "Comunicação alternativa", acessos: 11 },
      { titulo: "Direitos da pessoa com TEA", acessos: 7 }
    ]
  },

  "Últimos 30 dias": {
    resumo: {
      usuarios: 42,
      denuncias: 19,
      suporte: 16,
      conteudos: 7
    },
    crescimentoUsuarios: [
      { mes: "Sem 1", total: 8 },
      { mes: "Sem 2", total: 15 },
      { mes: "Sem 3", total: 27 },
      { mes: "Sem 4", total: 42 }
    ],
    denunciasPorStatus: [
      { status: "Pendentes", total: 5 },
      { status: "Em análise", total: 4 },
      { status: "Resolvidas", total: 8 },
      { status: "Rejeitadas", total: 2 }
    ],
    suportePorStatus: [
      { status: "Abertos", total: 4 },
      { status: "Em atendimento", total: 3 },
      { status: "Aguardando usuário", total: 2 },
      { status: "Resolvidos", total: 7 }
    ],
    conteudosMaisAcessados: [
      { titulo: "Como lidar com crises", acessos: 72 },
      { titulo: "Comunicação não violenta", acessos: 58 },
      { titulo: "Guia de direitos TEA", acessos: 41 },
      { titulo: "Rotina e organização", acessos: 35 }
    ]
  },

  "Últimos 12 meses": {
    resumo: {
      usuarios: 186,
      denuncias: 76,
      suporte: 64,
      conteudos: 28
    },
    crescimentoUsuarios: [
      { mes: "Jan", total: 18 },
      { mes: "Fev", total: 31 },
      { mes: "Mar", total: 46 },
      { mes: "Abr", total: 72 },
      { mes: "Mai", total: 118 },
      { mes: "Jun", total: 186 }
    ],
    denunciasPorStatus: [
      { status: "Pendentes", total: 12 },
      { status: "Em análise", total: 9 },
      { status: "Resolvidas", total: 47 },
      { status: "Rejeitadas", total: 8 }
    ],
    suportePorStatus: [
      { status: "Abertos", total: 9 },
      { status: "Em atendimento", total: 7 },
      { status: "Aguardando usuário", total: 5 },
      { status: "Resolvidos", total: 43 }
    ],
    conteudosMaisAcessados: [
      { titulo: "Como lidar com crises", acessos: 420 },
      { titulo: "Comunicação alternativa", acessos: 360 },
      { titulo: "Rotina e organização", acessos: 290 },
      { titulo: "Guia de direitos TEA", acessos: 240 }
    ]
  }
};

  const dados = dadosPorPeriodo[periodo];

  function gerarRelatorio() {
    setMensagem(`Relatório de ${tipoRelatorio.toLowerCase()} gerado para ${periodo}.`);
  }

  function exportarRelatorio() {
    setMensagem("Exportação simulada concluída. No sistema final, aqui será gerado um PDF ou planilha.");
  }

  function abrirPagina(pagina) {
    if (setPagina) {
      setPagina(pagina);
    }
  }

  function selecionarTipo(tipo) {
    setTipoRelatorio(tipo);
    setMensagem(`Exibindo relatório de ${tipo.toLowerCase()} para ${periodo}.`);
  }

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>Relatórios</h2>
          <p>Visualização de dados agregados da plataforma Orami.</p>
        </div>

        <button className="botao-roxo" onClick={exportarRelatorio}>
          Exportar relatório
        </button>
      </div>

      {mensagem && (
        <div className="mensagem-acao-dashboard">
          <span>{mensagem}</span>
          <button onClick={() => setMensagem("")}>×</button>
        </div>
      )}

      <div className="barra-relatorios">
        <select
          value={periodo}
          onChange={(e) => {
            setPeriodo(e.target.value);
            setMensagem(`Dados atualizados para ${e.target.value}.`);
          }}
        >
          <option>Últimos 7 dias</option>
          <option>Últimos 30 dias</option>
          <option>Últimos 12 meses</option>
        </select>

        <select
          value={tipoRelatorio}
          onChange={(e) => selecionarTipo(e.target.value)}
        >
          <option>Geral</option>
          <option>Usuários</option>
          <option>Denúncias</option>
          <option>Suporte</option>
          <option>Conteúdos</option>
        </select>

        <button onClick={gerarRelatorio}>Gerar relatório</button>
      </div>

      <div className="cards-resumo">
        <CardRelatorio
          titulo="Usuários"
          valor={dados.resumo.usuarios}
          icone="👥"
          ativo={tipoRelatorio === "Usuários"}
          onClick={() => selecionarTipo("Usuários")}
        />

        <CardRelatorio
          titulo="Denúncias"
          valor={dados.resumo.denuncias}
          icone="⚠️"
          ativo={tipoRelatorio === "Denúncias"}
          onClick={() => selecionarTipo("Denúncias")}
        />

        <CardRelatorio
          titulo="Chamados"
          valor={dados.resumo.suporte}
          icone="🎧"
          ativo={tipoRelatorio === "Suporte"}
          onClick={() => selecionarTipo("Suporte")}
        />

        <CardRelatorio
          titulo="Conteúdos"
          valor={dados.resumo.conteudos}
          icone="📚"
          ativo={tipoRelatorio === "Conteúdos"}
          onClick={() => selecionarTipo("Conteúdos")}
        />
      </div>

      <div className="grid-relatorios">
        <div className="painel-grande">
          <div className="painel-titulo">
            <h3>Crescimento de usuários</h3>
            <button onClick={() => selecionarTipo("Usuários")}>Detalhes</button>
          </div>

          <div className="grafico-barras">
            {dados.crescimentoUsuarios.map((item) => (
              <button
                className="barra-item"
                key={item.mes}
                onClick={() => setMensagem(`${item.mes}: ${formatarNumero(item.total)} usuários no período.`)}
              >
                <div className="barra-valor">
                  <div
                    className="barra-preenchida"
                    style={{
                      height: `${calcularAltura(item.total, maiorValor(dados.crescimentoUsuarios, "total"))}%`
                    }}
                  ></div>
                </div>

                <span>{item.mes}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="painel-grande">
          <div className="painel-titulo">
            <h3>Denúncias por status</h3>
            <button onClick={() => abrirPagina("denuncias")}>Ver denúncias</button>
          </div>

          <ListaRelatorio
            dados={dados.denunciasPorStatus}
            chaveNome="status"
            chaveValor="total"
            onClickItem={(item) =>
              setMensagem(`${item.status}: ${item.total} denúncias no período selecionado.`)
            }
          />
        </div>
      </div>

      <div className="grid-relatorios">
        <div className="painel-grande">
          <div className="painel-titulo">
            <h3>Suporte por status</h3>
            <button onClick={() => abrirPagina("suporte")}>Ver suporte</button>
          </div>

          <ListaRelatorio
            dados={dados.suportePorStatus}
            chaveNome="status"
            chaveValor="total"
            onClickItem={(item) =>
              setMensagem(`${item.status}: ${item.total} chamados no período selecionado.`)
            }
          />
        </div>

        <div className="painel-grande">
          <div className="painel-titulo">
            <h3>Conteúdos mais acessados</h3>
            <button onClick={() => abrirPagina("conteudos")}>Ver conteúdos</button>
          </div>

          <ListaRelatorio
            dados={dados.conteudosMaisAcessados}
            chaveNome="titulo"
            chaveValor="acessos"
            onClickItem={(item) =>
              setMensagem(`${item.titulo}: ${formatarNumero(item.acessos)} acessos no período selecionado.`)
            }
          />
        </div>
      </div>
    </>
  );
}

function CardRelatorio({ titulo, valor, icone, ativo, onClick }) {
  return (
    <button
      className={`card-resumo card-clicavel ${ativo ? "card-relatorio-ativo" : ""}`}
      onClick={onClick}
    >
      <div className="icone-card">{icone}</div>

      <div>
        <p>{titulo}</p>
        <strong>{formatarNumero(valor)}</strong>
        <span>Clique para filtrar</span>
      </div>
    </button>
  );
}

function ListaRelatorio({ dados, chaveNome, chaveValor, onClickItem }) {
  const maior = Math.max(...dados.map((item) => item[chaveValor]));

  return (
    <div className="lista-relatorio">
      {dados.map((item, index) => (
        <button
          className="linha-relatorio linha-relatorio-clicavel"
          key={index}
          onClick={() => onClickItem(item)}
        >
          <div className="linha-relatorio-topo">
            <strong>{item[chaveNome]}</strong>
            <span>{formatarNumero(item[chaveValor])}</span>
          </div>

          <div className="barra-horizontal">
            <div
              className="barra-horizontal-preenchida"
              style={{ width: `${(item[chaveValor] / maior) * 100}%` }}
            ></div>
          </div>
        </button>
      ))}
    </div>
  );
}

function calcularAltura(valor, maximo) {
  return Math.max(12, (valor / maximo) * 100);
}

function maiorValor(lista, chave) {
  return Math.max(...lista.map((item) => item[chave]));
}

function formatarNumero(numero) {
  return Number(numero).toLocaleString("pt-BR");
}

export default Relatorios;