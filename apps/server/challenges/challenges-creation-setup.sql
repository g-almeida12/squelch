-- GROUP: Furto Noturno
INSERT OR IGNORE INTO challenges 
(position, title, validation_query, difficulty, group_slug, group_title, markdown) VALUES 
(
  1,
  'Quem é o Culpado?', 
  'SELECT nome FROM pessoas WHERE id = 42;', 
  'EASY', 
  'furto-noturno', 
  'Furto Noturno', 
  'A obra "A Noite Estrelada" foi furtada da "Sala de Pinturas Francesas" no dia 15 de Abril de 2026. A segurança relatou que a porta registrou uma única entrada exatamente às 18:30.

  Descubra o nome do invasor.'
),
(
  2,
  'O cúmplice da Fuga', 
  'SELECT nome FROM pessoas WHERE id = 88;', 
  'MEDIUM', 
  'furto-noturno', 
  'Furto Noturno', 
  'O invasor não agiu sozinho. Ele recebeu uma mensagem de texto no dia do crime (15/04/2026) contendo a palavra **"pronto"**. Uma testemunha que estava na rua afirmou ter visto o carro de fuga: era um **SUV Azul**. Precisamos do nome de quem dirigia o carro de fuga.

  Descubra o nome do motorista do SUV azul que enviou a mensagem para o invasor.'
),
(
  3,
  'O Funcionário Corrupto', 
  'SELECT ocupacao FROM pessoas WHERE id = 99;', 
  'HARD', 
  'furto-noturno', 
  'Furto Noturno', 
  'Capturamos o cúmplice (ID 88), e ele confessou tudo. Ele disse que foi contratado por um funcionário do próprio museu, mas que não sabe o nome dele. As únicas dicas que o cúmplice nos deu foram:

  - "Eu enviei uma mensagem para o mandante exatamente às 18:35 do dia do crime confirmando a fuga."
  - "O mandante trabalha na sala onde fica exposta alguma obra de *Leonardo da Vinci*."
  - "Eu vi o mandante saindo do museu logo depois da minha mensagem. Ele dirige um carro Prata."

  Descubra a ocupação (cargo) do mandante do crime.'
);


-- GROUP: O Caso do Auditor
INSERT OR IGNORE INTO challenges 
(position, title, validation_query, difficulty, group_slug, group_title, markdown) VALUES 
(
  4,
  'A Testemunha Oculta', 
  'SELECT nome FROM pessoas WHERE id = 1408;', 
  'EASY', 
  'o-caso-do-auditor', 
  'O Caso do Auditor', 
  'Um assassinato ocorreu em um lugar movimentado às 19:30. A única testemunha foi um senhor de idade (com no mínimo 65 anos) que passava pelo local.

  Descubra o nome da testemunha.'
),
(
  5,
  'O Executor Mascarado', 
  'SELECT nome FROM pessoas WHERE id = 3291;', 
  'MEDIUM', 
  'o-caso-do-auditor', 
  'O Caso do Auditor', 
  'A testemunha não conseguiu ver o rosto do criminoso porque ele usava uma balaclava, mas lembra perfeitamente das roupas: uma **jaqueta amarela com listras vermelhas**. Ela também mencionou que, durante a luta, a vítima desferiu um corte profundo no braço do assassino — um ferimento grave que exigiu atendimento médico imediato.
  
  Descubra o nome do assassino.'
),
(
  6,
  'O Intermediário Corporativo', 
  'SELECT nome, ocupacao FROM pessoas WHERE id = 5012;', 
  'HARD', 
  'o-caso-do-auditor', 
  'O Caso do Auditor', 
  'O executor confessou que foi pago para cometer o crime por meio de uma transferência bancária remota. Ele não sabe o valor exato, mas revelou que a quantia correspondia a exatamente **7 vezes o salário médio** do seu cargo.

  Descubra o nome e a ocupação de quem autorizou o pagamento e sua empresa.'
),
(
  7,
  'O Verdadeiro Mandante', 
  `SELECT nome, ocupacao, (SELECT nome_empresa FROM contas_bancarias WHERE numero_conta = '4028-5') as empresa FROM pessoas WHERE id = 8743;`, 
  'MEDIUM', 
  'o-caso-do-auditor', 
  'O Caso do Auditor', 
  'A pessoa que autorizou a transferência alegou ter apenas seguido ordens recebidas por um e-mail interno enviado "de cima". Descobrimos também que a vítima era responsável pela auditoria financeira da empresa e havia agendado uma reunião urgente com a diretoria para expor uma grande fraude interna.

  Descubra o nome e a ocupação do verdadeiro mandante, além da empresa que agiu por trás do crime.'
);