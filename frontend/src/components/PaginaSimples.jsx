import CardResumo from "./CardResumo";

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

export default PaginaSimples;