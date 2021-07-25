-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: wishlist
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `list_items`
--

DROP TABLE IF EXISTS `list_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list_id` int(10) DEFAULT NULL,
  `name` varchar(125) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `checked` tinyint(1) DEFAULT NULL,
  `checked_by` varchar(256) DEFAULT NULL,
  `checked_date` date DEFAULT NULL,
  `price` decimal(18,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_items`
--

LOCK TABLES `list_items` WRITE;
/*!40000 ALTER TABLE `list_items` DISABLE KEYS */;
INSERT INTO `list_items` VALUES (26,121,'dop','google.com',1,'olk','2021-06-10',0.00),(27,124,'n','e',NULL,NULL,NULL,0.00),(28,125,'xcgfhjh','asfdhgj',1,'czdf','2021-06-14',0.00),(29,121,'testing list','sdfdhttps://',1,'ll','2021-06-14',0.00),(30,121,'k','k',NULL,NULL,NULL,0.00),(31,126,'test','test',1,'test','2021-06-14',0.00),(32,121,'test','test',NULL,NULL,NULL,0.00),(33,127,'Baby bouncer','https://www.amazon.co.uk/BabyBj%C3%B6rn-Jersey-Bouncer-Bliss-Charcoal/dp/B07WTD1HFT/',1,'zahra','2021-07-24',0.00),(34,127,'Playmat','https://www.mamasandpapas.com/collections/toys-gifts/products/playmat-toy-bundle-hey-sunshine-7736hs101',1,'Robert','2021-07-24',49.50),(35,127,'Bedside bassinet','https://www.argos.co.uk/product/9450479',1,'Zahra','2021-07-24',139.99),(36,127,'Paddlng Pool','https://www.amazon.co.uk/Toddlers-Swimming-Portable-Inflatable-Sprinkler/dp/B088P1Y55Q/ref=sr_1_5?crid=3FSMY4S3XPEUU&dchild=1&keywords=baby+paddling+pool&qid=1627149977&sprefix=baby+%2Caps%2C231&sr=8-5',1,'testing','2021-07-25',50.00),(38,127,'dd','x',NULL,NULL,NULL,0.00),(39,127,'Sleeping bag','https://www.johnlewis.com/tommee-tippee-the-original-grobag-ollie-the-owl-sleeping-bag-1-tog-grey/p5419776?size=6-18-mths',NULL,NULL,NULL,32.39),(40,127,'df','sfd',NULL,NULL,NULL,90.00);
/*!40000 ALTER TABLE `list_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) DEFAULT NULL,
  `description` varchar(125) DEFAULT NULL,
  `owner_id` int(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (121,'Squidge wishlist','Items to get for squidgy',NULL,'2021-06-10'),(122,'hg','df',NULL,'2021-06-10'),(123,'jj','kk',NULL,'2021-06-10'),(124,'jj','kko',NULL,'2021-06-10'),(125,'ll','kk',NULL,'2021-06-14'),(126,'test','test',NULL,'2021-06-14'),(127,'Squidge wishlist with real urls','testing urls stuff',NULL,'2021-07-19');
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(125) DEFAULT NULL,
  `access` int(10) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin',1,'\ZÉ$V˜N+'),(2,'user',2,'©,ù¡ôW');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-25 17:36:17
