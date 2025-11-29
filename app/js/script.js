$(document).ready(function () {
  $("#ano-atual").text(new Date().getFullYear());

  if ($("#cursos-container").length) {
    carregarCursos();
    carregarGraduadosDestaque();
  }

  if ($("#timeline-container").length) {
    carregarTimeline();
    configurarBusca();
  }

  if ($("#form-cadastro").length) {
    configurarFormulario();
  }

  function carregarCursos() {
    const cursosData = [
      { nome: "Administração", descricao: "Formação em gestão de empresas e organizações", icone: "📊" },
      { nome: "Ciência da Computação", descricao: "Formação em desenvolvimento de software e sistemas", icone: "💻" },
      { nome: "Direito", descricao: "Formação em ciências jurídicas e sociais", icone: "⚖️" },
      { nome: "Engenharia Civil", descricao: "Formação em projetos e construção civil", icone: "🏗️" },
      { nome: "Psicologia", descricao: "Formação em ciências do comportamento humano", icone: "🧠" },
      { nome: "Sistemas de Informação", descricao: "Formação em tecnologia da informação e gestão", icone: "⚙️" }
    ];

    let html = "";
    cursosData.forEach(curso => {
      html += `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <div class="display-4 mb-3">${curso.icone}</div>
              <h5 class="card-title">${curso.nome}</h5>
              <p class="card-text">${curso.descricao}</p>
            </div>
          </div>
        </div>
      `;
    });
    $("#cursos-container").html(html);
  }

  function buscarGraduados(callback) { //chamada listar.php retorno em json
    $.get("api/listar.php", function (dados) {
      callback(dados);
    }).fail(function () {
      console.error("Erro ao carregar graduados.");
      callback([]);
    });
  }

  function carregarGraduadosDestaque() {
    buscarGraduados(function (dados) {
      const container = $("#graduados-destaque");
      let html = "";

      const ordenados = [...dados].sort((a, b) => b.conclusao - a.conclusao);
      const destaque = ordenados.slice(0, 5);

      if (destaque.length === 0) {
        html = `
          <div class="col-12 text-center">
            <p class="text-muted">Nenhum graduado cadastrado ainda.</p>
            <a href="cadastro.html" class="btn btn-primary">Seja o primeiro a cadastrar</a>
          </div>`;
      } else {
        destaque.forEach(g => {
          html += `
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100 shadow-sm">
                <img src="${g.foto}" class="card-img-top" style="height:200px;object-fit:cover;">
                <div class="card-body">
                  <h5 class="card-title">${g.nome}</h5>
                  <p class="card-text">
                    <strong>Curso:</strong> ${g.curso}<br>
                    <strong>Conclusão:</strong> ${g.conclusao}<br>
                    <strong>Trabalho Atual:</strong> ${g.trabalhoatual || "Não informado"}
                  </p>
                </div>
              </div>
            </div>`;
        });
      }

      container.html(html);
    });
  }

  function carregarTimeline() {
    buscarGraduados(function (dados) {
      const container = $("#timeline-container");
      let html = "";

      if (dados.length === 0) {
        html = `
          <div class="text-center py-5">
            <h4>Nenhum graduado cadastrado</h4>
            <a href="cadastro.html" class="btn btn-primary">Cadastrar Primeiro Graduado</a>
          </div>`;
      } else {
        const ordenados = [...dados].sort((a, b) => b.conclusao - a.conclusao);

        ordenados.forEach(g => {
          html += `
            <div class="timeline-item mb-4">
              <div class="timeline-content">
                <div class="card">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${g.foto}" class="img-fluid rounded-start h-100" style="object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${g.nome}</h5>
                        <p class="card-text">
                          <strong>Curso:</strong> ${g.curso}<br>
                          <strong>Período:</strong> ${g.inicio} - ${g.conclusao}<br>
                          <strong>Trabalho Atual:</strong> ${g.trabalhoatual || "Não informado"}
                        </p>

                        <div class="mb-2">
                          <small class="text-muted">Soft Skills:</small><br>
                          ${g.softskills.map(s => `<span class="badge bg-secondary me-1">${s}</span>`).join("")}
                        </div>

                        <div class="mb-2">
                          <small class="text-muted">Hard Skills:</small><br>
                          ${g.techskills.map(s => `<span class="badge bg-primary me-1">${s}</span>`).join("")}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
        });
      }

      container.html(html);
    });
  }

  function configurarBusca() {
    $("#search-btn").on("click", filtrar);
    $("#search-input").on("keyup", e => e.key === "Enter" && filtrar());

    function filtrar() {
      const termo = $("#search-input").val().toLowerCase();
      buscarGraduados(function (dados) {
        const filtrados = dados.filter(g =>
          g.nome.toLowerCase().includes(termo) ||
          g.curso.toLowerCase().includes(termo) ||
          (g.trabalhoatual && g.trabalhoatual.toLowerCase().includes(termo)) ||
          g.softskills.some(s => s.toLowerCase().includes(termo)) ||
          g.techskills.some(s => s.toLowerCase().includes(termo))
        );

        const container = $("#timeline-container");
        let html = "";

        if (filtrados.length === 0) {
          html = `
            <div class="text-center py-5">
              <h4>Nenhum graduado encontrado</h4>
            </div>
          `;
        } else {
          filtrados.forEach(g => {
            html += `
            <div class="timeline-item mb-4">
              <div class="timeline-content">
                <div class="card">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${g.foto}" class="img-fluid rounded-start h-100" style="object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${g.nome}</h5>
                        <p class="card-text">
                          <strong>Curso:</strong> ${g.curso}<br>
                          <strong>Período:</strong> ${g.inicio} - ${g.conclusao}<br>
                          <strong>Trabalho Atual:</strong> ${g.trabalhoatual || "Não informado"}
                        </p>

                        <div class="mb-2">
                          <small class="text-muted">Soft Skills:</small><br>
                          ${g.softskills.map(s => `<span class="badge bg-secondary me-1">${s}</span>`).join("")}
                        </div>

                        <div class="mb-2">
                          <small class="text-muted">Hard Skills:</small><br>
                          ${g.techskills.map(s => `<span class="badge bg-primary me-1">${s}</span>`).join("")}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
          });
        }

        container.html(html);
      });
    }
  }

  function configurarFormulario() {
    $("#form-cadastro").on("submit", function (e) {
      e.preventDefault();

      if (!validarFormulario()) return;

      const formData = {
        nome: $("#nome").val(),
        curso: $("#curso").val(),
        inicio: $("#inicio").val(),
        conclusao: $("#conclusao").val(),
        foto: $("#foto").val() || "assets/default.png",
        softSkills: $("#softSkills").val().split(",").map(s => s.trim()).filter(s => s),
        techSkills: $("#techSkills").val().split(",").map(s => s.trim()).filter(s => s),
        trabalhoAtual: $("#trabalhoAtual").val()
      };

      $.ajax({ //chamada criar.php e e retona success ou error
        url: "api/criar.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function () {
          $("#modalConfirmacao").modal("show");
          $("#form-cadastro")[0].reset();
          $("input, select").removeClass("is-valid is-invalid");
        },
        error: function () {
          alert("Erro ao cadastrar graduado.");
        }
      });
    });

    $("input, select").on("blur", function () {
      validarCampo($(this));
    });
  }

  function validarFormulario() {
    let valido = true;

    $("input[required], select[required]").each(function () {
      if (!validarCampo($(this))) {
        valido = false;
      }
    });

    const inicio = parseInt($("#inicio").val());
    const conclusao = parseInt($("#conclusao").val());

    if (inicio > conclusao) {
      $("#conclusao").addClass("is-invalid");
      valido = false;
    }

    return valido;
  }

  function validarCampo(campo) {
    const valor = campo.val();
    let valido = true;

    if (campo.attr("required") && !valor) {
      campo.addClass("is-invalid");
      valido = false;
    } else {
      campo.removeClass("is-invalid").addClass("is-valid");
    }

    return valido;
  }

});
