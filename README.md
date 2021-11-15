# SETE WEB

Esse projeto é feito em ReactJs e possui uma estrutura característica com o objetivo de melhorar a experiência de desenvolvimento e separar as responsabilidades dentro do código deixando ele mais escalável e mais legível.

## Estrutura Base

O core do projeto é feito a partir dos seguintes elementos: **Components**, **Pages**, **Routes**.

-   Components: Esses são os blocos que criam a aplicação. Eles são separados em **Macro** e **Micro**.

    -   Micro: Partes base que sozinhos não tem significado, mas em conjunto criam funcionalidades ou experiências de usuário. Exemplos deles são: Inputs, Headings, Buttons, etc...
    -   Macro: São blocos maiores e que podem englobar toda a aplicação. Eles podem ser compostos de componentes Micro e só estão separados, pois tem uma responsabilidade maior dentro do sistema.

-   Pages: Esse elemento concatena todos os Components num local com signficado verdadeiro para o usuário. É onde se há a junção dos componentes Macro e Micro para a criação da interface desejada.

-   Routes: Essa pasta contém a lógica e regra de negócio do sistema (quem pode entrar ou não em qual **Page**). Ela serve para transformar as páginas do React num site real.

Essa estrutura pode ser comparada em partes com o pattern _Atomic Design_. Então os Components Micro são os átomos e organismos, os Components Macro são os templates e as Pages são de fato as pages

## Estrutura Auxiliar

Apenas componentes não são suficientes para gerar funcionalidades para o sistema. Em uma aplicação é possível encontrar algoritmos e lógicas complexas, integrações com Apis externas, bibliotecas de terceiros para gerar uma funcionalidade específica, validações usando Regex, etc... Para isso o SETE WEB possui: **Configs**, **Helpers**, **Services** e **Validators**.

-   Configs: Servem para armazenar tokens utilizados em várias partes da aplicação. Um exemplo de config seriam os parâmetros utilizados no firebase. Ou o maxAge de um cookie padronizado para todos os cookies da aplicação...

-   Helpers: São classes que contém métodos puros, ou seja, recebem um input e retornam um output baseado nesse dado recebido.

-   Services: São classes que contém todos os métodos de conexão com as apis.

-   Validators: São schemas que servem para validar os campos de toda a aplicação.

## Imagens e Estilizações

A maior parte das estilizações são feitas dentro do próprio componente e o seu escopo é só aquele bloco. Entretanto, muitas vezes é preciso criar estilos globais e isso é feito na pasta **Styles**. O mesmo acontece com as imagens, muitas delas são importadas no próprio componente através de bibliotecas externas, entretanto, elas também podem ser utilizadas num escopo global por meio da pasta **Assets**.

## ReactJs

Essa estrutura pode ser utilizada para projetos independente da tecnologia, entretanto, algumas partes dela como o _State Management_ são específicas do framework. No SETE WEB, duas pastas desse tipo chamam a atenção: **Hooks**, **Contexts**.

-   Hooks: São estruturas que utilizam funcionalidades do React para criar efeitos novos.

-   Contexts: São as apis próprias do React que estão sendo utilizadas para lidar com os estados da aplicação.
