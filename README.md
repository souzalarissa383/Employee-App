# EmployeeApp

O **EmployeeApp** é um aplicativo móvel desenvolvido em React Native que permite visualizar e gerenciar uma lista de funcionários. O aplicativo inclui funcionalidades como pesquisa, expansão de informações dos funcionários e formatação de dados como telefones e datas.

## Funcionalidades

- **Lista de Funcionários**: Exibe uma lista de funcionários com foto, nome, cargo, data de admissão e telefone.
- **Pesquisa**: Permite filtrar os funcionários por nome, cargo ou telefone.
- **Expansão de Informações**: Ao clicar em um funcionário, exibe informações adicionais como cargo, data de admissão e telefone formatado.
- **Formatação de Dados**: Telefones e datas são formatados no front-end para exibição amigável.
- **Navegação**: Navegação entre telas usando o React Navigation.
- **Carregamento e Tratamento de Erros**: Exibe um indicador de carregamento e mensagens de erro ao buscar dados.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Plataforma para facilitar o desenvolvimento e teste de aplicativos React Native.
- **React Navigation**: Biblioteca para gerenciamento de navegação no aplicativo.
- **Moment.js**: Biblioteca para formatação de datas.
- **JSON Server**: Simula uma API RESTful para fornecer dados de funcionários.
- **TypeScript**: Adiciona tipagem estática ao projeto para maior segurança e produtividade.
- **Jest e Testing Library**: Para testes unitários e de integração.

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (opcional, mas recomendado)

### Passos para Configuração

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/EmployeeApp.git
cd EmployeeApp
```

2. **Instale as dependências**:

```bash
npm install
# ou
yarn install
```

3. **Inicie o JSON Server**:

O JSON Server simula uma API RESTful. Para iniciá-lo, execute:

```bash
npx json-server --watch database.json --port 3000
```

Certifique-se de que o arquivo `database.json` está na raiz do projeto com os dados dos funcionários.

4. **Execute o aplicativo**:

Para rodar o aplicativo no ambiente de desenvolvimento, use:

```bash
npm start
# ou
yarn start
```

Isso abrirá o Metro Bundler. Você pode escanear o QR code com o aplicativo Expo Go (disponível na App Store e Google Play) ou rodar em um emulador.

## Estrutura do Projeto

```
EmployeeApp/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── EmployeeList.tsx
├── src/
│   ├── data/
│   │   ├── datasources/
│   │   │   └── EmployeeDataSource.ts
│   │   └── repositories/
│   │       └── EmployeeRepository.ts
│   ├── domain/
│   │   └── models/
│   │       └── Employee.ts
│   ├── presentation/
│   │   └── screens/
│   │       └── EmployeeListScreen.tsx
│   └── usecases/
│       └── GetEmployees.ts
├── tests/
│   ├── data/
│   │   ├── datasources/
│   │   │   └── EmployeeDataSource.test.ts
│   │   └── repositories/
│   │       └── EmployeeRepository.test.ts
│   ├── domain/
│   │   └── models/
│   │       └── Employee.test.ts
│   ├── presentation/
│   │   └── screens/
│   │       └── EmployeeListScreen.test.tsx
│   │   ├── navigation/
│   │   │   ├── AppNavigator.integration.test.tsx
│   │   │   └── AppNavigator.test.tsx
│   └── usecases/
│       └── GetEmployees.test.ts
├── assets/
│   └── images/
│       └── logo.png
├── database.json
├── package.json
└── README.md
```

## Testes

O projeto inclui testes unitários e de integração para garantir a qualidade do código. Para executar os testes, use o seguinte comando:

```bash
npm test
# ou
yarn test
```

### Testes Disponíveis

- **Testes de Navegação**: Verifica se a navegação entre telas está funcionando corretamente.
- **Testes de Tela**: Verifica se a `EmployeeListScreen` renderiza corretamente e se as funcionalidades de pesquisa e expansão funcionam.
- **Testes de Repositório**: Verifica se o repositório de funcionários está funcionando corretamente.