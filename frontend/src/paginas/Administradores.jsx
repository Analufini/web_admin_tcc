import PaginaSimples from "../components/PaginaSimples";

function Administradores() {
  return (
    <PaginaSimples
      titulo="Administradores"
      descricao="Gerenciamento dos administradores e permissões do painel."
      cards={[
        ["Total", "16"],
        ["Ativos", "14"],
        ["Inativos", "2"],
        ["Último acesso médio", "2h 34m"],
      ]}
    />
  );
}

export default Administradores;