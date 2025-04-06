### 3.3.2 Processo 2 - Controle de Precificação
 
Este documento apresenta o processo de **Controle de Precificação** no cenário atual (**AS IS**) e a proposta de melhoria (**TO BE**). Em cada etapa, são descritas as atividades, os campos e comandos que compõem o fluxo do processo.

---

## Oportunidades de Melhoria

- **Automatização de verificação: No modelo "To Be", a automação do processo de verificação da data de validade e quantidade do produto pode ser mais robusta, garantindo maior eficiência e redução de erros manuais.
- **Otimização do processo de decisão: O processo "To Be" propõe um fluxo de decisões mais detalhado, oferecendo diferentes alternativas para aplicar descontos. Isso pode ser melhorado ao considerar um sistema preditivo para sugerir automaticamente os melhores descontos com base em dados históricos de vendas.
- **Ausência de alertas** Integração de sistemas: Integrar o sistema de precificação diretamente com o sistema de gestão de estoque pode reduzir o tempo de processamento e aumentar a precisão na verificação de disponibilidade e validade dos produtos.

---

## 3.3.1.1 Processo 2 – AS IS

### Modelo BPMN do Processo AS IS

A seguir, são descritas as atividades presentes nos diagramas do processo de Controle de Precificação, com base nos modelos "As Is".
![image](./images/processes/controle-precificacao-as-is.jpg)


##### **Atividade 1 – Verificar produtos em prateleira e estoque**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Produto         | Caixa de Texto   | Código do produto |                   |
| Quantidade      | Número           | Maior que 0     |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Verificar            | Atividade "Verificar data de validade" | default           |

##### **Atividade 2 – Verificar data de validade**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Produto         | Caixa de Texto   | Código do produto |                   |
| Data de validade | Data             | Não expirada   |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Validar             | Atividade "Aplicar desconto"    | default           |
| Refazer             | Atividade "Verificar outros produtos" | cancel |

##### **Atividade 3 – Aplicar desconto para saída do produto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Desconto        | Número           | Entre 10% e 50% |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Aplicar             | Fim do Processo                 | default           |

## 3.3.1.2 Processo 2 – TO BE

### Modelo BPMN do Processo TO BE
![image](./images/processes/controle-precificacao-to-be.jpg)


A seguir, são descritas as atividades presentes nos diagramas do processo de Controle de Precificação, com base nos modelos "To Be".

##### **Atividade 1 – Informar ao sistema código ou referência dos itens**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Código/Referência | Caixa de Texto   | Código válido do produto |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar               | Atividade "Verificar data de validade" | default           |

##### **Atividade 2 – Realizar projeção de saída mínima diária**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Quantidade mínima | Número           | Valor calculado com base no histórico de vendas |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Calcular             | Atividade "Oferecer opções de descontos" | default           |

##### **Atividade 3 – Oferecer opções de descontos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Opções de desconto | Seleção múltipla | 10%, 20%, 30%  | 10%               |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Escolher             | Atividade "Aplicar desconto ao produto" | default           |