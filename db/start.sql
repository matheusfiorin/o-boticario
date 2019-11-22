CREATE DATABASE IF NOT EXISTS boticario;

USE boticario;

SET
  NAMES utf8mb4;

SET
  FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sells
-- ----------------------------
DROP TABLE IF EXISTS `sells`;

CREATE TABLE `sells` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `StatusID` int(11) DEFAULT NULL,
  `SellID` varchar(255) DEFAULT NULL,
  `Price` double(12, 4) DEFAULT NULL,
  `Date` datetime(4) DEFAULT NULL,
  `CashbackPercentage` int(11) DEFAULT NULL,
  `CashbackValue` double(12, 4) DEFAULT NULL,
  `createdAt` datetime(4) DEFAULT NULL,
  `updatedAt` datetime(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserID` (`UserID`),
  KEY `sells_ibfk_2` (`StatusID`),
  CONSTRAINT `sells_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  CONSTRAINT `sells_ibfk_2` FOREIGN KEY (`StatusID`) REFERENCES `statuses` (`ID`)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8;

-- ----------------------------
-- Table structure for statuses
-- ----------------------------
DROP TABLE IF EXISTS `statuses`;

CREATE TABLE `statuses` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) DEFAULT NULL,
  `createdAt` datetime(4) DEFAULT NULL,
  `updatedAt` datetime(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID` (`ID`)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of statuses
-- ----------------------------
BEGIN;

INSERT INTO
  `statuses`
VALUES
  (
    1,
    'Em validação',
    '2019-11-22 01:13:17.0000',
    '2019-11-22 01:13:17.0000'
  );

INSERT INTO
  `statuses`
VALUES
  (
    2,
    'Aprovado',
    '2019-11-22 01:14:02.0000',
    '2019-11-22 01:14:02.0000'
  );

INSERT INTO
  `statuses`
VALUES
  (
    3,
    'Reprovado',
    '2019-11-22 01:14:43.0000',
    '2019-11-22 01:14:43.0000'
  );

COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Fullname` varchar(255) DEFAULT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `createdAt` datetime(4) DEFAULT NULL,
  `updatedAt` datetime(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `CPF` (`CPF`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;

INSERT INTO
  `users`
VALUES
  (
    1,
    'Matheus Barão Fiorin',
    '47218023827',
    'matheusfiiorin@gmail.com',
    '$2b$10$bWpP3EcPNI1KryJOmJRyrOpyIZUHNvXRQ3V811Chfl.hoRbIA9zkC',
    '2019-11-22 03:47:09.0000',
    '2019-11-22 03:47:09.0000'
  );

INSERT INTO
  `users`
VALUES
  (
    2,
    'Matheus Barão Fiorin',
    '92252821094',
    'matheusfiiorin1@gmail.com',
    '$2b$10$bWpP3EcPNI1KryJOmJRyrOpyIZUHNvXRQ3V811Chfl.hoRbIA9zkC',
    '2019-11-22 03:47:09.0000',
    '2019-11-22 03:47:09.0000'
  );

COMMIT;

SET
  FOREIGN_KEY_CHECKS = 1;

CREATE DATABASE IF NOT EXISTS boticario_test;

USE boticario_test;

SET
  NAMES utf8mb4;

SET
  FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sells
-- ----------------------------
DROP TABLE IF EXISTS `sells`;

CREATE TABLE `sells` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `StatusID` int(11) DEFAULT NULL,
  `SellID` varchar(255) DEFAULT NULL,
  `Price` double(12, 4) DEFAULT NULL,
  `Date` datetime(4) DEFAULT NULL,
  `CashbackPercentage` int(11) DEFAULT NULL,
  `CashbackValue` double(12, 4) DEFAULT NULL,
  `createdAt` datetime(4) DEFAULT NULL,
  `updatedAt` datetime(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserID` (`UserID`),
  KEY `sells_ibfk_2` (`StatusID`),
  CONSTRAINT `sells_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  CONSTRAINT `sells_ibfk_2` FOREIGN KEY (`StatusID`) REFERENCES `statuses` (`ID`)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8;

-- ----------------------------
-- Table structure for statuses
-- ----------------------------
DROP TABLE IF EXISTS `statuses`;

CREATE TABLE `statuses` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) DEFAULT NULL,
  `createdAt` datetime(4) DEFAULT NULL,
  `updatedAt` datetime(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID` (`ID`)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of statuses
-- ----------------------------
BEGIN;

INSERT INTO
  `statuses`
VALUES
  (
    1,
    'Em validação',
    '2019-11-22 01:13:17.0000',
    '2019-11-22 01:13:17.0000'
  );

INSERT INTO
  `statuses`
VALUES
  (
    2,
    'Aprovado',
    '2019-11-22 01:14:02.0000',
    '2019-11-22 01:14:02.0000'
  );

INSERT INTO
  `statuses`
VALUES
  (
    3,
    'Reprovado',
    '2019-11-22 01:14:43.0000',
    '2019-11-22 01:14:43.0000'
  );

COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Fullname` varchar(255) DEFAULT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `createdAt` datetime(4) DEFAULT NULL,
  `updatedAt` datetime(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `CPF` (`CPF`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;

INSERT INTO
  `users`
VALUES
  (
    1,
    'Matheus Barão Fiorin',
    '47218023827',
    'matheusfiiorin@gmail.com',
    '$2b$10$bWpP3EcPNI1KryJOmJRyrOpyIZUHNvXRQ3V811Chfl.hoRbIA9zkC',
    '2019-11-22 03:47:09.0000',
    '2019-11-22 03:47:09.0000'
  );

INSERT INTO
  `users`
VALUES
  (
    2,
    'Matheus Barão Fiorin',
    '92252821094',
    'matheusfiiorin1@gmail.com',
    '$2b$10$bWpP3EcPNI1KryJOmJRyrOpyIZUHNvXRQ3V811Chfl.hoRbIA9zkC',
    '2019-11-22 03:47:09.0000',
    '2019-11-22 03:47:09.0000'
  );

COMMIT;

SET
  FOREIGN_KEY_CHECKS = 1;