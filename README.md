
# 🐈 Catch Mouce If U CAT 🐭

## 개요
### 🎮서비스 설명
- 고양이와 쥐의 숨막히는 추리 게임
- 고양이에게 잡히기 전에 인원수 만큼의 치즈를 찾아라!🧀
### 기획 의도
- 웹에서 크라켄 게임 서비스를 제공하여 접근성을 높였습니다
- 손쉽게 웹을 통해 무료로 게임을 즐길 수 있습니다.
- WebRTC를 적용하여 화상 및 음성 채팅을 하여 크라켄 게임에 더욱 의사소통을 잘 되어 원활한 진행이 가능합니다.
- 같은 공간에 있지 않아도 다같이 화상 게임을 통해 아이스 브레이킹을 할 수 있습니다.

## 개발 환경
### 기술 스택
**BE**

<img  src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/> <img  src="https://img.shields.io/badge/springsecurity-6DB33F?style=flat-square&logo=springsecurity&logoColor=white"/> <img  src="https://img.shields.io/badge/spring JPA-6DB33F?style=flat-square&logo=spring&logoColor=white"/> <img  src="https://img.shields.io/badge/REDIS-DC382D?style=flat-square&logo=REDIS&logoColor=white"/> <img  src="https://img.shields.io/badge/swagger-85EA2D?style=flat-square&logo=swagger&logoColor=white"/> <img src="https://img.shields.io/badge/mariadb-003545?style=flat-square&logo=mariadb&logoColor=white"/> <img src="https://img.shields.io/badge/mariadb-003545?style=flat-square&logo=mariadb&logoColor=white"/>  <img  src="https://img.shields.io/badge/webrtc-333333?style=flat-square&logo=webrtc&logoColor=white"/> 

**FE**

<img  src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> <img  src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img  src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=React&logoColor=white"/> <img  src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/> <img  src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/> <img  src="https://img.shields.io/badge/mui-007FFF?style=flat-square&logo=mui&logoColor=white"/> <img  src="https://img.shields.io/badge/reactrouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img  src="https://img.shields.io/badge/framer-0055FF?style=flat-square&logo=framer&logoColor=white"/> <img  src="https://img.shields.io/badge/webrtc-333333?style=flat-square&logo=webrtc&logoColor=white"/> 


### 협업
 <img  src="https://img.shields.io/badge/notion-000000?style=flat-square&logo=notion&logoColor=white"/>  <img  src="https://img.shields.io/badge/figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/> <img  src="https://img.shields.io/badge/jirasoftware-0052CC?style=flat-square&logo=jirasoftware&logoColor=white"/> <img  src="https://img.shields.io/badge/gitlab-FC6D26?style=flat-square&logo=gitlab&logoColor=white"/> <img  src="https://img.shields.io/badge/gerrit-EEEEEE?style=flat-square&logo=gerrit&logoColor=black"/>  <img  src="https://img.shields.io/badge/mattermost-0058CC?style=flat-square&logo=mattermost&logoColor=black"/>  <img  src="https://img.shields.io/badge/discord-5865F2?style=flat-square&logo=discord&logoColor=black"/>
 
### 배포
<img  src="https://img.shields.io/badge/amazonec2-FF9900?style=flat-square&logo=amazonec2&logoColor=black"/> <img  src="https://img.shields.io/badge/jenkins-D24939?style=flat-square&logo=jenkins&logoColor=black"/> <img  src="https://img.shields.io/badge/docker-2496ED?style=flat-square&logo=docker&logoColor=white"/> <img  src="https://img.shields.io/badge/nginx-009639?style=flat-square&logo=nginx&logoColor=white"/> 

### 프로젝트 기간
**`2023.12.28~2024.02.16`**
## 서비스 화면
### 로그인
|![최초화면-회원가입-닉네임창-움짤](/uploads/719cd46e46b34dd892935451f2fc8393/최초화면-회원가입-닉네임창-움짤.gif)|
|--|
|**카카오 로그인 및 네이버 로그인 기능**|
|소셜 로그인 성공시 최초 회원가입인 경우 서비스에서 사용할 닉네임을 설정할 수 있습니다.|

### 로비 입장
|![닉네임변경-로비-움잘](/uploads/48edce234e100cfd07154fbab6b70f08/닉네임변경-로비-움잘.gif)|
|--|
|![친구신청-움잘](/uploads/78c3f2ecc951ea7f47cd2f3c73b43796/친구신청-움잘.gif)|
|**로비**	|
|왼쪽 상단에 친구 리스트 및 친구 1:1 채팅 기능과 왼쪽 하단에 게임 랭킹 서비스가 존재합니다. 랭킹의 경우 전체 랭킹과 나의 랭킹에 대한 정보를 볼 수 있습니다.오른쪽에 게임방 리스트가 존재합니다. 입장 가능한 방을 찾아 들어갈 수 있습니다.	|

### 게임방 입장
|![대기방입장-움짤](/uploads/7b99985188d84cc7a8b70eeebbe18df3/대기방입장-움짤.gif)|
|--|
| 게임방에 들어가면 방 채팅이 있습니다. 중간에 있는 게임레디 버튼을 이용하여 게임 준비가능 합니다. 준비를 누를 경우 준비 완료 버튼이 파란색이 되며 레디한 유저의 화면이 움직이며 표시를 합니다.	|

### 게임 시작
|![게임시작-직업공개-움짤](/uploads/20e6d1f264f07ad4e5ade9deae37f030/게임시작-직업공개-움짤.gif)|
|--|
|게임 시작|
| 대기 방에서 현재 방에 접속한 인원이 모두 레디를 하게 되면, 게임이 시작됩니다. 게임 시작 인원은 4~6명이 가능합니다. 게임이 시작되면 랜덤으로 각 사람마다 역할이 배정받게 됩니다. 해당 역할을 숨기면서 목표를 달성하기 위해 추리 게임을 진행합니다.|

|(게임 방 액션카드 장면)|
|--|
|게임 진행 중 액션카드 발생 시	|
| 대기 방에서 현재 방에 접속한 인원이 모두 레디를 하게 되면, 게임이 시작됩니다. 게임 시작 인원은 4~6명이 가능합니다. 게임이 시작되면 랜덤으로 각 사람마다 역할이 배정받게 됩니다. 해당 역할을 숨기면서 목표를 달성하기 위해 추리 게임을 진행합니다.|

|![게임종료-_방나가기](/uploads/4c9df4644960d70906f02f28749022cf/게임종료-_방나가기.gif)|
|--|
| 대기 방에서 현재 방에 접속한 인원이 모두 레디를 하게 되면, 게임이 시작됩니다. 게임 시작 인원은 4~6명이 가능합니다. 게임이 시작되면 랜덤으로 각 사람마다 역할이 배정받게 됩니다. 해당 역할을 숨기면서 목표를 달성하기 위해 추리 게임을 진행합니다.|


## 주요 기능
- **Catch Mouse If U Cat 카드 게임**
- **친구 신청 및 친구 채팅**
- **게임 랭킹**
- **소셜로그인**

## 기술 소개
- 웹 어플리케이션
- 소셜 로그인
	- 카카오 로그인
	- 네이버 로그인
	`OAuth2` 인증을 이용해 불필요한 개인정보 입력 최소화
- 친구 신청 및 친구 채팅
	- 유저끼리 친구 신청하여 친구 맺기가 가능
	- 친구끼리 1:1 채팅이 가능
	- 1:1 채팅은 DB에 저장되어 이전 기록을 모두 볼 수 있음
	- 한 명이 접속하지 않은 상태여도 나중에 채팅 값을 볼 수 있음
- 게임 랭킹
	- 게임 할 때마다 유저 각각 승/패를 저장하여 랭킹 값에 반영
- 게임 진행
	- 4-6 명이서 총 4턴의 
## 설계 문서
![erd](/uploads/aea9bda6ee5ad3f8a1da684c4e3b434c/erd.PNG)


## API 명세서



## 팀원 소개
| 이 름 |김태용 | 문수민 |배성규 |김수민 |성영준 |여아정 |
| -- |-- |-- |-- |-- |-- |-- |  
|    | FE	| FE	| FE	| BE	| BE	| BE	|
|	 | 팀장, 게임로직	| 디자인, 친구채팅	| Websocket	, 로비	| Websocket, 친구기능, 	| spring security, 인프라, OAuth	| websocket, 게임로직	|

