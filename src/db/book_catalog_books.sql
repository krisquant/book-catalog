-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: book_catalog
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text,
  `cover_url` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES ('228a670c-a5af-4dd8-8723-1058b7187d8e','the great gatsby','F. Scott Fitzgerald','','https://covers.openlibrary.org/b/id/10590366-M.jpg','2025-04-01 17:03:23'),('4eface98-6acd-4e81-a1b3-9e9698c72bb3','to kill a mockingbird','Harper Lee','','https://covers.openlibrary.org/b/id/12606502-M.jpg','2025-04-01 17:03:31'),('6ecd4bf8-2e4d-40c1-bbc0-780a466b4416','harry potter','J. K. Rowling','','https://covers.openlibrary.org/b/id/10521270-M.jpg','2025-04-01 16:41:33'),('864c1b02-f3a4-44e0-b982-1e856e890bc0','pride and prejudice','Jane Austen','','https://covers.openlibrary.org/b/id/14348537-M.jpg','2025-04-01 17:03:41'),('9745b1cd-ce0d-4708-89d6-d504fab302ff','Grokking algorithms','A. Bhargava','Aditya Bhargava\'s edition is an illustrated guide for beginners or those interested in the subject. It does not present absolutely all algorithms or data structures, complex concepts or innovative solution techniques. Only knowledge of practical value is presented to the reader in an illustrative manner. The material is presented from simple to complex, accompanied by repeated explanations, exercises, many pictures and examples from life situations.\n\n','','2025-04-01 16:25:09');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-01 17:14:56
