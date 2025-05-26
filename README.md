# THE DOG FRONTEND

Este projeto foi gerado usando o [Angular CLI](https://github.com/angular/angular-cli) versão 17.2

## 📦 Sobre o Projeto

DogCrud é uma aplicação Angular que consome a [The Dog API](https://thedogapi.com/) para:

- Listar raças de cães
- Visualizar detalhes de raças
- Exibir imagens
- Aprender mais sobre as características de cada cão

## 🗂️ Estrutura de Pastas

A arquitetura do projeto foi pensada para manter a organização e escalabilidade da aplicação:

```bash
├── src/
│   ├── app/
│   │   ├── home/                       # Funcionalidades principais
│   │   │   ├── dog/                   # Lógica e UI de raças
│   │   │   ├── layouts/              # Header, sidebar, etc.
│   │   │   └── welcome/              # Página de boas-vindas
│   │   ├── shared/                    # Elementos reutilizáveis
│   │   │   ├── components/           # Componentes genéricos (ex: search-bar)
│   │   │   └── services/             # Serviços (ex: TheDogAPI)
│   │   └── app.routes.ts             # Configuração de rotas
│   ├── assets/                        # Imagens, fontes, etc.
│   ├── environments/                 # Ambientes (dev, prod)
│   └── scss/                          # Estilos globais
├── .dockerignore                     # Arquivos/pastas ignorados no Docker
├── .gitignore                        # Ignorados pelo Git
├── angular.json                      # Configuração do Angular CLI
├── jest.config.ts                    # Configuração do Jest
├── setup-jest.ts                     # Setup para Jest (zone.js, etc)
├── tsconfig.json                     # Configurações do TypeScript
├── tsconfig.app.json                 # TS config da app
├── tsconfig.spec.json                # TS config para testes
├── package.json                      # Dependências e scripts
├── Dockerfile                        # Build do Angular + NGINX
├── docker-compose.yml                # Orquestração com Docker Compose
├── nginx.conf                        # Configuração de NGINX para SPA
└── README.md
```

## ▶️ Rodando o Servidor de Desenvolvimento

Antes de iniciar o servidor, instale as dependências do projeto com o comando:

```bash
npm install
```

Para iniciar o servidor local:

```bash
npm start
```

## 🐳 Rodando com Docker

1. Build e execute o container:

```bash
docker-compose up --build

```

Depois, acesse [http://localhost:4200/](http://localhost:4200/). O app recarregará automaticamente ao salvar arquivos.

![alt text](./src/assets/images/readme/the-dog-welcome.png)

## ⚙️ Gerando Componentes com o Angular CLI

```bash
ng generate component component-name

```

Para ver todos os esquemas disponíveis:

```bash
ng generate --help
```

## 🛠️ Build

Para compilar o projeto:

```bash
ng generate --help
```

O resultado será salvo no diretório dist/.

## ✅ Testes Unitários

O projeto possui testes unitários escritos com **Jest** .

### Para rodar os testes:

```bash
npm run test
```

![alt text](./src/assets/images/readme/jest.png)

### Os testes validam:

- ✅ Comportamento dos componentes (ex: clique em botões, emissão de eventos)
- ✅ Reações a inputs e interações do usuário
- ✅ Serviços com mocks da API
- ✅ Rotas e navegação entre páginas

---

## 🌱 GitFlow e Versionamento

O projeto segue o fluxo de desenvolvimento **GitFlow**:

- `main`: branch de produção
- `develop`: branch de desenvolvimento
- `feature/nome-da-feature`: novas funcionalidades
- `bugfix/nome-do-bug`: correções específicas

---

![alt text](./src/assets/images/readme/gitkrakem.png)

## Recursos Adicionais

Para obter mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comando, visite o [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) página.
