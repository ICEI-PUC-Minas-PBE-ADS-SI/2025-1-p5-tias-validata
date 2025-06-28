# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

Os planos de teste a seguir compreendem as principais funcionalidades do projeto, visando cobrir seus principais requisitos.

| **Caso de teste**  | **CT-001 – Cadastrar usuário**  |
|:---: |:---: |
| Requisito associado | RF-001 - Deve ser possível que um novo usuário se cadastre no sistema |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador <br>https://validata-front.vercel.app/<br> - Clicar em "Entrar/Cadastrar" <br> - Preencher os campos de Nome, Email e Senha - Clicar em "Criar Conta"
| Responsável pela elaboração do caso de teste | Victor. |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-002 - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail e senha. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Clicar no botão "Entrar/Cadastrar" <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Entrar na conta" |
| Critério de êxito | - O login foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Victor. |

<br>

| **Caso de teste**  | **CT-003 – Cadastrar produto**  |
|:---: |:---: |
| Requisito associado | RF-003 - O usuário deve poder realizar o cadastro de um produto. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar um produto a partir da leitura do seu código de barras. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, clicar em "Cadastrar produto" <br> - Posicionar código de barras do produto na camera <br> - Preencher o formulário de especificações do produto <br> - Clicar em "Cadastrar" |
| Critério de êxito | - O produto foi cadastrado com sucesso. |
| Responsável pela elaboração do caso de teste | Raphael. |

<br>

| **Caso de teste**  | **CT-004 – Listar produtos**  |
|:---: |:---: |
| Requisito associado | RF-004 - O usuário deve poder listar os produtos cadastrados. |
| Objetivo do teste | Verificar se o usuário consegue listar os produtos já cadastrados. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, na página inicial, devem ser listados os produtos já cadastrados
| Critério de êxito | - Os produtos são listados na página inicial |
| Responsável pela elaboração do caso de teste | Guilherme. |

<br>

| **Caso de teste**  | **CT-005 – Controle de estoque**  |
|:---: |:---: |
| Requisito associado | RF-005 - O usuário deve poder verificar os produtos em estoque, data de validade e analisar um dashboard dinâmico. |
| Objetivo do teste | Verificar se o usuário consegue interagir com as funções de controle de estoque. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, na página de Estoque, devem ser listados os produtos já cadastrados <br> - Dever ser mostrado um dashboard mostrando a amostragem de produtos por categoria <br> - Os produtos a vencer na semana <br> - Lotes podendo ser filtrados por categoria, quantidade, validade ou data de criação <br>
| Critério de êxito | - Os produtos são listados na página inicial |
| Responsável pela elaboração do caso de teste | Gustavo. |

<br>

| **Caso de teste**  | **CT-006 – Dashboard de Análises de Vencimentos**  |
|:---: |:---: |
| Requisito associado | RF-006 - O usuário deve poder verificar os produtos próximos a data de validade. |
| Objetivo do teste | Verificar se o usuário consegue interagir com as funções de análise de vencimentos. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, na página de Análise de Vencimentos, deve ser mostado: <br> - O Total de produtos vencendo <br> - Os produtos com urgência no prazo de vencimento <br> - Quais são os lotes afetados <br> - Qual o período vigente da análise <br>
| Critério de êxito | - Os produtos a se aproximarem do prazo de validade devem ser listados |
| Responsável pela elaboração do caso de teste | Carlos. |

<br>

| **Caso de teste**  | **CT-007 – Dashboardd de Análises de Vendas**  |
|:---: |:---: |
| Requisito associado | RF-007 - O usuário deve poder verificar as métricas de vendas. |
| Objetivo do teste | Verificar se o usuário consegue interagir com as funções de análises de vendas. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, na página de Análise de Vendas, deve ser mostado: <br> - A receita total <br> - As tendências de vendas <br> - Os produtos mais vendidos <br> - Dashboard de vendas por período <br> - Dashboard de produtos mais vendidos <br>
| Critério de êxito | - Os dados das vendas devem ser exibidos na tela. |
| Responsável pela elaboração do caso de teste | Gabriel. |


## Ferramentas de testes (opcional)

- DevTools do navegador (Chrome, Edge, FireFox e Brave).
- Postman.
