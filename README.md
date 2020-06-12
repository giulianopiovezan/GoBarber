<h1 align="center">
    <img alt="Gobarber" src="https://ik.imagekit.io/hwyksvj4iv/gobarber_19xmN2BUU.svg" width="250px" />
</h1>

<p align="center">
  <a href="#page_with_curl-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#books-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-iniciando-backend">Node.js</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-iniciando-frontend">ReactJS</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


## :page_with_curl: Sobre

Plataforma de agendamento de serviços para proprietários de barbearias ou salões de beleza. Nessa aplicação o usuário consegue ter acesso a todos os prostadores de serviços cadastrados através de um aplicativo mobile, com isso o usuário consegue escolher um prestador para marcar seu agendamento.

Já o prestador de serviço, através de um interface Web, consegue ter acesso a todos os seus horários, podendo ver todos os que estão ocupados quanto os que estão disponíveis.

**Node.js**: é uma API REST que faz todo o CRUD da aplicação, persistência de dados, tratativa de exceções e que serve dados tanto ao front-end quanto ao mobile.

**ReactJS**: é uma página Web no qual o prestador de serviço tem acesso a todo o seu calendário de agendamentos.


## Requisitos
- [**Git**](https://git-scm.com/)
- [**Node.js**](https://nodejs.org/en/)
- [**Docker**](https://www.docker.com/)
- Um dispositivo ou emulador iOS ou Android

## Iniciando backend
```bash
  $ cd server

  $ yarn

  $ yarn typeorm migration:run

  $ yarn dev:server
```

## Iniciando frontend
```bash
  $ cd frontend

  $ yarn

  $ yarn start
```
