# FyNov - Fintech de Gestão Financeira Pessoal

<p align="center">
  <strong>O futuro das suas finanças começa agora.</strong>
</p>

<p align="center">
  Uma aplicação web moderna para controle de finanças pessoais, desenvolvida como projeto acadêmico para a FIAP.
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Páginas da Aplicação](#-páginas-da-aplicação)
- [Arquitetura JavaScript](#-arquitetura-javascript)
- [Armazenamento de Dados](#-armazenamento-de-dados)
- [Contribuidores](#-contribuidores)

---

## 🎯 Sobre o Projeto

**FyNov** é uma aplicação web de gestão financeira pessoal que permite aos usuários:

- Controlar recebimentos e gastos
- Criar e acompanhar metas financeiras
- Visualizar relatórios e gráficos interativos
- Interagir com um assistente virtual (chatbot)
- Gerenciar seu perfil de usuário

O projeto foi desenvolvido com foco em **usabilidade**, **design responsivo** e **experiência do usuário**, utilizando tecnologias web modernas.

---

## ✨ Funcionalidades

### Dashboard
- Resumo financeiro com saldo atual
- Comparativo mensal de recebimentos e gastos
- Gráficos de evolução financeira
- Distribuição de gastos por categoria
- Visualização das principais metas

### Recebimentos
- Cadastro de recebimentos com data, descrição, valor e categoria
- Edição e exclusão de registros
- Comparativo entre mês atual e anterior
- Gráfico comparativo

### Gastos
- Cadastro de gastos com data, descrição, valor e categoria
- Edição e exclusão de registros
- Comparativo entre mês atual e anterior
- Gráfico comparativo

### Metas
- Criação de metas financeiras com título, valor alvo e prazo
- Acompanhamento de progresso com barra visual
- Mensagens motivacionais dinâmicas
- Página de detalhes para adicionar valores à meta

### Assistente (Chatbot)
- Interface de chat estilizada
- Sugestões de perguntas pré-definidas
- Preparado para integração futura com IA

### Perfil
- Visualização e edição de informações pessoais
- Estatísticas da conta (totais e contagens)
- Opção de limpar todos os dados
- Logout

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **HTML5** | - | Estrutura semântica das páginas |
| **CSS3** | - | Estilização com variáveis CSS e Flexbox/Grid |
| **JavaScript** | ES6+ | Lógica da aplicação (vanilla JS) |
| **Bootstrap** | 5.3.8 | Framework CSS para componentes e responsividade |
| **Chart.js** | 4.4.0 | Biblioteca para gráficos interativos |
| **Font Awesome** | 6.4.0 | Biblioteca de ícones |
| **Google Fonts** | - | Fonte Outfit |

---

## 📁 Estrutura do Projeto

```
FyNov/
├── README.md                    # Documentação do projeto
└── src/
    ├── index.html               # Página inicial (landing page)
    └── assets/
        ├── images/              # Imagens e logos
        │   ├── logo.png
        │   └── image-main.png
        │
        ├── js/                  # Módulos JavaScript
        │   ├── app.js           # Inicialização principal
        │   ├── storage.js       # Persistência (localStorage)
        │   ├── utils.js         # Funções utilitárias
        │   ├── render.js        # Renderização da interface
        │   ├── charts.js        # Gráficos (Chart.js)
        │   ├── forms.js         # Gerenciamento de formulários
        │   └── profile.js       # Perfil do usuário
        │
        ├── pages/               # Páginas da aplicação
        │   ├── login.html       # Página de login
        │   ├── cadastro.html    # Página de cadastro
        │   ├── dashboard.html   # Dashboard principal
        │   ├── recebimentos.html# Gestão de recebimentos
        │   ├── gastos.html      # Gestão de gastos
        │   ├── metas.html       # Lista de metas
        │   ├── meta-detalhe.html# Detalhes de uma meta
        │   ├── chatbot.html     # Assistente virtual
        │   └── perfil.html      # Página de perfil
        │
        └── style/               # Folhas de estilo CSS
            ├── common.css       # Estilos compartilhados
            ├── index.css        # Landing page
            ├── login.css        # Página de login
            ├── cadastro.css     # Página de cadastro
            ├── dashboard.css    # Dashboard
            ├── recebimentos.css # Página de recebimentos
            ├── gastos.css       # Página de gastos
            ├── metas.css        # Página de metas
            ├── meta-detalhe.css # Detalhes da meta
            ├── chatbot.css      # Assistente virtual
            └── perfil.css       # Página de perfil
```

---

## 🚀 Como Executar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local (opcional, mas recomendado)

### Opção 1: Abrir diretamente

1. Clone ou baixe o repositório
2. Navegue até a pasta `src/`
3. Abra o arquivo `index.html` no navegador

### Opção 2: Usar servidor local

```bash
# Usando Python 3
cd src
python -m http.server 8000

# Ou usando Node.js (npx)
npx serve src

# Ou usando PHP
cd src
php -S localhost:8000
```

Acesse: `http://localhost:8000`

### Opção 3: Extensão Live Server (VS Code)

1. Instale a extensão "Live Server"
2. Clique com botão direito em `src/index.html`
3. Selecione "Open with Live Server"

---

## 📄 Páginas da Aplicação

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Landing Page | `index.html` | Página inicial com apresentação do produto |
| Login | `login.html` | Autenticação de usuários |
| Cadastro | `cadastro.html` | Registro de novos usuários |
| Dashboard | `dashboard.html` | Resumo financeiro e gráficos |
| Recebimentos | `recebimentos.html` | Gestão de entradas financeiras |
| Gastos | `gastos.html` | Gestão de saídas financeiras |
| Metas | `metas.html` | Lista de metas financeiras |
| Detalhe da Meta | `meta-detalhe.html` | Visualização e edição de meta específica |
| Assistente | `chatbot.html` | Interface de chat com assistente virtual |
| Perfil | `perfil.html` | Configurações e informações do usuário |

---

## 🏗 Arquitetura JavaScript

O JavaScript da aplicação é organizado em módulos independentes:

### `storage.js` - Camada de Dados
```javascript
// Funções CRUD para localStorage
getItems(key)           // Lê todos os itens
getItemById(key, id)    // Lê um item específico
saveItems(key, items)   // Salva array de itens
addItem(key, item)      // Adiciona novo item
updateItem(key, id, data) // Atualiza item existente
deleteItem(key, id)     // Remove item
```

### `utils.js` - Utilitários
```javascript
// Funções auxiliares
formatCurrency(value)    // Formata para BRL
escapeHtml(string)       // Previne XSS
getCurrentMonth()        // Mês atual
getPreviousMonth()       // Mês anterior
lastNMonths(n)          // Últimos N meses
sumByMonth(items, y, m) // Soma por mês
percentChange(cur, prev) // Variação percentual
```

### `charts.js` - Visualização
```javascript
// Gráficos com Chart.js
renderChartsIfExists()    // Renderiza todos os gráficos
renderComparisonCharts()  // Gráficos comparativos
```

### `render.js` - Interface
```javascript
// Renderização do DOM
renderListIfExists(key)      // Listas de itens
renderMonthComparison(key)   // Comparativos
renderDashboardSummary()     // Resumo do dashboard
renderPrincipaisMetas()      // Metas no dashboard
openEditModal(key, id)       // Abre modal de edição
confirmDelete(key, id)       // Confirmação de exclusão
```

### `profile.js` - Perfil
```javascript
// Gerenciamento de perfil
getProfile()        // Obtém perfil
saveProfile(data)   // Salva perfil
getInitial(name)    // Gera iniciais
renderProfileUI()   // Atualiza interface
initPerfilForm()    // Inicializa formulário
initLogout()        // Inicializa logout
```

### `forms.js` - Formulários
```javascript
// Manipulação de formulários
attachForm(key, formId)     // Formulário de adição
attachEditForm(key, formId) // Formulário de edição
```

### `app.js` - Inicialização
```javascript
// Ponto de entrada da aplicação
// Coordena inicialização de todos os módulos
```

---

## 💾 Armazenamento de Dados

A aplicação utiliza **localStorage** para persistência de dados no navegador.

### Chaves utilizadas:

| Chave | Tipo | Descrição |
|-------|------|-----------|
| `recebimentos` | Array | Lista de recebimentos |
| `gastos` | Array | Lista de gastos |
| `metas` | Array | Lista de metas |
| `fynov_user` | Object | Perfil do usuário |

### Estrutura dos dados:

```javascript
// Recebimento/Gasto
{
  id: 1707840000000,      // Timestamp único
  date: "2024-02-13",     // Data (YYYY-MM-DD)
  description: "Salário", // Descrição
  amount: 5000.00,        // Valor
  category: "Trabalho"    // Categoria
}

// Meta
{
  id: 1707840000000,       // Timestamp único
  title: "Viagem",         // Título
  target: 10000.00,        // Valor alvo
  current: 2500.00,        // Valor atual
  deadline: "2024-12-31"   // Prazo
}

// Perfil
{
  nome: "João Silva",
  email: "joao@email.com"
}
```

---

## 🎨 Design e UX

### Paleta de Cores

| Variável | Cor | Uso |
|----------|-----|-----|
| `--color-primary` | `#00c853` | Cor principal (verde) |
| `--color-primary-hover` | `#00e676` | Hover da cor principal |
| `--color-surface` | `#ffffff` | Fundo de cards |
| `--color-text` | `#1a1d21` | Texto principal |
| `--color-text-muted` | `#5f6368` | Texto secundário |

### Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Mobile**: 480px - 768px
- **Small Mobile**: < 480px

---

## 👥 Contribuidores

Projeto desenvolvido para a disciplina de **Desenvolvimento Web** da **FIAP**.

---

## 📝 Licença

Este projeto é de uso acadêmico e está sob licença MIT.

---

<p align="center">
  Feito com 💚 pela equipe FyNov
</p>
