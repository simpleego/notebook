# 오라클 서버 설정
## 1. 오라클 서버 접속 설정(PDB 서버)
![image](https://github.com/user-attachments/assets/2655b266-9bd0-49ba-8043-6019931fd33a)

## 2. 오라클 원격 접속을 위한 설정
EXEC DBMS XDB.SETLISTENERLOCALACCESS(FALSE);

![image](https://github.com/user-attachments/assets/0c5d402f-63c8-42e5-94dd-5283b5c3db6a)

```termial
SQL> EXEC DBMS_XDB.SETLISTENERLOCALACCESS(FALSE);
    PL/SQL 처리가 정상적으로 완료되었습니다.
```

## 3. 오라클 원격접속
- 오라클이 설치된 컴퓨터의 IP주소를 아래와 같이 명령창으로 확인
  ![image](https://github.com/user-attachments/assets/2527c666-56d2-43b7-ad9a-1ddc7852c0c8)

- 오라클 접속설정에서 호스트 이름 항목의 값을 IP주소를 입력
![image](https://github.com/user-attachments/assets/e642cd80-65dd-4fb6-b73f-ce2c5728b9a9)
> 방화벽에서 해당 오라클 포트가 막혀 있는 경우에는 접속되지 않을 수 있다.
