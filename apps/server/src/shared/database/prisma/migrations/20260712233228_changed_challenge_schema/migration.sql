/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `challenges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenges_position_key" ON "challenges"("position");
