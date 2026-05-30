import PaginaSimples from "../components/PaginaSimples";

function Conteudos() {
  return (
    <PaginaSimples
      titulo="Conteúdos Informativos"
      descricao="Controle de guias, artigos e materiais informativos."
      cards={[
        ["Publicados", "86"],
        ["Rascunhos", "12"],
        ["Em análise", "5"],
        ["Arquivados", "3"],
      ]}
    />
  );
}

export default Conteudos;