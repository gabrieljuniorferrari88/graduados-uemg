# 🎓 Graduados UEMG — Portal Institucional Completo (Frontend + Backend + Docker)

Uma plataforma moderna, elegante e profissional construída para divulgar os **graduados da UEMG**, suas competências, trajetória acadêmica e habilidades.  
Agora com **backend em PHP**, **banco de dados PostgreSQL** e ambiente totalmente configurável via **Docker**.

---

## 📚 Sobre o Projeto

> Aplicação desenvolvida em 2025 como parte da disciplina de **Programação Web**, sob tutoria do **Prof. Dr. Ivan**.  
> O objetivo é entregar um portal institucional com design moderno e arquitetura escalável.

---

## 🚀 Funcionalidades

- Carrossel institucional
- Página inicial elegante, responsiva e moderna
- Timeline com busca inteligente (nome, curso, skills)
- Cadastro de graduados conectado ao banco de dados
- Soft Skills e Tech Skills renderizadas como badges
- Backend real em **PHP**
- Banco **PostgreSQL** com tabela `graduados`
- API organizada em `/api`
- Suporte completo a **Docker** (PHP + Apache + PostgreSQL)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                  | Uso                          |
| --------------------------- | ---------------------------- |
| **HTML5**                   | Estrutura das páginas        |
| **CSS3 + Bootstrap 5.3**    | UI responsiva                |
| **JavaScript (ES6)**        | Interações e lógica          |
| **jQuery**                  | DOM, AJAX e filtros          |
| **PHP 8.2**                 | Backend e API                |
| **PostgreSQL**              | Banco de dados               |
| **Docker & Docker Compose** | Meio ambiente completo       |
| **JSON**                    | Utilizado na primeira versão |

---

## 📁 Estrutura do Projeto

```
graduados-uemg/
│
├── app/
│   ├── index.html
│   ├── timeline.html
│   ├── cadastro.html
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── db/
│   │    └── init.sql
│   └── api/
│        ├── listar.php
│        ├── criar.php
│        └── conectar.php
│
├── docker-compose.yml
├── Dockerfile
├── LICENSE
└── README.md
```

---

# 🐳 Como Rodar o Projeto com Docker (RECOMENDADO)

Este é o método mais simples, completo e profissional para rodar o portal.

## 🔧 1. Instalar o Docker

### ➤ Windows

https://www.docker.com/products/docker-desktop

### ➤ Linux

```
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
```

### ➤ macOS

https://www.docker.com/products/docker-desktop

---

## 🐋 2. Clonar o Repositório

```
git clone https://github.com/gabrieljuniorferrari88/graduados-uemg.git
cd graduados-uemg
```

---

## ▶️ 3. Subir o ambiente completo

```
docker-compose up -d --build
```

### Isso irá subir:

- Servidor Apache + PHP (porta 8080)
- Banco PostgreSQL (porta 5432)
- Script automático `init.sql`

---

## 🌍 4. Acessar a aplicação

Acesse no navegador:  
http://localhost:8080

---

# 🔧 Como Rodar Sem Docker

### ➤ Python

```
cd app
python -m http.server 8080
```

### ➤ Node

```
npm install -g http-server
http-server app
```

---

# 🔄 Como Fazer Fork

1. Abra: https://github.com/gabrieljuniorferrari88/graduados-uemg
2. Clique em **Fork**

---

# 🤝 Como Contribuir

```
git checkout -b feature-minha-melhoria
git commit -m "Adiciona melhoria"
git push origin feature-minha-melhoria
```

Abra um Pull Request ❤️

---

# 🧪 Roadmap Futuro

- Painel administrativo
- Login + autenticação
- Upload de fotos
- Dashboard analítico
- API JWT

---

# 👨‍💻 Autor

**Gabriel Ferrari**  
Desenvolvedor de Software  
GitHub: https://github.com/gabrieljuniorferrari88

---

# 📜 Licença

MIT
