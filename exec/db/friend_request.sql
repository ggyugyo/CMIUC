-- --------------------------------------------------------
-- 호스트:                          stg-yswa-kr-practice-db-master.mariadb.database.azure.com
-- 서버 버전:                        10.3.23-MariaDB - MariaDB Server
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- s10p13d108 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `s10p13d108` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `s10p13d108`;

-- 테이블 s10p13d108.friend_request 구조 내보내기
CREATE TABLE IF NOT EXISTS `friend_request` (
  `created_at` datetime(6) DEFAULT NULL,
  `friend_request_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `modified_at` datetime(6) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`friend_request_id`),
  KEY `FKjb5d7u2slfp3fy0912mq0r1rf` (`receiver_id`),
  KEY `FKlplia5yaa4rqrmc15dqltgqdf` (`sender_id`),
  CONSTRAINT `FKjb5d7u2slfp3fy0912mq0r1rf` FOREIGN KEY (`receiver_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKlplia5yaa4rqrmc15dqltgqdf` FOREIGN KEY (`sender_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 s10p13d108.friend_request:~2 rows (대략적) 내보내기
INSERT INTO `friend_request` (`created_at`, `friend_request_id`, `modified_at`, `receiver_id`, `sender_id`) VALUES
	('2024-02-15 14:18:47.344598', 6, '2024-02-15 14:18:47.344598', 11, 7),
	('2024-02-15 15:15:02.956741', 8, '2024-02-15 15:15:02.956741', 11, 31);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
