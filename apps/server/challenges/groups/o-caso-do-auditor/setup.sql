-- ============================
-- CHALLENGE: O CASO DO AUDITOR
-- ============================

-- Creation of the tables
CREATE TABLE pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    genero TEXT NOT NULL,
    endereco TEXT NOT NULL,
    ocupacao TEXT NOT NULL,
    salario REAL NOT NULL
);

CREATE TABLE cameras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local TEXT NOT NULL,
    data_hora TEXT NOT NULL,
    nivel_movimento TEXT NOT NULL,
    descricao_pessoa TEXT
);

CREATE TABLE acessos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pessoa_id INTEGER,
    local TEXT NOT NULL,
    data_hora TEXT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id)
);

CREATE TABLE consultas_medicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pessoa_id INTEGER,
    clinica TEXT NOT NULL,
    data_hora TEXT NOT NULL,
    tipo_ferimento TEXT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id)
);

CREATE TABLE contas_bancarias (
    numero_conta TEXT PRIMARY KEY,
    nome_empresa TEXT NOT NULL
);

CREATE TABLE transacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conta_origem TEXT,
    destinatario_id INTEGER,
    valor REAL NOT NULL,
    data_hora TEXT NOT NULL,
    FOREIGN KEY (conta_origem) REFERENCES contas_bancarias(numero_conta),
    FOREIGN KEY (destinatario_id) REFERENCES pessoas(id)
);

CREATE TABLE assinaturas_autorizadas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_conta TEXT,
    pessoa_id INTEGER,
    FOREIGN KEY (numero_conta) REFERENCES contas_bancarias(numero_conta),
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id)
);

CREATE TABLE emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    remetente_email TEXT NOT NULL,
    destinatario_id INTEGER,
    data_hora TEXT NOT NULL,
    assunto TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    FOREIGN KEY (destinatario_id) REFERENCES pessoas(id)
);

CREATE TABLE acessos_email (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email_conta TEXT NOT NULL,
    pessoa_id INTEGER,
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id)
);

CREATE TABLE reunioes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organizador_id INTEGER,
    data_hora TEXT NOT NULL,
    assunto TEXT NOT NULL,
    pessoa_citada_id INTEGER,
    FOREIGN KEY (organizador_id) REFERENCES pessoas(id),
    FOREIGN KEY (pessoa_citada_id) REFERENCES pessoas(id)
);


-- Population of the table data

-- id 1408: Witness
-- id 3291: Executor
-- id 5012: Intermediary
-- id 8743: Mastermind
-- id 2389: Victim
INSERT INTO pessoas (id, nome, idade, genero, endereco, ocupacao, salario) VALUES 
(1408, 'José Ribeiro', 68, 'M', 'R. dos Limoeiros, 142', 'Aposentado', 1412.00), 
(6721, 'Maria das Dores', 71, 'F', 'R. dos Limoeiros, 88', 'Aposentada', 1412.00),
(3291, 'Marcos Lima', 29, 'M', 'Av. Central, 404', 'Segurança Terceirizado', 2500.00),
(4402, 'Thiago Silva', 27, 'M', 'Rua das Flores, 12', 'Alpinista Industrial', 3100.00),
(5012, 'Roberto Albuquerque', 45, 'M', 'Edf. Corporate, Apto 501', 'Diretor Financeiro', 18000.00),
(9135, 'Carlos Eduardo', 48, 'M', 'Av. Beira Mar, 1010', 'Diretor de Operações', 18500.00),
(8743, 'Helena Fontes', 52, 'F', 'Alameda das Nações, 77', 'Diretora Executiva', 35000.00),
(2055, 'Ricardo Reis', 44, 'M', 'Rua Do Futuro, 320', 'Diretor de RH', 15000.00),
(1194, 'Fernanda Costa', 30, 'F', 'Av. Caxangá, 1200', 'Secretária Executiva', 3500.00),
(7380, 'Lucas Alencar', 35, 'M', 'Rua do Hospício, 45', 'Analista Contábil', 4200.00),
(2389, 'Carlos Auditor', 38, 'M', 'Rua da Aurora, 500', 'Auditor Sênior', 8000.00);


-- id 104: Crime scene camera
-- id 209: Camera spotting the Executor
INSERT INTO cameras (id, local, data_hora, nivel_movimento, descricao_pessoa) VALUES 
(104, 'R. dos Limoeiros', '2026-05-15 19:30:00', 'alto', 'Luta corporal rápida no beco escuro'),
(209, 'Av. Norte, Esquina 4', '2026-05-15 19:55:00', 'baixo', 'Homem com jaqueta amarela com listras vermelhas'),
(312, 'Rua Imperial, Metrô', '2026-05-15 20:10:00', 'alto', 'Pessoa usando jaqueta amarela com listras vermelhas'),
(401, 'Praça da Matriz', '2026-05-15 19:30:00', 'baixo', 'Casal passeando com cachorro'),
(550, 'Av. Central, 404', '2026-05-15 19:10:00', 'médio', 'Movimentação normal de pedestres'),
(618, 'Rua da Aurora, 500', '2026-05-15 18:45:00', 'baixo', 'Vítima saindo do prédio comercial'),
(650, 'R. dos Limoeiros', '2026-05-15 19:15:00', 'médio', 'Grupo de jovens conversando na calçada'),
(651, 'Av. Norte, Esquina 4', '2026-05-15 19:40:00', 'alto', 'Fluxo intenso de passageiros desembarcando do ônibus'),
(652, 'Rua Imperial, Metrô', '2026-05-15 19:50:00', 'alto', 'Homem de casaco escuro correndo em direção à plataforma'),
(653, 'Rua da Aurora, 500', '2026-05-15 19:35:00', 'baixo', 'Viatura da polícia passando com sirene desligada');


-- pessoa_id 3291: Executor's escape route
-- pessoa_id 5012: Intermediary inside office during transfer
INSERT INTO acessos (pessoa_id, local, data_hora) VALUES 
(3291, 'Av. Norte, Esquina 4', '2026-05-15 19:55:12'), 
(4402, 'Rua Imperial, Metrô', '2026-05-15 20:10:45'), 
(5012, 'Escritório Central - Sala 10', '2026-05-15 21:05:00'), 
(9135, 'Restaurante Recanto', '2026-05-15 21:00:00'),
(1194, 'Escritório Central - Portaria', '2026-05-15 18:00:00'),
(7380, 'Escritório Central - Sala 12', '2026-05-15 19:15:00'),
(4402, 'Av. Norte, Esquina 4', '2026-05-15 19:38:22'),
(7380, 'Escritório Central - Portaria', '2026-05-15 21:02:10'),
(2055, 'Restaurante Recanto', '2026-05-15 20:45:00'),
(1194, 'Escritório Central - Sala 10', '2026-05-15 18:30:00'),
(9135, 'Escritório Central - Portaria', '2026-05-15 09:00:00');


-- pessoa_id 3291: Executor medical care
INSERT INTO consultas_medicas (pessoa_id, clinica, data_hora, tipo_ferimento) VALUES 
(6721, 'Upa Central', '2026-05-15 22:30:00', 'Sintomas gripais e febre'), 
(4402, 'Pronto Socorro Leste', '2026-05-15 19:15:00', 'Laceração por estilhaço de vidro no antebraço direito'),
(3291, 'Hospital São Lucas', '2026-05-15 20:40:00', 'Corte profundo por objeto cortante no braço esquerdo'), 
(1408, 'Clínica do Idoso', '2026-05-16 08:00:00', 'Rotina Cardiologia'),
(6721, 'Hospital Beneficente', '2026-05-15 14:20:00', 'Fratura exposta no tornozelo'),
(2055, 'Upa Central', '2026-05-15 21:10:00', 'Corte extenso no braço direito causado por ferramenta'),
(9135, 'Pronto Atendimento Sol', '2026-05-15 11:15:00', 'Crise de enxaqueca severa'),
(1194, 'Hospital São Lucas', '2026-05-15 23:55:00', 'Ferimento cortante no braço direito, hemorragia moderada'),
(5012, 'Upa Norte', '2026-05-15 23:45:00', 'Exames de rotina admissionais'),
(3291, 'Upa Central', '2026-05-15 18:30:00', 'Contusão muscular no ombro esquerdo');


-- account '3920-7': Shell company account
INSERT INTO contas_bancarias (numero_conta, nome_empresa) VALUES 
('3920-7', 'Inova Tech Soluções LTDA'),
('4028-5', 'Vertex Holding e Participações S/A'),
('1594-1', 'Logística Expressa Nordeste S/A'),
('8371-2', 'Nexus Consultoria Estratégica LTDA'),
('2946-3', 'Prime Asset Management & Investimentos'),
('7105-0', 'Horizon Comércio Exterior e Logística EIRELI'),
('5261-4', 'Gênesis Serviços Tecnológicos e Infraestrutura'),
('3819-9', 'Vanguard Auditoria e Riscos Associados');


-- destinatario_id 3291: 7x Executor's salary (2500 * 7 = 17500.00)
INSERT INTO transacoes (conta_origem, destinatario_id, valor, data_hora) VALUES 
('3920-7', 3291, 17500.00, '2026-05-15 21:05:43'), 
('4028-5', 4402, 500.00, '2026-05-15 14:00:00'), 
('3920-7', 1408, 1412.00, '2026-05-15 21:00:00'),
('1594-1', 1194, 3500.00, '2026-05-15 05:00:00'),
('8371-2', 9135, 18500.00, '2026-05-15 10:30:00'),
('2946-3', 2055, 15.50, '2026-05-15 16:45:00'),
('4028-5', 7380, 4200.00, '2026-05-15 17:30:00'),
('5261-4', 9135, 17500.00, '2026-05-15 11:15:00'),
('3920-7', 7380, 850.00, '2026-05-15 21:10:00'),
('7105-0', 4402, 3100.00, '2026-05-15 06:00:00'),
('3819-9', 5012, 18000.00, '2026-05-15 08:00:00');


-- pessoa_id 5012: Intermediary authorized to sign
INSERT INTO assinaturas_autorizadas (numero_conta, pessoa_id) VALUES 
('3920-7', 5012), 
('3920-7', 9135),
('1594-1', 9135),
('8371-2', 8743),
('2946-3', 2055),
('3819-9', 7380),
('4028-5', 8743),
('4028-5', 5012),
('7105-0', 2055),
('5261-4', 9135),
('5261-4', 5012);


-- id 1042: Email containing the payment command sent to Intermediary (5012)
INSERT INTO emails (id, remetente_email, destinatario_id, data_hora, assunto, conteudo) VALUES 
(1042, 'diretoria@vertexholding.com', 5012, '2026-05-15 18:20:00', 'Instruções confidenciais de alocação.', 'Faça a liberação do saldo pela conta da Inova Tech Soluções o quanto antes.'),
(1157, 'rh@inovatech.com', 5012, '2026-05-15 09:00:00', 'Folha de pagamento aprovada.', 'Segue em anexo a folha deste mês, com os dados atualizados conforme foi pedido.'),
(2044, 'suporte@horizon.com', 2055, '2026-05-15 10:15:00', 'Redefinição de senha corporativa.', 'Clique no link para alterar sua senha institucional. Se não foi você quem pediu a alteração, desconsidere esse email.'),
(3018, 'contato@horizon.com', 9135, '2026-05-15 11:30:00', 'Confirmação de reserva de mesa.', 'Sua mesa para duas pessoas está confirmada. Estamos ansiosos pela sua presença.'),
(4540, 'comercial@vanguard.com', 8743, '2026-05-15 14:00:00', 'Proposta de renovação de contrato.', 'A análise das taxas contratuais para o próximo ano segue em anexo abaixo.'),
(5109, 'diretoria@vertexholding.com', 1194, '2026-05-15 16:10:00', 'Relatório de reembolsos pendentes.', 'Envie as notas fiscais até o fim do dia de hoje. Precisamos dos valores com urgência.'),
(5201, 'ti@vertexholding.com', 9135, '2026-05-15 08:15:00', 'Manutenção preventiva no servidor de arquivos.', 'Aviso: O storage corporativo passará por atualização hoje às 22h. Salvem seus trabalhos pendentes.'),
(5202, 'faturamento@inovatech.com', 5012, '2026-05-15 10:30:00', 'NF-e emitida - Prestação de Serviços de TI.', 'A nota fiscal referente ao projeto da Inova Tech Soluções foi emitida com sucesso para o cliente final.'),
(5203, 'comercial@vanguard.com', 7380, '2026-05-15 11:00:00', 'Auditoria de Riscos Operacionais Q2.', 'Análise preliminar dos balanços do segundo trimestre anexada para revisão contábil.'),
(5204, 'rh@inovatech.com', 4402, '2026-05-15 13:45:00', 'Confirmação de recebimento de atestado.', 'Prezado Thiago, recebemos seu comprovante de atendimento médico. O abono de horas foi computado.'),
(5205, 'diretoria@vertexholding.com', 9135, '2026-05-15 15:20:00', 'Aprovação de orçamento para o novo datacenter.', 'Carlos, avaliei a proposta da infraestrutura. Está aprovado o início da cotação com fornecedores.'),
(5206, 'marketing@horizon.com', 8743, '2026-05-15 17:05:00', 'Briefing da campanha de Comércio Exterior.', 'Helena, segue o escopo da campanha internacional para aprovação da mesa diretora.'),
(5207, 'compliance@vertexholding.com', 2055, '2026-05-15 17:50:00', 'Atualização das políticas internas de compliance.', 'Solicitamos a leitura do novo guia de boas práticas para divulgação aos colaboradores no início da próxima semana.');


-- pessoa_id 8743: Mastermind with access to the corporate email
INSERT INTO acessos_email (email_conta, pessoa_id) VALUES 
('diretoria@vertexholding.com', 8743), 
('diretoria@vertexholding.com', 2055),
('diretoria@vertexholding.com', 5012),
('rh@inovatech.com', 2055),
('rh@inovatech.com', 1194),
('comercial@vanguard.com', 8743),
('ti@vertexholding.com', 9135),
('ti@vertexholding.com', 7380),
('compliance@vertexholding.com', 2055),
('compliance@vertexholding.com', 8743),
('faturamento@inovatech.com', 5012),
('faturamento@inovatech.com', 1194),
('faturamento@inovatech.com', 7380),
('comercial@vanguard.com', 7380),
('marketing@horizon.com', 9135),
('contato@horizon.com', 1194);



-- organizador_id 2389 (Victim) | pessoa_citada_id 8743 (Mastermind target)
INSERT INTO reunioes (id, organizador_id, data_hora, assunto, pessoa_citada_id) VALUES 
(804, 2389, '2026-05-18 10:00:00', 'Apresentação de Relatório de Auditoria: Fraude Fiscal na Diretoria Executiva', 8743), 
(855, 2389, '2026-05-19 14:00:00', 'Alinhamento de Contratações e Bancos de Horas', 2055),
(911, 5012, '2026-05-15 14:00:00', 'Alinhamento de Orçamento Trimestral da Empresa', 9135),
(924, 8743, '2026-05-14 11:00:00', 'Reunião de Alinhamento Estratégico com Acionistas', 5012),
(957, 2055, '2026-05-13 16:00:00', 'Avaliação de Desempenho do Setor Operacional', 7380),
(993, 2389, '2026-05-14 09:30:00', 'Revisão Preventiva de Balanço Patrimonial Anual', 7380),
(994, 2389, '2026-05-14 15:00:00', 'Auditoria Interna: Inconsistências em Reembolsos de Viagem', 1194),
(995, 2389, '2026-05-15 10:00:00', 'Análise de Risco Contábil em Ativos Circulantes', 7380),
(996, 9135, '2026-05-12 09:00:00', 'Alinhamento de KPIs de Operações e Logística', 2055),
(997, 2389, '2026-05-15 16:00:00', 'Reunião Extraordinária: Investigação de Desvios no Setor de RH', 2055); 