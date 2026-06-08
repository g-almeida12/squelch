-- ========================
-- CHALLENGE: FURTO NOTURNO
-- ========================


-- Creation of the tables
CREATE TABLE veiculos (
    placa TEXT PRIMARY KEY,
    modelo TEXT NOT NULL,
    cor TEXT NOT NULL
);

CREATE TABLE pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    ocupacao TEXT,
    placa_veiculo TEXT,
    FOREIGN KEY (placa_veiculo) REFERENCES veiculos(placa)
);

CREATE TABLE salas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_sala TEXT NOT NULL,
    andar INTEGER NOT NULL
);

CREATE TABLE obras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    sala_id INTEGER,
    FOREIGN KEY (sala_id) REFERENCES salas(id)
);

CREATE TABLE acessos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pessoa_id INTEGER,
    sala_id INTEGER,
    data_hora TEXT NOT NULL,
    acao TEXT CHECK(acao IN ('Entrada', 'Saida')),
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id),
    FOREIGN KEY (sala_id) REFERENCES salas(id)
);

CREATE TABLE mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    remetente_id INTEGER,
    destinatario_id INTEGER,
    data_hora TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    FOREIGN KEY (remetente_id) REFERENCES pessoas(id),
    FOREIGN KEY (destinatario_id) REFERENCES pessoas(id)
);


-- Population of the table data

-- placa ABC-9876: Accomplice's car
-- placa DEF-0000: Mastermind's car
INSERT INTO veiculos (placa, modelo, cor) VALUES 
('ABC-9876', 'SUV', 'Azul'),
('XYZ-1234', 'Sedan', 'Preto'),
('DEF-0000', 'Hatch', 'Prata'),
('GHI-1111', 'Sedan', 'Prata'),
('JKL-2222', 'Moto', 'Vermelho'),
('MNO-3333', 'SUV', 'Branco');

-- id 42: Intruder
-- id 88: Accomplice
-- id 99: Mastermind
INSERT INTO pessoas (id, nome, telefone, ocupacao, placa_veiculo) VALUES 
(10, 'Mario Santos', '555-0001', 'Guarda Noturno', NULL),
(15, 'João Silva', '555-0002', 'Visitante', 'XYZ-1234'),
(42, 'Arthur Gatuno', '555-0171', 'Visitante', NULL),
(55, 'Luigi Peixoto', '555-0003', 'Guarda Diurno', 'GHI-1111'),
(88, 'Carlos Santos', '555-0157', 'Motorista de App', 'ABC-9876'),
(99, 'Victor Moriarty', '555-0666', 'Curador Chefe', 'DEF-0000'),
(100, 'Ana Clara', '555-0004', 'Restauradora', 'MNO-3333'),
(101, 'Bruno Souza', '555-0005', 'Visitante', 'JKL-2222');

-- id 2: Da Vinci's Room
-- id 7: Theft Room
INSERT INTO salas (id, nome_sala, andar) VALUES 
(1, 'Saguão Principal', 1),
(2, 'Sala Renascentista', 1),
(3, 'Sala de Arte Moderna', 1),
(7, 'Sala de Pinturas Francesas', 2),
(8, 'Sala de Esculturas', 2);

-- titulo Monalisa: HARD level clue
-- titulo A Noite Estrelada: Stolen artwork
INSERT INTO obras (titulo, autor, sala_id) VALUES 
('Monalisa', 'Leonardo da Vinci', 2),
('O Homem Vitruviano', 'Leonardo da Vinci', 2),
('A Noite Estrelada', 'Vincent van Gogh', 7),
('O Grito', 'Edvard Munch', 3),
('O Pensador', 'Auguste Rodin', 8);

-- pessoa_id 42: Intruder's entry
-- pessoa_id 99: Mastermind's exit
INSERT INTO acessos (pessoa_id, sala_id, data_hora, acao) VALUES 
(15, 7, '2026-04-15 10:15:00', 'Entrada'),
(15, 7, '2026-04-15 10:45:00', 'Saida'),
(100, 2, '2026-04-15 11:00:00', 'Entrada'),
(100, 2, '2026-04-15 14:00:00', 'Saida'),
(42, 7, '2026-04-15 18:30:00', 'Entrada'),
(99, 2, '2026-04-15 18:36:15', 'Saida'),
(55, 2, '2026-04-15 18:38:00', 'Saida'),
(10, 1, '2026-04-15 18:37:00', 'Saida');

-- remetente_id 88, destinatario_id 42: Message from Accomplice to Intruder
-- remetente_id 88, destinatario_id 99: Message from Accomplice to Mastermind
INSERT INTO mensagens (remetente_id, destinatario_id, data_hora, conteudo) VALUES 
(15, 42, '2026-04-15 09:30:00', 'O jogo de futebol já tá pronto pra mais tarde!'),
(88, 42, '2026-04-15 17:55:00', 'Motor ligado. O carro tá pronto, só vem.'),
(88, 10, '2026-04-15 18:35:10', 'A encomenda foi entregue na portaria.'),
(88, 55, '2026-04-15 18:35:25', 'Pode fechar o portão dos fundos.'),
(88, 99, '2026-04-15 18:35:50', 'Feito. Estamos na estrada.'),=
(99, 100, '2026-04-15 10:00:00', 'Por favor, revise o quadro da sala 3.'),
(55, 10, '2026-04-15 18:00:00', 'Meu turno acabou, tô indo nessa.');