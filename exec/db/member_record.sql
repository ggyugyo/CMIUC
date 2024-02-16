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

-- 테이블 s10p13d108.member_record 구조 내보내기
CREATE TABLE IF NOT EXISTS `member_record` (
  `total_win_rate` double DEFAULT NULL,
  `win_cat_rate` double DEFAULT NULL,
  `win_mouse_rate` double DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `member_record_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `modified_at` datetime(6) DEFAULT NULL,
  `total_cat_count` bigint(20) DEFAULT NULL,
  `total_mouse_count` bigint(20) DEFAULT NULL,
  `win_cat_count` bigint(20) DEFAULT NULL,
  `win_mouse_count` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`member_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 s10p13d108.member_record:~16 rows (대략적) 내보내기
INSERT INTO `member_record` (`total_win_rate`, `win_cat_rate`, `win_mouse_rate`, `created_at`, `member_record_id`, `modified_at`, `total_cat_count`, `total_mouse_count`, `win_cat_count`, `win_mouse_count`) VALUES
	(0, 0, 0, '2024-02-15 03:02:58.498482', 3, '2024-02-15 03:02:58.498482', 0, 0, 0, 0),
	(0, 0, 0, '2024-02-15 03:32:43.348914', 5, '2024-02-15 03:32:43.348914', 0, 0, 0, 0),
	(0, 0, 0, '2024-02-15 03:34:26.260596', 6, '2024-02-15 03:34:26.260596', 0, 0, 0, 0),
	(1, 1, 0, '2024-02-15 05:08:59.802187', 7, '2024-02-15 15:13:46.630866', 1, 0, 1, 0),
	(0, 0, 0, '2024-02-15 05:19:27.261659', 8, '2024-02-15 05:19:27.261659', 0, 0, 0, 0),
	(0.34782608695652173, 0.6, 0.2777777777777778, '2024-02-15 05:42:25.403280', 9, '2024-02-16 01:19:16.321887', 5, 18, 3, 5),
	(0.22727272727272727, 0.3333333333333333, 0.1875, '2024-02-15 05:47:32.261800', 10, '2024-02-16 01:19:16.321195', 6, 16, 2, 3),
	(1, 0, 1, '2024-02-15 05:57:07.464517', 11, '2024-02-15 06:03:43.328726', 0, 1, 0, 1),
	(0.8888888888888888, 0.8571428571428571, 0.4, '2024-02-15 07:34:27.289447', 12, '2024-02-16 01:19:16.321501', 7, 5, 6, 2),
	(0, 0, 0, '2024-02-15 14:06:40.580897', 26, '2024-02-15 14:06:40.580897', 0, 0, 0, 0),
	(0, 0, 0, '2024-02-15 15:13:25.417427', 31, '2024-02-15 15:13:25.417427', 0, 0, 0, 0),
	(0.125, 0, 0.125, '2024-02-15 15:45:16.737493', 32, '2024-02-16 01:19:16.322229', 0, 8, 0, 1),
	(0, 0, 0, '2024-02-15 15:51:56.867215', 33, '2024-02-15 15:51:56.867215', 0, 0, 0, 0),
	(0.6, 1, 0.5, '2024-02-15 15:59:07.087401', 34, '2024-02-15 19:29:23.758460', 1, 4, 1, 2),
	(0, 0, 0, '2024-02-15 17:34:28.138576', 35, '2024-02-15 17:34:28.138576', 0, 0, 0, 0),
	(0.8571428571428571, 0.8333333333333334, 1, '2024-02-15 19:06:42.642022', 38, '2024-02-16 01:19:16.317183', 6, 1, 5, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
