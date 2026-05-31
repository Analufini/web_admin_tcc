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

export default CardResumo;