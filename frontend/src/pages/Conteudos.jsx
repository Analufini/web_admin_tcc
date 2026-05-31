import { useEffect, useRef, useState } from "react";

const API = "http://localhost:3001/api";

function Conteudos() {
  const [conteudos, setConteudos] = useState([]);
  const [tela, setTela] = useState("lista");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [selecionado, setSelecionado] = useState(null);

  const inputDocumento = useRef(null);
  const inputFoto = useRef(null);
  const inputAudio = useRef(null);

  const [novo, setNovo] = useState({
    titulo: "",
    categoria: "",
    descricao: "",
    local: "",
    status: "Rascunho",
    documento: "",
    foto: "",
    audio: ""
  });

  useEffect(() => {
    carregarConteudos();
  }, []);

  function carregarConteudos() {
    fetch(`${API}/conteudos`)
      .then(res => res.json())
      .then(data => {
        setConteudos(data);
        setSelecionado(data[0]);
      });
  }

  function salvarConteudo(e) {
    e.preventDefault();

    fetch(`${API}/conteudos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo)
    })
      .then(res => res.json())
      .then(() => {
        setNovo({
          titulo: "",
          categoria: "",
          descricao: "",
          local: "",
          status: "Rascunho",
          documento: "",
          foto: "",
          audio: ""
        });

        carregarConteudos();
        setTela("lista");
      });
  }

  const filtrados = conteudos.filter(c => {
    const bateStatus = statusFiltro === "Todos" || c.status === statusFiltro;
    const bateCategoria = categoriaFiltro === "Todas" || c.categoria === categoriaFiltro;
    return bateStatus && bateCategoria;
  });

  const publicados = conteudos.filter(c => c.status === "Publicado").length;
  const rascunhos = conteudos.filter(c => c.status === "Rascunho").length;
  const aguardando = conteudos.filter(c => c.status === "Aguardando aprovação").length;
  const arquivados = conteudos.filter(c => c.status === "Arquivado").length;

  if (tela === "novo") {
    return (
      <>
        <div className="breadcrumb">Conteúdos &gt; Novo conteúdo</div>

        <div className="cabecalho-pagina">
          <div>
            <h2>Novo conteúdo</h2>
            <p>Crie um novo material informativo para o app, site ou comunidade.</p>
          </div>
        </div>

        <form className="grid-form-admin" onSubmit={salvarConteudo}>
          <div className="painel-grande">
            <h3>Informações do conteúdo</h3>

            <label>Título</label>
            <input
              placeholder="Digite o título do conteúdo"
              value={novo.titulo}
              onChange={e => setNovo({ ...novo, titulo: e.target.value })}
              required
            />

            <label>Categoria</label>
            <select
              value={novo.categoria}
              onChange={e => setNovo({ ...novo, categoria: e.target.value })}
              required
            >
              <option value="">Selecione a categoria</option>
              <option>Crises</option>
              <option>Comunicação</option>
              <option>Direitos</option>
              <option>Rotina</option>
              <option>Alimentação</option>
            </select>

            <label>Descrição / texto</label>
            <textarea
              placeholder="Escreva o conteúdo informativo..."
              value={novo.descricao}
              onChange={e => setNovo({ ...novo, descricao: e.target.value })}
              required
            />

            <label>Onde postar?</label>
            <select
              value={novo.local}
              onChange={e => setNovo({ ...novo, local: e.target.value })}
              required
            >
              <option value="">Selecione o local</option>
              <option>App Orami</option>
              <option>Site</option>
              <option>Site e App</option>
              <option>Comunidade</option>
            </select>
          </div>

          <div className="painel-grande">
            <h3>Mídias e publicação</h3>

            <input
              ref={inputDocumento}
              className="input-arquivo-escondido"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={e => setNovo({ ...novo, documento: e.target.files[0]?.name || "" })}
            />

            <input
              ref={inputFoto}
              className="input-arquivo-escondido"
              type="file"
              accept="image/*,video/*"
              onChange={e => setNovo({ ...novo, foto: e.target.files[0]?.name || "" })}
            />

            <input
              ref={inputAudio}
              className="input-arquivo-escondido"
              type="file"
              accept="audio/*"
              onChange={e => setNovo({ ...novo, audio: e.target.files[0]?.name || "" })}
            />

            <label>Adicionar mídias</label>

            <div className="botoes-midia">
              <button type="button" onClick={() => inputDocumento.current.click()}>
                <span className="icone-midia roxo">+</span>
                <div>
                  <strong>Documento</strong>
                  <p>{novo.documento || "Adicionar PDF, DOC ou TXT"}</p>
                </div>
              </button>

              <button type="button" onClick={() => inputFoto.current.click()}>
                <span className="icone-midia azul">+</span>
                <div>
                  <strong>Foto ou vídeo</strong>
                  <p>{novo.foto || "Adicionar imagem de capa"}</p>
                </div>
              </button>

              <button type="button" onClick={() => inputAudio.current.click()}>
                <span className="icone-midia laranja">+</span>
                <div>
                  <strong>Áudio</strong>
                  <p>{novo.audio || "Adicionar áudio complementar"}</p>
                </div>
              </button>
            </div>

            <label>Status do conteúdo</label>
            <select
              value={novo.status}
              onChange={e => setNovo({ ...novo, status: e.target.value })}
            >
              <option>Rascunho</option>
              <option>Aguardando aprovação</option>
              <option>Publicado</option>
            </select>

            <div className="resumo-upload">
              <p><strong>Documento:</strong> {novo.documento || "Nenhum documento selecionado"}</p>
              <p><strong>Imagem:</strong> {novo.foto || "Nenhuma imagem selecionada"}</p>
              <p><strong>Áudio:</strong> {novo.audio || "Nenhum áudio selecionado"}</p>
              <p><strong>Publicação:</strong> {novo.local || "Não definido"}</p>
              <p><strong>Status:</strong> {novo.status}</p>
            </div>
          </div>

          <div className="acoes-form-admin">
            <button type="button" className="botao-secundario" onClick={() => setTela("lista")}>
              Cancelar
            </button>

            <button
              type="button"
              className="botao-secundario"
              onClick={() => setNovo({ ...novo, status: "Rascunho" })}
            >
              Salvar como rascunho
            </button>

            <button className="botao-roxo">
              Criar conteúdo
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h2>Conteúdos Informativos</h2>
          <p>Gerencie os guias e materiais informativos do app e do site.</p>
        </div>

        <button className="botao-roxo" onClick={() => setTela("novo")}>
          + Novo conteúdo
        </button>
      </div>

      <div className="abas-conteudos">
        <button className="aba-ativa">Todos <span>{conteudos.length}</span></button>
        <button>Rascunhos <span>{rascunhos}</span></button>
        <button>Aguardando aprovação <span>{aguardando}</span></button>
        <button>Publicados <span>{publicados}</span></button>
        <button>Arquivados <span>{arquivados}</span></button>
      </div>

      <div className="barra-filtros-conteudos">
        <select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)}>
          <option value="Todas">Categoria</option>
          <option>Crises</option>
          <option>Comunicação</option>
          <option>Direitos</option>
          <option>Rotina</option>
          <option>Alimentação</option>
        </select>

        <select value={statusFiltro} onChange={e => setStatusFiltro(e.target.value)}>
          <option value="Todos">Status</option>
          <option>Publicado</option>
          <option>Rascunho</option>
          <option>Aguardando aprovação</option>
          <option>Arquivado</option>
        </select>

        <button>Ordenar ▾</button>
        <button>Filtros</button>
      </div>

      <div className={`layout-conteudos ${selecionado ? "com-preview" : ""}`}>
        <div className="painel-grande">
          <table className="tabela-admin">
            <thead>
              <tr>
                <th>Conteúdo</th>
                <th>Categoria</th>
                <th>Autor</th>
                <th>Visualizações</th>
                <th>Status</th>
                <th>Atualizado</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map(conteudo => (
                <tr
                  key={conteudo.id}
                  onClick={() => setSelecionado(conteudo)}
                  className={selecionado?.id === conteudo.id ? "linha-selecionada" : ""}
                >
                  <td>{conteudo.titulo}</td>
                  <td>{conteudo.categoria}</td>
                  <td>{conteudo.autor}</td>
                  <td>{conteudo.visualizacoes}</td>
                  <td>
                    <span className={`badge ${classeStatus(conteudo.status)}`}>
                      {conteudo.status}
                    </span>
                  </td>
                  <td>{conteudo.atualizado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="rodape-tabela">
            Mostrando {filtrados.length} de {conteudos.length} conteúdos
          </p>
        </div>

        {selecionado && (
          <aside className="preview-conteudo">
            <button className="fechar-detalhes" onClick={() => setSelecionado(null)}>
              ×
            </button>

            <h3>{selecionado.titulo}</h3>

            <span className={`badge ${classeStatus(selecionado.status)}`}>
              {selecionado.status}
            </span>

            <div className="info-detalhes">
              <strong>Visualizações</strong>
              <span>{selecionado.visualizacoes}</span>

              <strong>Categoria</strong>
              <span>{selecionado.categoria}</span>

              <strong>Autor</strong>
              <span>{selecionado.autor}</span>

              <strong>Publicado em</strong>
              <span>{selecionado.local}</span>

              <strong>Atualizado</strong>
              <span>{selecionado.atualizado}</span>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

function classeStatus(status) {
  if (status === "Publicado") return "ativo";
  if (status === "Rascunho") return "rascunho";
  if (status === "Aguardando aprovação") return "aguardando";
  return "inativo";
}

export default Conteudos;