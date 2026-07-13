import type { Prisma } from "../../../generated/client.js";

export const FURTO_NOTURNO: Prisma.ChallengeCreateManyInput[] = [
  {
    position: 1,
    title: "Quem é o Culpado?",
    validation_query: "SELECT nome FROM pessoas WHERE id = 42;",
    difficulty: "EASY",
    group_slug: "furto-noturno",
    group_title: "Furto Noturno",
    markdown: `A obra "A Noite Estrelada" foi furtada da "Sala de Pinturas Francesas" no dia 15 de Abril de 2026. A segurança relatou que a porta registrou uma única entrada exatamente às 18:30.

Descubra o nome do invasor.`,
  },
  {
    position: 2,
    title: "O cúmplice da Fuga",
    validation_query: "SELECT nome FROM pessoas WHERE id = 88;",
    difficulty: "MEDIUM",
    group_slug: "furto-noturno",
    group_title: "Furto Noturno",
    markdown: `O invasor não agiu sozinho. Ele recebeu uma mensagem de texto no dia do crime (15/04/2026) contendo a palavra **"pronto"**. Uma testemunha que estava na rua afirmou ter visto o carro de fuga: era um **SUV Azul**. Precisamos do nome de quem dirigia o carro de fuga.

Descubra o nome do motorista do SUV azul que enviou a mensagem para o invasor.`,
  },
  {
    position: 3,
    title: "O Funcionário Corrupto",
    validation_query: "SELECT ocupacao FROM pessoas WHERE id = 99;",
    difficulty: "HARD",
    group_slug: "furto-noturno",
    group_title: "Furto Noturno",
    markdown: `Capturamos o cúmplice (ID 88), e ele confessou tudo. Ele disse que foi contratado por um funcionário do próprio museu, mas que não sabe o nome dele. As únicas dicas que o cúmplice nos deu foram:

- "Eu enviei uma mensagem para o mandante exatamente às 18:35 do dia do crime confirmando a fuga."
- "O mandante trabalha na sala onde fica exposta alguma obra de *Leonardo da Vinci*."
- "Eu vi o mandante saindo do museu logo depois da minha mensagem. He dirige um carro Prata."

Descubra a ocupação (cargo) do mandante do crime.`,
  },
];
