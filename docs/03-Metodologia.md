# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A metodologia adotada pelo grupo se deu por reuniões semanais no período determinado para a aula da disciplina, as principais discussões e decisões foram feitas via grupo no WhatsApp e conversas no Discord. Também ao longo dessa sprint tivemos a visita no parceiro, Padaria Soares, para retirar mais ideias, insights e tomar consciência de como todo o fluxo estudado é na pratica e no dia a dia de trabalho. Durante essa sprint, não foi iniciado a codificação, ou seja, ainda não houve uma gestão solida das branchs e versões do projeto.

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

A gestão do repositório é feita por meio da abertura de _Pull Requests_ após o desenvolvimento de cada atividade em branches separadas e pela respectiva aprovação por um revisador da equipe atribuído.

Cada atividade é desenvolvida ao longo do determinado período de tempo alocado e fragmentada em diversos _commits_ seguindo a convenção [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para organização, nomenclatura e legibilidade dos _commits_.

Exemplo de commit:

```txt
feat: add expiration date rule component on homepage
```

Branches de desenvolvimento são organizadas e definidas seguindo a convenção [Conventional Branches](https://conventional-branch.github.io/), se assimilando com a convenção de commits para facilitar a identificação e correlação de branch x tarefa.

```txt
chore/docs-sprint-2
```

Branches de desenvolvimento como a do exemplo acima são implementadas à branch `dev`, que representa a versão de desenvolvimento do software, e seguem até a versão final na branch `main`. Cada entrega segue o fluxo: `feature` -> `dev` -> `unstable` -> `main`.

## Planejamento do projeto

### Divisão de papéis

#### Sprint 1

- _Scrum master_: Guilherme
- Protótipos: N/A
- Testes: N/A
- Documentação: Carlos, Gabriel, Guilherme, Gustavo e Victor
- Apresentação: Gabriel e Raphael

#### Sprint 2

- _Scrum master_: Carlos
- Documentação: Raphael, Guilherme
- Apresentação: Gustavo
- Modelagem: Gabriel e Victor

### Quadro de tarefas

#### Sprint 1

Atualizado em: 16/03/2025

| Responsável | Tarefa/Requisito       | Iniciado em |   Prazo    | Status | Terminado em |
| :---------- | :--------------------- | :---------: | :--------: | :----: | :----------: |
| Guilherme   | Introdução             | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Guilherme   | Objetivos              | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Carlos      | Histórias de usuário   | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Carlos      | Personas               | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Gustavo     | Documento do projeto   | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Victor      | Documento do projeto   | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Gabriel     | Documento do projeto   | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Gabriel     | Apresentação em slides | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |
| Raphael     | Apresentação em slides | 11/03/2025  | 16/03/2025 |   ✔️   |  16/03/2025  |

#### Sprint 2

Atualizado em: 21/04/2024

| Responsável | Tarefa/Requisito      | Iniciado em |   Prazo    | Status | Terminado em |
| :---------- | :-------------------- | :---------: | :--------: | :----: | :----------: |
| Carlos      | Gerenciamento do repo | 04/04/2025  | 06/04/2025 |   ✔️   |  06/04/2025  |
| Raphael     | Documentação          | 04/04/2025  | 06/04/2025 |   ✔️   |  06/04/2025  |
| Guilherme   | Documentação          | 04/04/2025  | 06/04/2025 |   ✔️   |  06/04/2025  |
| Gustavo     | Slides                | 04/04/2025  | 06/04/2025 |   ✔️   |  06/04/2025  |
| Gabriel     | Modelagem             | 04/04/2025  | 06/04/2025 |   ✔️   |  06/04/2025  |
| Victor      | Modelagem             | 04/04/2025  | 06/04/2025 |   ✔️   |  06/04/2025  |

Legenda:

- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                    | Plataforma      | Link de acesso                                                                  |
| --------------------------- | --------------- | ------------------------------------------------------------------------------- |
| Repositório de código fonte | GitHub          | https://github.com/ICEI-PUC-Minas-PBE-ADS-SI/2025-1-p5-tias-validata            |
| Documentação do projeto     | GitHub          | https://github.com/ICEI-PUC-Minas-PBE-ADS-SI/2025-1-p5-tias-validata            |
| Relatório do projeto        | Google Docs     | https://docs.google.com/document/d/1R6OyTA9ebJEBLwtKkMx5nWHadldS-rxH3FEx8CxLjog |
| Gerenciamento do projeto    | GitHub Projects | https://github.com/orgs/ICEI-PUC-Minas-PBE-ADS-SI/projects/35/                  |
| Modelagem de processos      | Bizagi          | N/A                                                                             |
| Comunicação em grupo        | WhatsApp        | N/A                                                                             |
| Reuniões em grupo           | Discord         | N/A                                                                             |
