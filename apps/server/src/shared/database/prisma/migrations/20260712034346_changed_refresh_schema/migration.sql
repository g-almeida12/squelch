/*
  Warnings:

  - The `revocation_reason` column on the `refresh_tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "revocation_reason",
ADD COLUMN     "revocation_reason" "RevocationReason";
