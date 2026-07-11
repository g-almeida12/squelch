# GROUP: O Caso do Auditor

### Easy Level - A Testemunha Oculta

Objective: Find the witness's name.

Answer: SELECT nome FROM pessoas WHERE id = 1408; (José Ribeiro)

Investigation steps:
  1. Filter the 'cameras' table for a high movement level ("alto") at 19:30 to find the location of the crime. (Returns "R. dos Limoeiros")
  2. Search the 'pessoas' table for residents at that location who are at least 65 years old. (Returns IDs 1408 and 6721)
  3. Filter the results for a male gender ("M") since the witness was a gentleman. (Returns ID 1408)
  4. Run the final query searching for the name of ID 1408 in the 'pessoas' table.


### Medium Level - O Executor Mascarado

Objective: Find the assassin's name.

Answer: SELECT nome FROM pessoas WHERE id = 3291; (Marcos Lima)

Investigation steps:
  1. Search the 'cameras' table for the description of the yellow jacket with red stripes, ignoring the crime scene camera. (Returns camera IDs 209 and 312 with their respective locations and times)
  2. Cross-reference the location and time of those two cameras with the 'acessos' table to see who was there. (Returns IDs 3291 and 4402 as candidates)
  3. Query the 'consultas_medicas' table looking for injuries. ID 4402 was treated at 19:15 (before the crime), while ID 3291 was treated at 20:40 with a deep arm cut shortly after the assassin's escape route timeline.
  4. Run the final query searching for the name of ID 3291 in the 'pessoas' table.


### Hard Level - O Intermediário Corporativo

Objective: Find the name of the person who authorized the payment.

Answer: SELECT nome FROM pessoas WHERE id = 5012; (Roberto Albuquerque)

Investigation steps:
  1. Check the occupation of the executor (ID 3291) in the 'pessoas' table to see his salary ($2,500.00) and multiply it by 7 ($17,500.00).
  2. Filter the 'transacoes' table for a transaction with a value of 17500.00 where the recipient is ID 3291. (Returns a transaction from account "3920-7")
  3. Look up the account number "3920-7" in the 'contas_bancarias' table to identify the company behind it. (Returns "Inova Tech Soluções LTDA", useful later)
  4. Check the 'assinaturas_autorizadas' table for account "3920-7" to see who has authorization to move company funds. (Returns IDs 5012 and 9135)
  5. Cross-reference these two suspects with the 'acessos' table around the time of the transfer (21:05) to find who was inside the office. (ID 9135 was at a restaurant, ID 5012 was at the office)
  6. Run the final query searching for the name of ID 5012 in the 'pessoas' table.


### Medium Level - O Verdadeiro Mandante

Objective: Find the true mastermind's name.

Answer: SELECT nome FROM pessoas WHERE id = 8743; (Helena Fontes)

Investigation steps:
  1. Search the 'emails' table for messages sent to the intermediary (ID 5012) on the day of the crime, filtering the content by the company name discovered in the previous level using LIKE '%Inova Tech%'. (Returns the confidential email from diretoria@vertexholding.com ordering the transfer).
  2. Check the 'acessos_email' table to see which suspects had corporate credentials or login access to that specific executive account (diretoria@vertexholding.com). (Returns IDs 8743, 2055, and 5012—with 5012 being the intermediary himself, leaving IDs 8743 and 2055 as the main suspects).
  3. Query the 'reunioes' table to check the upcoming audit meetings organized by the victim (ID 2389) concerning internal fraud.
  4. Identify which of the two email candidates (ID 8743 or 2055) is formally cited as the person responsible for the targeted area of the fraud. (ID 2055 is in a meeting about HR, while ID 8743 is explicitly named in the high-level fiscal fraud meeting).
  5. Run the final query searching for the name of ID 8743 in the 'pessoas' table.