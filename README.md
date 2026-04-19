# teste-econet

Projeto criado com Vuetify CLI.

## ❗️ Documentação

- Primary docs: https://vuetifyjs.com/
- Getting started guide: https://vuetifyjs.com/en/getting-started/installation/
- Community support: https://community.vuetifyjs.com/
- Issue tracker: https://issues.vuetifyjs.com/

## 🧱 Stack

- Framework: Vue 3 + Vite
- UI Library: Vuetify
- Gerenciamento de estado: Pinia
- Linguagem: TypeScript
- Package manager: npm

## 📁 Estrutura do Projeto

- `src/main.ts` — ponto de entrada da aplicação
- `src/App.vue` — componente raiz
- `src/api` — instância de criação da api
- `src/components/` — componentes reutilizáveis
- `src/dbjson` — base de dados para rodar com json server com o comando:
```bash
json-server --watch db.json --port 3000
```
- `src/layouts` — layouts globais
- `src/plugins/` — plugin registration and setup
- `src/routes` — definição de rotas
- `src/stores` — definição de store
- `src/styles/` — estilos globais e configurações de tema
- `src/types` — definição de types
- `src/utils` — funções úteis reutilizáveis
- `src/views` — páginas da aplicação
- `public/` — arquivos públicos estáticos

## 💿 Instalação

Utilize o gerenciador de pacotes escolhido (npm) para instalar as dependências:

```bash
npm install
```

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🧪 Available Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run build-only`
- `npm run type-check`