Desafio Globo.com
=========

Autor 

    Esse app foi desenvolvido por Leonardo Andrade <leonardopandrade@gmail.com>

Sobre

    O projeto é uma prova de conceito de um Feed de mensagens desenvolvido utilizando Nodejs.

    O projeto consiste basicamente em duas telas:
        -> Identificação
        -> Feed de Mensagens

    Na tela de identificação, o usuário insere o seu nome e um link para o avatar.

    Na tela de Feed de mensagens, o usuário pode ler e acrescentar novas mensagens.
    As mensagens estão ordernas pela a mais nova até a mais antiga.


Pré-requisito

    Como pré-requisito, para você rodar o projeto, é necessário ter o Node.js v0.10.31 instalados na sua maquina.

Executando

    Para executar-lo basta e rodar o comando 'make run'.

Alguns pontos de melhora:

    Como o projeto foi desenvolvido como "prova de conceito", algumas coisas foram deixadas de lado para facilitar o desenvolvimento e distribuição do projeto;

    Ex:
        -> Não foi configurado um cluster de nós para o Node.js.
        -> Tendo em vista o ponto acima, foi configurado um controle de sessão apenas em memória.
        -> Foi utilizado o SQlite como banco de dados.
        -> Os arquivos estáticos servidos pelo servidor (css e js), não foram tratados (min, obsfucação, concat e etc).
        -> O Log apenas é gerado no console.
        -> Validação que o avatar do usuário é realmente uma imagem.
