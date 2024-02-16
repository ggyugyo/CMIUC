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

-- 테이블 s10p13d108.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `created_at` datetime(6) DEFAULT NULL,
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_record_id` bigint(20) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `point` bigint(20) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `o_auth_provider` enum('KAKAO','NAVER') COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_l7ln7mk9ecj21psehl0364v5l` (`member_record_id`),
  CONSTRAINT `FK306xr47x8a7esrso4f8wqd0ic` FOREIGN KEY (`member_record_id`) REFERENCES `member_record` (`member_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 테이블 데이터 s10p13d108.member:~16 rows (대략적) 내보내기
INSERT INTO `member` (`created_at`, `member_id`, `member_record_id`, `modified_at`, `point`, `email`, `nickname`, `o_auth_provider`) VALUES
	('2024-02-15 03:02:58.542550', 3, 3, '2024-02-15 03:03:04.314773', 50000, 'sh980812@kakao.com', 'ㅇㅇㅇ', 'KAKAO'),
	('2024-02-15 03:32:43.392234', 5, 5, '2024-02-15 03:32:54.966117', 50000, 'h_ello_vvv@nate.com', '성영준서', 'KAKAO'),
	('2024-02-15 03:34:26.302028', 6, 6, '2024-02-15 03:34:33.083604', 50000, 'wkdtpwjd29@naver.com', '세정스', 'KAKAO'),
	('2024-02-15 05:08:59.846508', 7, 7, '2024-02-15 15:13:46.631029', 50000, 'hslee0912@naver.com', '이현석1', 'KAKAO'),
	('2024-02-15 05:19:27.308095', 8, 8, '2024-02-15 05:19:31.403969', 50000, 'qmak01@naver.com', '바르고', 'KAKAO'),
	('2024-02-15 05:42:25.494331', 9, 9, '2024-02-16 01:19:16.322073', 49500, 'kimtaeyong@kakao.com', '김용가리', 'KAKAO'),
	('2024-02-15 05:47:32.350232', 10, 10, '2024-02-16 01:19:16.321350', 53000, 'tlzkend1010@naver.com', '자연인찹쌀이', 'KAKAO'),
	('2024-02-15 05:57:07.507988', 11, 11, '2024-02-15 06:03:43.329016', 50000, 'jeniffer0812@icloud.com', '수혀이', 'KAKAO'),
	('2024-02-15 07:34:27.376227', 12, 12, '2024-02-16 01:19:16.321678', 52000, 'min120926@gmail.com', '김수민이올시다', 'KAKAO'),
	('2024-02-15 14:06:40.668705', 26, 26, '2024-02-15 14:06:52.234839', 50000, 'qkrtkfkd159@naver.com', '사랑씨', 'KAKAO'),
	('2024-02-15 15:13:25.515118', 31, 31, '2024-02-15 15:13:37.911381', 50000, 'jiyeon2536@khu.ac.kr', '트리케라톱스', 'KAKAO'),
	('2024-02-15 15:45:16.791453', 32, 32, '2024-02-16 01:19:16.322383', 54500, 'tjddudwns1@naver.com', '무지성영준', 'KAKAO'),
	('2024-02-15 15:51:56.967712', 33, 33, '2024-02-15 15:52:23.351315', 50000, 'yaj518@naver.com', '켓마잎켓 왕초보', 'NAVER'),
	('2024-02-15 15:59:07.129985', 34, 34, '2024-02-15 19:29:23.758657', 4000, 'elegant518@gmail.com', '왕초보 등장', 'KAKAO'),
	('2024-02-15 17:34:28.193202', 35, 35, '2024-02-15 17:34:44.694370', 0, 'dbswjddud@gmail.com', '인동스턴건', 'KAKAO'),
	('2024-02-15 19:06:42.743917', 38, 38, '2024-02-16 01:19:16.320999', 1500, 'qotjdrb6@naver.com', '배성규', 'KAKAO');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
