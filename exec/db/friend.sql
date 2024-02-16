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

-- 테이블 s10p13d108.friend 구조 내보내기
CREATE TABLE IF NOT EXISTS `friend` (
  `created_at` datetime(6) DEFAULT NULL,
  `follower_id` bigint(20) DEFAULT NULL,
  `following_id` bigint(20) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `friend_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`friend_id`),
  KEY `FKs7n3x77u24tl91ws2e9vu6vwy` (`follower_id`),
  KEY `FKao2vkuwk4yx29bfllpwaiogw0` (`following_id`),
  CONSTRAINT `FKao2vkuwk4yx29bfllpwaiogw0` FOREIGN KEY (`following_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKs7n3x77u24tl91ws2e9vu6vwy` FOREIGN KEY (`follower_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 s10p13d108.friend:~1 rows (대략적) 내보내기
INSERT INTO `friend` (`created_at`, `follower_id`, `following_id`, `modified_at`, `friend_id`) VALUES
	('2024-02-15 15:53:52.524329', 12, 33, '2024-02-15 15:53:52.524329', 'F_49eee8c0-4c7a-4007-a885-b09b091a3503');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
