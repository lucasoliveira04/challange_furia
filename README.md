# 💻 Desafio Técnico - FURIA Tech  
## Vaga: Assistente de Engenharia de Software

---

### 🎯 Desafio Escolhido  
**Challenge #2: Know Your Fan [HARD]**

---

### 📝 Descrição do Desafio  

O desafio propõe a criação de uma **solução ou aplicativo** (ex: Python Notebook ou aplicação web) que ajude a **coletar informações detalhadas de um fã de eSports**. A estratégia *Know Your Fan* é amplamente utilizada por organizações como a FURIA para conhecer melhor seus torcedores e, assim, oferecer **experiências e serviços personalizados**.

---

### 🎯 Objetivo

Desenvolver uma aplicação que:

- 🗂️ Coleta dados pessoais como nome, endereço, CPF e informações sobre **interesses, atividades, eventos e compras** relacionadas ao último ano.  
- 📎 Permite o upload de documentos do usuário.  
- 🌐 Integra redes sociais ao perfil do usuário, permitindo a leitura de interações, páginas seguidas e atividades relacionadas ao universo dos eSports.  
- ⭐ Avalia e **classifica automaticamente o nível de engajamento do fã**,  
- 📊 Disponibiliza um **dashboard administrativo** com os usuários cadastrados e suas classificações.

---

### 🧱 Arquitetura da Solução

A aplicação é composta por dois principais módulos:

- **Front-End**  
  - Responsável pela interface amigável ao usuário, coleta de dados e visualização dos resultados.  
- **Back-End**  
  - Responsável pelo armazenamento, validações, Web Scraping e classificação dos usuários.  
  - Utiliza **Selenium WebDriver** para realizar Web Scraping do perfil do X (Twitter), analisando seguidores, postagens e presença de conteúdo relacionado à FURIA.

A comunicação entre os módulos é feita por meio de **API REST**, garantindo flexibilidade e escalabilidade.

---

### 🛠️ Tecnologias Utilizadas

#### Front-End  
- React  
- TailwindCSS  

#### Back-End  
- Flask  
- EasyOCR  
- Node.js  
- Express  
- Firebase (Auth, Firestore, Storage)  
- Selenium WebDriver (Web Scraping de perfis do X/Twitter)

---

### ⚙️ Como Rodar Localmente

#### Pré-requisitos:
- Node.js  
- Python 3.8+  
- Pip  
- Docker (opcional)  
- npm  

#### Passo a passo:

```bash
# Clone o repositório
git clone https://github.com/lucasoliveira04/projeto-furia-tech.git

# Instale dependências do front-end
cd projeto-furia-tech
npm install
npm run dev

````

---

### 🧩 Funcionalidades Implementadas

* ✅ Formulário completo com dados pessoais
* ✅ Upload e leitura de documentos usando **OCR**
* ✅ Validação automática de identidade
* ✅ Integração com redes sociais (Instagram, X/Twitter, etc.)
* ✅ **Web Scraping do perfil do X (Twitter)** para analisar seguidores e conteúdo relacionado à FURIA
* ✅ **Classificação do fã** com base no engajamento e dados fornecidos
* ✅ Dashboard administrativo para visualização de usuários e seus níveis

---

### 📚 Documentação das APIs

Para acessar a documentação detalhada das APIs, clique no link abaixo:

[API De Filtragram de CPF usando OCR](https://github.com/lucasoliveira04/api-easyocr.git)

[API de WebScraping](https://github.com/lucasoliveira04/api-scrapping.git)

---

### 👤 Autor

Feito com 💙 por **Lucas Oliveira Campos**
[LinkedIn](https://linkedin.com/in/lucas-oliveia-campos) | [GitHub](https://github.com/lucasoliveira04)

---
### 📄 Licença

Este projeto está sob uma licença proprietária. **Todos os direitos reservados.**  
É proibida a cópia, redistribuição, modificação ou uso comercial sem permissão expressa do autor.

© 2025 Lucas Oliveira Campos

