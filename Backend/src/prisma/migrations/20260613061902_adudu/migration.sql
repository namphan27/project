-- AlterTable
ALTER TABLE `orders` ADD COLUMN `paidAt` DATETIME(3) NULL,
    ADD COLUMN `transactionId` VARCHAR(191) NULL;
