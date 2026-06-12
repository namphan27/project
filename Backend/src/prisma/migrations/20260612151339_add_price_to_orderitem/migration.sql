/*
  Warnings:

  - Added the required column `price` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderItem` ADD COLUMN `price` INTEGER NOT NULL;
