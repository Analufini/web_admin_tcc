import PaginaSimples from "../components/PaginaSimples";

function Suporte() {
  return (
    <PaginaSimples
      titulo="Suporte"
      descricao="Acompanhamento de chamados e solicitações dos usuários."
      cards={[
        ["Abertos", "14"],
        ["Em atendimento", "4"],
        ["Finalizados", "92"],
        ["Urgentes", "2"],
      ]}
    />
  );
}

export default Suporte;