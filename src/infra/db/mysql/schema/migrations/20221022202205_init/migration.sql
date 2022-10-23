-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `access_token` VARCHAR(100) NOT NULL,
    `role` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
