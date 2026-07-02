-- GROUP: Furto Noturno
INSERT OR IGNORE INTO challenges 
(title, validation_query, difficulty, group_slug, group_title, markdown) VALUES 
(
'Quem é o Culpado?', 
'SELECT nome FROM pessoas WHERE id = 42;', 
'EASY', 
'furto-noturno', 
'Furto Noturno', 
'A obra "A Noite Estrelada" foi furtada da "Sala de Pinturas Francesas" no dia 15 de Abril de 2026. A segurança relatou que a porta registrou uma única entrada exatamente às 18:30.

Descubra o nome do invasor.'
),
(
'O cúmplice da Fuga', 
'SELECT nome FROM pessoas WHERE id = 88;', 
'MEDIUM', 
'furto-noturno', 
'Furto Noturno', 
'O invasor não agiu sozinho. Ele recebeu uma mensagem de texto no dia do crime (15/04/2026) contendo a palavra **"pronto"**. Uma testemunha que estava na rua afirmou ter visto o carro de fuga: era um **SUV Azul**. Precisamos do nome de quem dirigia o carro de fuga.

Descubra o nome do motorista do SUV azul que enviou a mensagem para o invasor.'
),
(
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