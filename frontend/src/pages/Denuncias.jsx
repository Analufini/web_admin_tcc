import PaginaSimples from "../components/PaginaSimples";

function Denuncias() {
  return (
    <PaginaSimples
      titulo="Denúncias"
      descricao="Análise e acompanhamento de denúncias feitas pelos usuários."
      cards={[
        ["Pendentes", "23"],
        ["Em análise", "12"],
        ["Resolvidas", "156"],
        ["Rejeitadas", "8"],
      ]}
    />
  );
}

export default Denuncias;