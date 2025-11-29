CREATE TABLE IF NOT EXISTS graduados (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    curso VARCHAR(200) NOT NULL,
    inicio INT NOT NULL,
    conclusao INT NOT NULL,
    foto TEXT,
    softskills TEXT,
    techskills TEXT,
    trabalhoatual TEXT
);

INSERT INTO graduados (nome, curso, inicio, conclusao, foto, softskills, techskills, trabalhoatual)
VALUES
('Gabriel Ferrari', 'Sistemas de Informação', 2015, 2025, 'assets/default.png',
 'HTML,CSS,Java,Liderança',
 'Excel,Power BI,Gestão de Projetos',
 'Analista na XYZ'),

('Gustavo Silva', 'Sistemas de Informação', 2016, 2025, 'assets/default.png',
 'Empatia,Comunicação,Liderança',
 'Excel,Power BI,Gestão de Projetos',
 'Analista na XYZ');
