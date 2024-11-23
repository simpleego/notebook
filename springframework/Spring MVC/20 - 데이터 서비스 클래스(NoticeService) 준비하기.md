# 20 - 데이터 서비스 클래스(NoticeService) 준비하기
> 사용자 입력을 받아서 처리하는 방법을 기술한다.
>
## 데이터베이스 관련 클래스 준비
### 1. 데이터 서비스 관련된 클래스 패키지 생성 및 클래스 설정
> 아래 뉴렉처 사이트에서 관련된 클래스 파일을 다운로드한다.
>> https://www.newlecture.com/
### 2. 오라클 데이터베이스 테이블 생성 
```sql
CREATE TABLE NOTICE
( 
ID NUMBER NOT NULL,
TITLE NVARCHAR2(100) NOT NULL,
WRITER_ID NVARCHAR2(50) NOT NULL,
CONTENT CLOB,
REGDATE TIMESTAMP (6) DEFAULT systimestamp NOT NULL,
HIT NUMBER DEFAULT 0 NOT NULL,
FILES NVARCHAR2(1000),
PUB NUMBER(1,0) DEFAULT 0 NOT NULL,
CONSTRAINT "NOTICE_PK" PRIMARY KEY ("ID")
)
```
### 3. 데이터서비스 패키지 설정과 프로젝트 폴더 구성
![image](https://github.com/user-attachments/assets/b68177f8-295c-46be-b17b-31e5128dd931)



