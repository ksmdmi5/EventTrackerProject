-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema borrowtrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `borrowtrackerdb` ;

-- -----------------------------------------------------
-- Schema borrowtrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `borrowtrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `borrowtrackerdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `enabled` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `borrow`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `borrow` ;

CREATE TABLE IF NOT EXISTS `borrow` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `value` DOUBLE NULL,
  `description` VARCHAR(5000) NULL,
  `returned` TINYINT NOT NULL,
  `date_borrowed` DATE NULL,
  `date_returned` DATE NULL,
  `borrowed_from` VARCHAR(100) NULL,
  `borrowed` TINYINT NULL,
  `lent` TINYINT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_borrow_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_borrow_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `borrowtrackerdb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (1, 'admin', 'admin', '1', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `borrow`
-- -----------------------------------------------------
START TRANSACTION;
USE `borrowtrackerdb`;
INSERT INTO `borrow` (`id`, `name`, `value`, `description`, `returned`, `date_borrowed`, `date_returned`, `borrowed_from`, `borrowed`, `lent`, `user_id`) VALUES (1, 'Xbox', 200, 'xbox one', 0, '2019-09-28', NULL, 'Fred', 1, 0, 1);

COMMIT;

