/*
  Warnings:

  - Added the required column `accessToken` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `accessToken` VARCHAR(191) NOT NULL;
