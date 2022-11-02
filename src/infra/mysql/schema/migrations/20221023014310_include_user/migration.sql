-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `param` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `acceptTermsAndConditions` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_email_key`(`param`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;