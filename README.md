## 프로젝트 소개
해당 웹사이트는 사용자간의 차량을 거래할수있는 중고차거래 사이트이며 판매자는 판매할차량에대한 정보와 사진 그외 부가적인 설명과 거래장소를 기입할수있으며
구매자는 자신이 원하는 차량 및 거래장소등을 검색하여 조건에 맞는 해당 판매자와의 1:1 실시간채팅이 가능합니다
### 사용언어
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Thymeleaf](https://img.shields.io/badge/Thymeleaf-%23005C0F.svg?style=for-the-badge&logo=Thymeleaf&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
### 개발환경
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)

## 기능
* 메인화면
  * 일반로그인 및 네이버,카카오 ID 로그인 기능
  * 날씨정보 API 를 활용하여 접속지역의 날씨정보 표시
  * 네이버 차량뉴스 API 를 활용하여 최신 업데이트되는 뉴스 표시
  * JSON 을 활용한 차량검색 기능
  
* 게시판
  * 글쓰기 및 읽기 기능
  * SQL문 을 활용하여 차량 조건검색 및 판매이름검색 기능
  * SQL문 을 활용하여 판매글 최신순,좋아요순,가격순 정렬
  * ajax통신을 통한 페이징
  * 좋아요 표시 기능
* 판매글
  * 차량사진 파일첨부 기능 (중복제거)
  * 웹소켓통신을 활용한 실시간 채팅기능
- - -
## 팀원 & 담당 역할
* 신재완 - 로그인(소셜포함), 로그아웃, 회원가입, 아이디/비밀번호 찾기(이메일 인증), 고객센터(게시판), 통합 검색, 날씨
* 이승준 - 차량등록, 조건 검색, 채팅, 정렬순(좋아요, 낮은가격, 높은가격) 보기, 카테고리별 보기
* 김재륜 - 차량리스트(최신순) 로직 구현, 페이징처리, 좋아요, 좋아요 전체 삭제, 마이페이지
* 하승화 - 메인페이지 제작, 뉴스 Api 이용, 반응형 구현, 마이페이지
* 김민우(Helper) - HTML & CSS 보완
* 공통부분 - 주제 선정, 페이지 레이아웃 설계, ERD 설계
