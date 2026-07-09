# GROUP: Furto Noturno

### Easy Level - Quem é o Culpado?

Objective: Find the intruder's name.

Answer: SELECT nome FROM pessoas WHERE ID = 42; (Arthur Gatuno)

Investigation steps:
  1. Find the ID of the "French Paintings Room" in the salas table. (Returns Room 7)
  2. Check who entered room 7 on 04/15/2026 at 18:30 in the 'acessos' table. (Returns Person 42)
  3. Run the final query searching for the name of ID 42 in the 'pessoas' table.



### Medium Level - O Cúmplice da Fuga

Objective: Find the getaway driver's name.

Answer: SELECT nome FROM pessoas WHERE ID = 88; (Carlos Fuga)

Investigation steps:
  1. Search for messages sent to the intruder (ID 42) on the day of the crime containing the word "pronto". (Returns IDs 15 and 88)
  2. Check the license plates associated with IDs 15 and 88 in the 'pessoas' table.
  3. Filter in the 'veiculos' table which of these two plates belongs to a Blue SUV. (Returns the car of ID 88)
  4. Run the final query searching for the name of ID 88 in the 'pessoas' table.



### Hard Level - O Funcionário Corrupto

Objective: Find the mastermind's occupation.

Answer: SELECT ocupacao FROM pessoas WHERE ID = 99; (Curador Chefe)

Investigation steps:
  1. Check who received a message from the accomplice (ID 88) exactly at 18:35 on the day of the crime. (Returns IDs 10, 55, and 99)
  2. Find the ID of the room that has artworks by "Leonardo da Vinci" in the 'obras' table. (Returns Room 2)
  3. Check which of the three suspects (10, 55, or 99) registered an exit (Saida) from room 2 after 18:35. (ID 10 is ruled out, leaving 55 and 99)
  4. Check the license plates of people 55 and 99.
  5. Filter in the 'veiculos' table which of these plates belongs to a Silver car. (ID 99 is the owner of the silver Hatch)
  6. Run the final query searching for the occupation of ID 99 in the 'pessoas' table.