# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

Os planos de teste a seguir compreendem as principais funcionalidades do projeto, visando cobrir seus principais requisitos.

| **Caso de teste**  | **CT-001 – Cadastrar usuário**  |
|:---: |:---: |
| Requisito associado | RF-009 - Permitir o cadastro de múltiplas lojas ou unidades de negócio |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador <br>https://validata-front.vercel.app/<br> - Clicar em "Entrar/Cadastrar" <br> - Preencher os campos de Nome, Email e Senha - Clicar em "Criar Conta"
| Responsável pela elaboração do caso de teste | Victor. |

<br>

| **Caso de teste**  | **CT-002 – Cadastrar produto**  |
|:---: |:---: |
| Requisito associado | RF-001 - Permitir o cadastro de produtos com informações de código, nome, preço de custo, preço de venda, margem de lucro e data de validade <br> RF010 - Integrar com leitor de código de barras para agilizar o cadastro e baixa de produtos|
| Objetivo do teste | Verificar se o usuário consegue cadastrar um produto a partir da leitura do seu código de barras. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, clicar em "Cadastrar produto" <br> - Posicionar código de barras do produto na camera <br> - Preencher o formulário de especificações do produto <br> - Clicar em "Cadastrar" |
| Critério de êxito | - O produto foi cadastrado com sucesso. |
| Responsável pela elaboração do caso de teste | Raphael. |

<br>

| **Caso de teste**  | **CT-003 – Controle de estoque**  |
|:---: |:---: |
| Requisito associado | RF003 - Emitir alertas de produtos próximos ao vencimento. <br> RF007 - Gerar etiquetas de preço destacando produtos em promoção por vencimento|
| Objetivo do teste | Verificar se o usuário consegue interagir com as funções de controle de estoque. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, na página de Estoque, devem ser listados os produtos já cadastrados <br> - Dever ser mostrado um dashboard mostrando a amostragem de produtos por categoria <br> - Os produtos a vencer na semana <br> - Lotes podendo ser filtrados por categoria, quantidade, validade ou data de criação <br>
| Critério de êxito | - Os produtos são listados na página inicial |
| Responsável pela elaboração do caso de teste | Gustavo. |

<br>

| **Caso de teste**  | **CT-004 – Análises de Vencimentos**  |
|:---: |:---: |
| Requisito associado | RF004 - Calcular automaticamente sugestões de desconto baseadas na proximidade do vencimento e histórico de saída do produto. <br> RF006 - Possibilitar a aplicação de descontos em lote para produtos selecionados. <br> RF015 - Enviar notificações para dispositivos móveis sobre produtos críticos (muito próximos ao vencimento)|
| Objetivo do teste | Verificar se o usuário consegue interagir com as funções de análise de vencimentos. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, na página de Análise de Vencimentos, deve ser mostado: <br> - O Total de produtos vencendo <br> - Os produtos com urgência no prazo de vencimento <br> - Quais são os lotes afetados <br> - Qual o período vigente da análise <br>
| Critério de êxito | - Os produtos a se aproximarem do prazo de validade devem ser listados |
| Responsável pela elaboração do caso de teste | Carlos. |

<br>

| **Caso de teste**  | **CT-005 – Análises de Vendas**  |
|:---: |:---: |
| Requisito associado | RF002 - Permitir o registro histórico das vendas por produto. <br> RF005 - Permitir a definição de margens mínimas de lucro por produto ou categoria <br> RF008 - 	Emitir relatórios de produtos vendidos com desconto versus produtos perdidos por vencimento <br> RF011 - Permitir a configuração de regras personalizadas para cálculo automático de descontos. <br> RF012 - Exibir gráficos e estatísticas de desempenho de vendas e perdas |
| Objetivo do teste | Verificar se o usuário consegue interagir com as funções de análises de vendas. |
| Passos | - Acessar o navegador <br> https://validata-front.vercel.app/ <br> - Com login efetuado, na página de Análise de Vendas, deve ser mostado: <br> - A receita total <br> - As tendências de vendas <br> - Os produtos mais vendidos <br> - Dashboard de vendas por período <br> - Dashboard de produtos mais vendidos <br>
| Critério de êxito | - Os dados das vendas devem ser exibidos na tela. |
| Responsável pela elaboração do caso de teste | Gabriel. |


## Ferramentas de testes (opcional)

- DevTools do navegador (Chrome, Edge, FireFox e Brave).
- Postman.
