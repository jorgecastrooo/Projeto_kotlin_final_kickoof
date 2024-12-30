-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: kickoof
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartoes`
--

DROP TABLE IF EXISTS `cartoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartoes` (
  `idcartao` int NOT NULL AUTO_INCREMENT,
  `jogo` varchar(100) NOT NULL,
  `clube` varchar(100) NOT NULL,
  `jogador` varchar(100) NOT NULL,
  `tipo_cartao` varchar(100) NOT NULL,
  PRIMARY KEY (`idcartao`),
  KEY `jogo_idx` (`jogo`),
  KEY `clube_idx` (`clube`),
  CONSTRAINT `clubes` FOREIGN KEY (`clube`) REFERENCES `clube` (`Clube`),
  CONSTRAINT `jogos` FOREIGN KEY (`jogo`) REFERENCES `jogo` (`jogo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartoes`
--

LOCK TABLES `cartoes` WRITE;
/*!40000 ALTER TABLE `cartoes` DISABLE KEYS */;
INSERT INTO `cartoes` VALUES (9,'benficaVSwqdqweqwe','wqdqweqwe','ew','amarelo'),(10,'benficaVSwqdqweqwe','benfica','SDAF','vermelho'),(11,'benficaVSwqdqweqwe','wqdqweqwe','qe','amarelo'),(12,'dasdVSfsdfdfsdf','dasd','sdasds','amarelo'),(13,'dasdVSfsdfdfsdf','dasd','sdasds','amarelo'),(14,'benficaVSwqdqweqwe','wqdqweqwe','ew','amarelo'),(15,'fdVSewrre','fd','fefef','amarelo'),(16,'fdVSewrre','ewrre','refer','amarelo'),(17,'fdVSewrre','fd','fefef','amarelo'),(18,'fdVSewrre','ewrre','refer','vermelho');
/*!40000 ALTER TABLE `cartoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clube`
--

DROP TABLE IF EXISTS `clube`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clube` (
  `Clube` varchar(60) NOT NULL,
  `liga` varchar(100) NOT NULL,
  `treinador` varchar(60) NOT NULL,
  `fundacao` int NOT NULL,
  `jogadores` varchar(1000) NOT NULL,
  `jogos` int NOT NULL,
  `vitorias` int NOT NULL,
  `empates` int NOT NULL,
  `derrotas` int NOT NULL,
  `golos_marcados` int NOT NULL,
  `golos_sofridos` int NOT NULL,
  PRIMARY KEY (`Clube`),
  KEY `liga_idx` (`liga`),
  CONSTRAINT `liga` FOREIGN KEY (`liga`) REFERENCES `liga` (`Nomedaliga`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clube`
--

LOCK TABLES `clube` WRITE;
/*!40000 ALTER TABLE `clube` DISABLE KEYS */;
INSERT INTO `clube` VALUES ('benfica','wqefr','erwre',2024,'SDAF,WEFGF,WQEF',5,0,4,1,8,9),('dadsadsd','betclic','wewqe',2024,'asdadas',0,0,0,0,0,0),('dasd','wqefr','weef4',2024,'sdasds',2,0,0,2,2,6),('ewr','wqefr','erwre',2024,'ewqtr_tr',2,0,0,2,0,2),('ewrre','wqefr','weef4',2024,'rf,refer,fref',2,1,0,1,2,2),('fd','wqefr','erwre',2024,'fefef,fefe,fef',2,1,0,1,2,2),('fdxx','wqefr','weef4aaaa',2024,'sass,ASaA',0,0,0,0,0,0),('fsdfdfsdf','wqefr','weef4',2024,'dfdf',2,2,0,0,6,2),('porto','betclic','weef4aass',2024,'sdsa',0,0,0,0,0,0),('sporting','wqefr','wewqe',2024,'sd,dasdsad',3,3,0,0,3,0),('sporting_2','betclic','erwre',2000,'sdas,dsadasd,sa',0,0,0,0,0,0),('wqdqweqwe','wqefr','weef',2024,'ew,qq,eqe,qe',4,0,4,0,8,8);
/*!40000 ALTER TABLE `clube` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `golo`
--

DROP TABLE IF EXISTS `golo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `golo` (
  `idgolo` int NOT NULL AUTO_INCREMENT,
  `jogo` varchar(100) NOT NULL,
  `jogador` varchar(100) NOT NULL,
  `clube` varchar(100) NOT NULL,
  `tipo_golo` varchar(100) NOT NULL,
  PRIMARY KEY (`idgolo`),
  KEY `clube_idx` (`clube`),
  KEY `jogo_idx` (`jogo`),
  CONSTRAINT `clube` FOREIGN KEY (`clube`) REFERENCES `clube` (`Clube`),
  CONSTRAINT `jogo` FOREIGN KEY (`jogo`) REFERENCES `jogo` (`jogo`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `golo`
--

LOCK TABLES `golo` WRITE;
/*!40000 ALTER TABLE `golo` DISABLE KEYS */;
INSERT INTO `golo` VALUES (1,'benficaVSwqdqweqwe','WQEF','benfica','gol'),(2,'fdVSewrre','ss','ewrre','gol'),(9,'benficaVSwqdqweqwe','WEFGF','benfica','gol'),(10,'benficaVSwqdqweqwe','WEFGF','benfica','autogo'),(11,'benficaVSwqdqweqwe','WEFGF','benfica','autogol'),(12,'dasdVSfsdfdfsdf','sdasds','dasd','autogol'),(13,'sportingVSewr','sd','sporting','gol'),(14,'dasdVSfsdfdfsdf','dfdf','fsdfdfsdf','gol'),(15,'dasdVSfsdfdfsdf','dfdf','fsdfdfsdf','autogol'),(16,'dasdVSfsdfdfsdf','dfdf','fsdfdfsdf','gol'),(17,'fdVSewrre','fefef','fd','gol'),(18,'fdVSewrre','fefef','fd','gol'),(19,'benficaVSsporting','dasdsad','sporting','gol');
/*!40000 ALTER TABLE `golo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogo`
--

DROP TABLE IF EXISTS `jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogo` (
  `jogo` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `equip_casa` varchar(60) NOT NULL,
  `equip_fora` varchar(60) NOT NULL,
  `estado` varchar(60) NOT NULL,
  PRIMARY KEY (`jogo`),
  KEY `fora_idx` (`equip_fora`),
  KEY `cas_idx` (`equip_casa`),
  CONSTRAINT `cas` FOREIGN KEY (`equip_casa`) REFERENCES `clube` (`Clube`),
  CONSTRAINT `fora` FOREIGN KEY (`equip_fora`) REFERENCES `clube` (`Clube`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogo`
--

LOCK TABLES `jogo` WRITE;
/*!40000 ALTER TABLE `jogo` DISABLE KEYS */;
INSERT INTO `jogo` VALUES ('benficaVSsporting','2024-12-30','17:35:00','benfica','sporting','Terminado'),('benficaVSwqdqweqwe','2024-12-29','17:30:00','benfica','wqdqweqwe','Terminado'),('dadsadsdVSporto','2025-01-03','14:08:00','dadsadsd','porto','Pendente'),('dasdVSfsdfdfsdf','2024-12-29','16:15:00','dasd','fsdfdfsdf','Terminado'),('fdVSewrre','2024-12-29','19:00:00','fd','ewrre','Terminado'),('fsdfdfsdfVSbenfica','2025-01-09','13:56:00','fsdfdfsdf','benfica','Pendente'),('portoVSsporting_2','2024-12-31','13:53:00','porto','sporting_2','Pendente'),('sporting_2VSporto','2025-01-08','14:02:00','sporting_2','porto','Pendente'),('sportingVSewr','2024-12-29','19:11:00','sporting','ewr','Terminado');
/*!40000 ALTER TABLE `jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kick`
--

DROP TABLE IF EXISTS `kick`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kick` (
  `UserName` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Nacionalidade` varchar(100) NOT NULL,
  `e-mail` varchar(100) NOT NULL,
  `data de nascimento` datetime NOT NULL,
  `Password` varchar(255) NOT NULL,
  `ADM` tinyint DEFAULT '0',
  PRIMARY KEY (`UserName`),
  KEY `Nacionalidade_idx` (`Nacionalidade`),
  CONSTRAINT `fk_kick_nacionalidades` FOREIGN KEY (`Nacionalidade`) REFERENCES `nacionalidades` (`nacionalidade`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kick`
--

LOCK TABLES `kick` WRITE;
/*!40000 ALTER TABLE `kick` DISABLE KEYS */;
INSERT INTO `kick` VALUES ('jorge_2','jorgin','Jamaican','jorgemcastro@gmail.com','2006-08-24 00:00:00','463deed10eda3684c3312a7b62d55bba54e57347224451e95175091e2cb37606',1);
/*!40000 ALTER TABLE `kick` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liga`
--

DROP TABLE IF EXISTS `liga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liga` (
  `Nomedaliga` varchar(100) NOT NULL,
  `Descriçãodaliga` varchar(600) NOT NULL,
  `Numeromaximo` int NOT NULL,
  PRIMARY KEY (`Nomedaliga`),
  UNIQUE KEY `Nomedaliga_UNIQUE` (`Nomedaliga`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liga`
--

LOCK TABLES `liga` WRITE;
/*!40000 ALTER TABLE `liga` DISABLE KEYS */;
INSERT INTO `liga` VALUES ('betclic','liga portuguesa',13),('wqefr','wqefwqd',25);
/*!40000 ALTER TABLE `liga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nacionalidades`
--

DROP TABLE IF EXISTS `nacionalidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nacionalidades` (
  `nacionalidade` varchar(100) NOT NULL,
  PRIMARY KEY (`nacionalidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nacionalidades`
--

LOCK TABLES `nacionalidades` WRITE;
/*!40000 ALTER TABLE `nacionalidades` DISABLE KEYS */;
INSERT INTO `nacionalidades` VALUES ('Afghan'),('Albanian'),('Algerian'),('American'),('Andorran'),('Angolan'),('Argentine'),('Armenian'),('Australian'),('Austrian'),('Azerbaijani'),('Bahamian'),('Bahraini'),('Bangladeshi'),('Barbadian'),('Belarusian'),('Belgian'),('Belizean'),('Beninese'),('Bhutanese'),('Bolivian'),('Bosnian'),('Brazilian'),('British'),('Bruneian'),('Bulgarian'),('Burkinabe'),('Burmese'),('Burundian'),('Cambodian'),('Cameroonian'),('Canadian'),('Cape Verdean'),('Central African'),('Chadian'),('Chilean'),('Chinese'),('Colombian'),('Comoran'),('Congolese'),('Costa Rican'),('Croatian'),('Cuban'),('Cypriot'),('Czech'),('Danish'),('Djibouti'),('Dominican'),('Dutch'),('East Timorese'),('Ecuadorean'),('Egyptian'),('Emirian'),('Equatorial Guinean'),('Eritrean'),('Estonian'),('Ethiopian'),('Fijian'),('Filipino'),('Finnish'),('French'),('Gabonese'),('Gambian'),('Georgian'),('German'),('Ghanaian'),('Greek'),('Grenadian'),('Guatemalan'),('Guinea-Bissauan'),('Guinean'),('Guyanese'),('Haitian'),('Herzegovinian'),('Honduran'),('Hungarian'),('I-Kiribati'),('Icelander'),('Indian'),('Indonesian'),('Iranian'),('Iraqi'),('Irish'),('Israeli'),('Italian'),('Ivorian'),('Jamaican'),('Japanese'),('Jordanian'),('Kazakhstani'),('Kenyan'),('Kittian and Nevisian'),('Kuwaiti'),('Kyrgyz'),('Laotian'),('Latvian'),('Lebanese'),('Liberian'),('Libyan'),('Liechtensteiner'),('Lithuanian'),('Luxembourger'),('Macedonian'),('Malagasy'),('Malawian'),('Malaysian'),('Maldivan'),('Malian'),('Maltese'),('Marshallese'),('Mauritanian'),('Mauritian'),('Mexican'),('Micronesian'),('Moldovan'),('Monacan'),('Mongolian'),('Moroccan'),('Mosotho'),('Motswana'),('Mozambican'),('Namibian'),('Nauruan'),('Nepalese'),('New Zealander'),('Ni-Vanuatu'),('Nicaraguan'),('Nigerian'),('Nigerien'),('North Korean'),('Northern Irish'),('Norwegian'),('Omani'),('Pakistani'),('Palauan'),('Panamanian'),('Papua New Guinean'),('Paraguayan'),('Peruvian'),('Polish'),('Portuguese'),('Qatari'),('Romanian'),('Russian'),('Rwandan'),('Saint Lucian'),('Salvadoran'),('Samoan'),('San Marinese'),('Sao Tomean'),('Saudi'),('Scottish'),('Senegalese'),('Serbian'),('Seychellois'),('Sierra Leonean'),('Singaporean'),('Slovakian'),('Slovenian'),('Solomon Islander'),('Somali'),('South African'),('South Korean'),('Spanish'),('Sri Lankan'),('Sudanese'),('Surinamer'),('Swazi'),('Swedish'),('Swiss'),('Syrian'),('Taiwanese'),('Tajik'),('Tanzanian'),('Thai'),('Togolese'),('Tongan'),('Trinidadian or Tobagonian'),('Tunisian'),('Turkish'),('Tuvaluan'),('Ugandan'),('Ukrainian'),('Uruguayan'),('Uzbekistani'),('Venezuelan'),('Vietnamese'),('Welsh'),('Yemenite'),('Zambian'),('Zimbabwean');
/*!40000 ALTER TABLE `nacionalidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo_noticias` varchar(100) NOT NULL,
  `descricao_noticias` varchar(600) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
INSERT INTO `noticias` VALUES (1,'adfsg','artsy','transferencias'),(2,'adawfeghj','1241','lesoes'),(3,'r3thy','23rt','lesoes'),(4,'23rt','23r','resultados'),(5,'2we3rt','2er4tg','lesoes'),(6,'2wr3et','213egtr','resultados'),(7,'qdafs','wdasfcv','resultados');
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'kickoof'
--

--
-- Dumping routines for database 'kickoof'
--
/*!50003 DROP PROCEDURE IF EXISTS `AtualizarClube` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AtualizarClube`(
    IN p_nomeAntigo VARCHAR(60),
    IN p_nomeEquipe VARCHAR(60),
    IN p_liga VARCHAR(100),
    IN p_treinador VARCHAR(60),
    IN p_fundacao INT,
    IN p_jogadores VARCHAR(1000)
)
BEGIN
    -- Atualizar os dados do clube
    UPDATE clube
    SET 
        Clube = p_nomeEquipe,
        liga = p_liga,
        treinador = p_treinador,
        fundacao = p_fundacao,
        jogadores = p_jogadores
    WHERE Clube = p_nomeAntigo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `criar_jogo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `criar_jogo`(
    IN p_jogo VARCHAR(100),
    IN p_data DATE,
    IN p_hora TIME,
    IN p_equip_casa VARCHAR(60),
    IN p_equip_fora VARCHAR(60)
)
BEGIN
    INSERT INTO jogo (jogo, data, hora, equip_casa, equip_fora, estado)
    VALUES (p_jogo, p_data, p_hora, p_equip_casa, p_equip_fora, 'Pendente');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Criar_Liga` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Criar_Liga`(
    IN nomeda_liga VARCHAR(100),
    IN descricao_liga VARCHAR(600),
    IN numero_maximo INT
)
BEGIN
    -- Insere os dados na tabela 'liga'
    INSERT INTO liga (Nomedaliga, Descriçãodaliga, Numeromaximo)
    VALUES (nomeda_liga, descricao_liga, numero_maximo);

    -- Retorna o nome da liga recém-criada como identificador
    SELECT nomeda_liga AS NovoID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteClube` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteClube`(
    IN clubeName VARCHAR(60)
)
BEGIN
    DELETE FROM clube
    WHERE Clube = clubeName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_user_by_username` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user_by_username`(IN p_username VARCHAR(100))
BEGIN
    DELETE FROM kick WHERE UserName = p_username;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EditarDataHoraJogo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarDataHoraJogo`(
    IN p_jogo VARCHAR(100),
    IN p_data DATE,
    IN p_hora TIME
)
BEGIN
    -- Atualiza apenas a data e hora do jogo
    UPDATE jogo
    SET
        data = p_data,
        hora = p_hora
    WHERE
        jogo = p_jogo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Editar_Liga` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Editar_Liga`(
    IN nomeda_liga VARCHAR(100), -- Identificador primário
    IN descricao_liga VARCHAR(600), -- Nova descrição da liga
    IN numero_maximo INT -- Novo número máximo
)
BEGIN
    -- Atualiza os dados da liga com base no nome atual da liga (chave primária)
    UPDATE liga
    SET Descriçãodaliga = descricao_liga,
        Numeromaximo = numero_maximo
    WHERE Nomedaliga = nomeda_liga;

    -- Retorna o número de linhas atualizadas
    SELECT ROW_COUNT() AS LinhasAtualizadas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarClube` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarClube`(IN nomeEquipe VARCHAR(60))
BEGIN
    -- Deletar o clube da tabela
    DELETE FROM clube
    WHERE Clube = nomeEquipe;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `excluir_jogo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `excluir_jogo`(
    IN p_jogo VARCHAR(100)
)
BEGIN
    DELETE FROM jogo
    WHERE jogo = p_jogo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Excluir_Liga` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Excluir_Liga`(
    IN nomeda_liga VARCHAR(100) -- Identificador primário
)
BEGIN
    -- Exclui a liga com base no nome da liga (chave primária)
    DELETE FROM liga
    WHERE Nomedaliga = nomeda_liga;

    -- Retorna o número de linhas excluídas
    SELECT ROW_COUNT() AS LinhasExcluidas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GerenciarNoticias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GerenciarNoticias`(
    IN Acao VARCHAR(10),         -- Ação: 'INSERIR'
    IN Titulo VARCHAR(100),      -- Título da notícia
    IN Descricao VARCHAR(600),   -- Descrição da notícia
    IN Categoria VARCHAR(100)    -- Categoria da notícia
)
BEGIN
    IF Acao = 'INSERIR' THEN
        INSERT INTO noticias (titulo_noticias, descricao_noticias, categoria)
        VALUES (Titulo, Descricao, Categoria);
    ELSE
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Ação inválida. Use apenas INSERIR.';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InserirClube` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InserirClube`(
    IN p_clube VARCHAR(60),
    IN p_liga VARCHAR(100),
    IN p_treinador VARCHAR(60),
    IN p_fundacao INT,
    IN p_jogadores VARCHAR(1000)
)
BEGIN
    INSERT INTO clube (Clube, liga, treinador, fundacao, jogadores, jogos, vitorias, empates, derrotas, golos_marcados, golos_sofridos)
    VALUES (p_clube, p_liga, p_treinador, p_fundacao, p_jogadores, 0, 0, 0, 0, 0, 0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InserirNoticias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InserirNoticias`(
    IN Titulo VARCHAR(100),      -- Título da notícia
    IN Descricao VARCHAR(600),   -- Descrição da notícia
    IN Categoria VARCHAR(100)    -- Categoria da notícia
)
BEGIN
    INSERT INTO noticias (titulo_noticias, descricao_noticias, categoria)
    VALUES (Titulo, Descricao, Categoria);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `inserir_cartao` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `inserir_cartao`(
    IN p_jogo VARCHAR(100),
    IN p_clube VARCHAR(100),
    IN p_jogador VARCHAR(100),
    IN p_tipo_cartao VARCHAR(100)
)
BEGIN
    -- Inserindo os dados na tabela Cartoes
    INSERT INTO cartoes (jogo, clube, jogador, tipo_cartao)
    VALUES (p_jogo, p_clube, p_jogador, p_tipo_cartao);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `inserir_gol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `inserir_gol`(
    IN p_jogo VARCHAR(100),
    IN p_jogador VARCHAR(100),
    IN p_clube VARCHAR(100),
    IN p_tipo_golo VARCHAR(100)
)
BEGIN
    -- Inserindo um novo gol na tabela 'golo'
    INSERT INTO golo (jogo, jogador, clube, tipo_golo)
    VALUES (p_jogo, p_jogador, p_clube, p_tipo_golo);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertKickUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertKickUser`(
    IN p_UserName VARCHAR(100),
    IN p_Name VARCHAR(50),
    IN p_Nacionalidade VARCHAR(45),
    IN p_Email VARCHAR(100),
    IN p_DataNascimento DATETIME,
    IN p_Password VARCHAR(255)
)
BEGIN
    -- Verificar se o usuário já existe (baseado na chave primária UserName)
    IF NOT EXISTS (
        SELECT 1 FROM kick WHERE UserName = p_UserName
    ) THEN
        -- Inserir os dados na tabela kick
        INSERT INTO kick (UserName, Name, Nacionalidade, `e-mail`, `data de nascimento`, Password)
        VALUES (p_UserName, p_Name, p_Nacionalidade, p_Email, p_DataNascimento, p_Password);
    ELSE
        -- Retornar uma mensagem se o usuário já existir
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O usuário já existe na tabela.';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `toggle_adm_value_by_username` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `toggle_adm_value_by_username`(IN username VARCHAR(255))
BEGIN
    DECLARE current_adm INT;

    -- Obtém o valor atual de ADM para o usuário especificado pelo username
    SELECT ADM INTO current_adm
    FROM kick
    WHERE username = username;

    -- Alterna o valor de ADM
    IF current_adm = 1 THEN
        UPDATE kick
        SET ADM = 0
        WHERE username = username;
    ELSE
        UPDATE kick
        SET ADM = 1
        WHERE username = username;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateClubeStats` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateClubeStats`(
    IN nomeClube VARCHAR(60),
    IN golsMarcados INT,
    IN golsSofridos INT,
    IN vitoria INT,
    IN empate INT,
    IN derrota INT
)
BEGIN
    -- Atualiza os dados do clube, somando os novos valores aos valores existentes
    UPDATE clube
    SET 
        golos_marcados = golos_marcados + golsMarcados,
        golos_sofridos = golos_sofridos + golsSofridos,
        vitorias = vitorias + vitoria,
        empates = empates + empate,
        derrotas = derrotas + derrota,
        jogos = jogos + 1 -- Cada chamada à stored procedure representa um novo jogo
    WHERE Clube = nomeClube;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-30 15:25:22
