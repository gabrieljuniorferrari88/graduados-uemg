const cursosData = [
  {
    nome: "Administração",
    descricao: "Formação em gestão de empresas e organizações",
    icone: "📊",
  },
  {
    nome: "Ciência da Computação",
    descricao: "Formação em desenvolvimento de software e sistemas",
    icone: "💻",
  },
  {
    nome: "Direito",
    descricao: "Formação em ciências jurídicas e sociais",
    icone: "⚖️",
  },
  {
    nome: "Engenharia Civil",
    descricao: "Formação em projetos e construção civil",
    icone: "🏗️",
  },
  {
    nome: "Psicologia",
    descricao: "Formação em ciências do comportamento humano",
    icone: "🧠",
  },
  {
    nome: "Sistemas de Informação",
    descricao: "Formação em tecnologia da informação e gestão",
    icone: "💾",
  },
];

function carregarDadosGraduados(callback) {
  const dadosLocalStorage = localStorage.getItem("graduadosData");

  if (dadosLocalStorage) {
    console.log("Carregando dados do localStorage");
    callback(JSON.parse(dadosLocalStorage));
    return;
  }

  console.log("Carregando dados do arquivo JSON");
  $.getJSON("../data/graduados.json")
    .done(function (dados) {
      console.log("Dados carregados do JSON:", dados);
      localStorage.setItem("graduadosData", JSON.stringify(dados));
      callback(dados);
    })
    .fail(function (jqxhr, textStatus, error) {
      console.error("Erro ao carregar JSON:", textStatus, error);
      callback([]);
    });
}

function salvarDadosGraduados(dados) {
  localStorage.setItem("graduadosData", JSON.stringify(dados));
}

function adicionarGraduado(novoGraduado, callback) {
  carregarDadosGraduados(function (dadosAtuais) {
    dadosAtuais.push(novoGraduado);

    salvarDadosGraduados(dadosAtuais);

    console.log("Novo graduado adicionado:", novoGraduado);
    console.log("Total de graduados:", dadosAtuais.length);

    if (callback) callback(true);
  });
}

function limparDados() {
  localStorage.removeItem("graduadosData");
  console.log("Dados limpos do localStorage");
}
