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

-- 테이블 s10p13d108.chat_message 구조 내보내기
CREATE TABLE IF NOT EXISTS `chat_message` (
  `checked` bit(1) NOT NULL,
  `chat_message_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `friend_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`chat_message_id`),
  KEY `FK9mqdb0dn2qtfqt93sxmt7a7q4` (`friend_id`),
  KEY `FKynfbnbqot8mpd1tquoc2s1w5` (`member_id`),
  CONSTRAINT `FK9mqdb0dn2qtfqt93sxmt7a7q4` FOREIGN KEY (`friend_id`) REFERENCES `friend` (`friend_id`),
  CONSTRAINT `FKynfbnbqot8mpd1tquoc2s1w5` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 s10p13d108.chat_message:~4 rows (대략적) 내보내기
INSERT INTO `chat_message` (`checked`, `chat_message_id`, `created_at`, `member_id`, `modified_at`, `content`, `friend_id`) VALUES
	(b'0', 7, '2024-02-15 15:54:37.633817', 33, '2024-02-15 15:54:37.633817', '안녕하세요', 'F_49eee8c0-4c7a-4007-a885-b09b091a3503'),
	(b'0', 10, '2024-02-15 15:54:46.148066', 33, '2024-02-15 15:54:46.148066', '저랑 게임해요', 'F_49eee8c0-4c7a-4007-a885-b09b091a3503'),
	(b'0', 16, '2024-02-15 17:56:26.406303', 12, '2024-02-15 17:56:26.406303', '좋아요', 'F_49eee8c0-4c7a-4007-a885-b09b091a3503'),
	(b'0', 17, '2024-02-15 17:56:32.286892', 12, '2024-02-15 17:56:32.286892', '저 방금 이겼지롱~~', 'F_49eee8c0-4c7a-4007-a885-b09b091a3503');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
