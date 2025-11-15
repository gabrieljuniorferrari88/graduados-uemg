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
    const container = $("#cursos-container");
    let html = "";

    cursosData.forEach((curso) => {
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

    container.html(html);
  }

  function carregarGraduadosDestaque() {
    console.log("Carregando graduados em destaque...");

    carregarDadosGraduados(function (dados) {
      const container = $("#graduados-destaque");
      let html = "";

      const graduadosOrdenados = [...dados].sort(
        (a, b) => b.conclusao - a.conclusao
      );

      const graduadosDestaque = graduadosOrdenados.slice(0, 5);

      if (graduadosDestaque.length === 0) {
        html = `
          <div class="col-12 text-center">
            <p class="text-muted">Nenhum graduado cadastrado ainda.</p>
            <a href="cadastro.html" class="btn btn-primary">Seja o primeiro a cadastrar</a>
          </div>
        `;
      } else {
        graduadosDestaque.forEach((graduado) => {
          html += `
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100 shadow-sm">
                <img src="${graduado.foto}" class="card-img-top" alt="${
            graduado.nome
          }" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                  <h5 class="card-title">${graduado.nome}</h5>
                  <p class="card-text">
                    <strong>Curso:</strong> ${graduado.curso}<br>
                    <strong>Conclusão:</strong> ${graduado.conclusao}<br>
                    <strong>Trabalho Atual:</strong> ${
                      graduado.trabalhoAtual || "Não informado"
                    }
                  </p>
                  <div class="mb-2">
                    <small class="text-muted">Soft Skills:</small><br>
                    ${
                      graduado.softSkills && graduado.softSkills.length > 0
                        ? graduado.softSkills
                            .map(
                              (skill) =>
                                `<span class="badge bg-secondary me-1 mb-1">${skill}</span>`
                            )
                            .join("")
                        : '<span class="text-muted">Nenhuma informada</span>'
                    }
                  </div>
                  <div class="mb-2">
                    <small class="text-muted">Hard Skills:</small><br>
                    ${
                      graduado.techSkills && graduado.techSkills.length > 0
                        ? graduado.techSkills
                            .map(
                              (skill) =>
                                `<span class="badge bg-primary me-1 mb-1">${skill}</span>`
                            )
                            .join("")
                        : '<span class="text-muted">Nenhuma informada</span>'
                    }
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      }

      container.html(html);
      console.log(
        "Graduados em destaque carregados:",
        graduadosDestaque.length
      );
    });
  }

  function carregarTimeline() {
    console.log("Carregando timeline...");

    carregarDadosGraduados(function (dados) {
      const container = $("#timeline-container");
      let html = "";

      if (dados.length === 0) {
        html = `
          <div class="text-center py-5">
            <h4>Nenhum graduado cadastrado</h4>
            <p class="text-muted">Ainda não há graduados para exibir na linha do tempo.</p>
            <a href="cadastro.html" class="btn btn-primary">Cadastrar Primeiro Graduado</a>
          </div>
        `;
      } else {
        const graduadosOrdenados = [...dados].sort(
          (a, b) => b.conclusao - a.conclusao
        );

        graduadosOrdenados.forEach((graduado) => {
          html += `
            <div class="timeline-item mb-4">
              <div class="timeline-content">
                <div class="card">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${
                        graduado.foto
                      }" class="img-fluid rounded-start h-100" alt="${
            graduado.nome
          }" style="object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${graduado.nome}</h5>
                        <p class="card-text">
                          <strong>Curso:</strong> ${graduado.curso}<br>
                          <strong>Período:</strong> ${graduado.inicio} - ${
            graduado.conclusao
          }<br>
                          <strong>Trabalho Atual:</strong> ${
                            graduado.trabalhoAtual || "Não informado"
                          }
                        </p>
                        <div class="mb-2">
                          <small class="text-muted">Soft Skills:</small><br>
                          ${
                            graduado.softSkills &&
                            graduado.softSkills.length > 0
                              ? graduado.softSkills
                                  .map(
                                    (skill) =>
                                      `<span class="badge bg-secondary me-1 mb-1">${skill}</span>`
                                  )
                                  .join("")
                              : '<span class="text-muted">Nenhuma informada</span>'
                          }
                        </div>
                        <div class="mb-2">
                          <small class="text-muted">Hard Skills:</small><br>
                          ${
                            graduado.techSkills &&
                            graduado.techSkills.length > 0
                              ? graduado.techSkills
                                  .map(
                                    (skill) =>
                                      `<span class="badge bg-primary me-1 mb-1">${skill}</span>`
                                  )
                                  .join("")
                              : '<span class="text-muted">Nenhuma informada</span>'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      }

      container.html(html);
      console.log("Timeline carregada com", dados.length, "graduados");
    });
  }

  function configurarBusca() {
    $("#search-btn").on("click", function () {
      filtrarTimeline();
    });

    $("#search-input").on("keyup", function (e) {
      if (e.key === "Enter") {
        filtrarTimeline();
      }
    });
  }

  function filtrarTimeline() {
    carregarDadosGraduados(function (dados) {
      const termo = $("#search-input").val().toLowerCase();

      if (!termo) {
        carregarTimeline();
        return;
      }

      const graduadosFiltrados = dados.filter((graduado) => {
        return (
          graduado.nome.toLowerCase().includes(termo) ||
          graduado.curso.toLowerCase().includes(termo) ||
          (graduado.trabalhoAtual &&
            graduado.trabalhoAtual.toLowerCase().includes(termo)) ||
          (graduado.softSkills &&
            graduado.softSkills.some((skill) =>
              skill.toLowerCase().includes(termo)
            )) ||
          (graduado.techSkills &&
            graduado.techSkills.some((skill) =>
              skill.toLowerCase().includes(termo)
            ))
        );
      });

      const container = $("#timeline-container");
      let html = "";

      if (graduadosFiltrados.length === 0) {
        html = `
          <div class="text-center py-5">
            <h4>Nenhum graduado encontrado</h4>
            <p class="text-muted">Tente buscar por outros termos</p>
          </div>
        `;
      } else {
        graduadosFiltrados.forEach((graduado) => {
          html += `
            <div class="timeline-item mb-4">
              <div class="timeline-content">
                <div class="card">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${
                        graduado.foto
                      }" class="img-fluid rounded-start h-100" alt="${
            graduado.nome
          }" style="object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${graduado.nome}</h5>
                        <p class="card-text">
                          <strong>Curso:</strong> ${graduado.curso}<br>
                          <strong>Período:</strong> ${graduado.inicio} - ${
            graduado.conclusao
          }<br>
                          <strong>Trabalho Atual:</strong> ${
                            graduado.trabalhoAtual || "Não informado"
                          }
                        </p>
                        <div class="mb-2">
                          <small class="text-muted">Soft Skills:</small><br>
                          ${
                            graduado.softSkills &&
                            graduado.softSkills.length > 0
                              ? graduado.softSkills
                                  .map(
                                    (skill) =>
                                      `<span class="badge bg-secondary me-1 mb-1">${skill}</span>`
                                  )
                                  .join("")
                              : '<span class="text-muted">Nenhuma informada</span>'
                          }
                        </div>
                        <div class="mb-2">
                          <small class="text-muted">Hard Skills:</small><br>
                          ${
                            graduado.techSkills &&
                            graduado.techSkills.length > 0
                              ? graduado.techSkills
                                  .map(
                                    (skill) =>
                                      `<span class="badge bg-primary me-1 mb-1">${skill}</span>`
                                  )
                                  .join("")
                              : '<span class="text-muted">Nenhuma informada</span>'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      }

      container.html(html);
    });
  }

  function configurarFormulario() {
    $("#form-cadastro").on("submit", function (e) {
      e.preventDefault();

      if (validarFormulario()) {
        const formData = {
          nome: $("#nome").val(),
          curso: $("#curso").val(),
          inicio: $("#inicio").val(),
          conclusao: $("#conclusao").val(),
          foto: $("#foto").val() || "assets/default.png",
          softSkills: $("#softSkills")
            .val()
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
          techSkills: $("#techSkills")
            .val()
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
          trabalhoAtual: $("#trabalhoAtual").val(),
        };

        adicionarGraduado(formData, function (sucesso) {
          if (sucesso) {
            $("#modalConfirmacao").modal("show");

            $("#form-cadastro")[0].reset();

            $("input, select").removeClass("is-valid is-invalid");
          } else {
            alert("Erro ao cadastrar graduado. Tente novamente.");
          }
        });
      }
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

    if (inicio && conclusao && inicio > conclusao) {
      $("#conclusao").addClass("is-invalid");
      $("#conclusao")
        .siblings(".invalid-feedback")
        .text("O ano de conclusão deve ser maior ou igual ao ano de início.");
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
    } else if (campo.attr("type") === "number") {
      const min = parseInt(campo.attr("min"));
      const max = parseInt(campo.attr("max"));

      if (valor && (valor < min || valor > max)) {
        campo.addClass("is-invalid");
        campo
          .siblings(".invalid-feedback")
          .text(`O valor deve estar entre ${min} e ${max}.`);
        valido = false;
      } else {
        campo.removeClass("is-invalid");
        campo.addClass("is-valid");
      }
    } else {
      campo.removeClass("is-invalid");
      campo.addClass("is-valid");
    }

    return valido;
  }
});
