import PaginaSimples from "../components/PaginaSimples";

function Logs() {
  return (
    <PaginaSimples
      titulo="Segurança e Logs"
      descricao="Histórico das principais ações realizadas no painel."
      cards={[
        ["Ações hoje", "24"],
        ["Logins", "12"],
        ["Alterações", "8"],
        ["Alertas", "3"],
      ]}
    />
  );
}

export default Logs;