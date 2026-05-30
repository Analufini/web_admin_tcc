import PaginaSimples from "../components/PaginaSimples";

function Usuarios() {
  return (
    <PaginaSimples
      titulo="Usuários"
      descricao="Gerenciamento de usuários cadastrados na plataforma."
      cards={[
        ["Total de usuários", "12.845"],
        ["Usuários ativos", "11.902"],
        ["Bloqueados", "34"],
        ["Novos no mês", "428"],
      ]}
    />
  );
}

export default Usuarios;