import type { Prisma } from "../../../generated/client.js";

export const O_CASO_DO_AUDITOR: Prisma.ChallengeCreateManyInput[] = [
  {
    position: 4,
    title: "A Testemunha Oculta",
    validation_query: "SELECT nome FROM pessoas WHERE id = 1408;",
    difficulty: "EASY",
    group_slug: "o-caso-do-auditor",
    group_title: "O Caso do Auditor",
    markdown: `Um assassinato ocorreu em um lugar movimentado às 19:30. A única testemunha foi um senhor de idade (com no mínimo 65 anos) que passava pelo local.

Descubra o nome da testemunha.`,
  },
  {
    position: 5,
    title: "O Executor Mascarado",
    validation_query: "SELECT nome FROM pessoas WHERE id = 3291;",
    difficulty: "MEDIUM",
    group_slug: "o-caso-do-auditor",
    group_title: "O Caso do Auditor",
    markdown: `A testemunha não conseguiu ver o rosto do criminoso porque ele usava uma balaclava, mas lembra perfeitamente das roupas: uma **jaqueta amarela com listras vermelhas**. Ela também mencionou que, during a luta, a vítima desferiu um corte profundo no braço do assassino — um ferimento grave que exigiu atendimento médico imediato.

Descubra o nome do assassino.`,
  },
  {
    position: 6,
    title: "O Intermediário Corporativo",
    validation_query: "SELECT nome, ocupacao FROM pessoas WHERE id = 5012;",
    difficulty: "HARD",
    group_slug: "o-caso-do-auditor",
    group_title: "O Caso do Auditor",
    markdown: `O executor confessou que foi pago para cometer o crime por meio de uma transferência bancária remota. Ele não sabe o valor exato, mas revelou que a quantia correspondia a exatamente **7 vezes o salário médio** do seu cargo.

Descubra o nome e a ocupação de quem autorizou o pagamento e sua empresa.`,
  },
  {
    position: 7,
    title: "O Verdadeiro Mandante",
    validation_query:
      "SELECT nome, ocupacao, (SELECT nome_empresa FROM contas_bancarias WHERE numero_conta = '4028-5') as empresa FROM pessoas WHERE id = 8743;",
    difficulty: "HARD",
    group_slug: "o-caso-do-auditor",
    group_title: "O Caso do Auditor",
    markdown: `A pessoa que autorizou a transferência alegou ter apenas seguido ordens recebidas por um e-mail interno enviado "de cima". Descobrimos também que a vítima era responsável pela auditoria financeira da empresa e havia agendado uma reunião urgente com a diretoria para expor uma grande fraude interna.

Descubra o nome e a ocupação do verdadeiro mandante, além da empresa que agiu por trás do crime.`,
  },
];
