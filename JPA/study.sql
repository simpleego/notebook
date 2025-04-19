DROP TABLE IF EXISTS emp, dept, locations;

-- 1. locations ���̺� ����                     

CREATE TABLE LOCATIONS (
  LOC_CODE CHAR(2) ,
  CITY  VARCHAR(20),
  PRIMARY KEY (LOC_CODE)
);

INSERT INTO LOCATIONS VALUES ('A1','SEOUL');
INSERT INTO LOCATIONS VALUES ('B1','DALLAS');
INSERT INTO LOCATIONS VALUES ('C1','CHICAGO');
INSERT INTO LOCATIONS VALUES ('D1','BOSTON');

-- 2. dept ���̺� ����

CREATE TABLE DEPT (
  DEPTNO INT PRIMARY KEY,
  DNAME VARCHAR(20),
  LOC_CODE CHAR(2),
  FOREIGN KEY (LOC_CODE) REFERENCES LOCATIONS(LOC_CODE)
);

INSERT INTO DEPT VALUES (10,'ACCOUNTING','A1');
INSERT INTO DEPT VALUES (20,'RESEARCH','B1');
INSERT INTO DEPT VALUES (30,'SALES','C1');
INSERT INTO DEPT VALUES (40,'OPERATIONS','A1');
INSERT INTO DEPT VALUES (50,'INSA',null);

-- 3. emp ���̺� ����

CREATE TABLE EMP (
  EMPNO INT PRIMARY KEY,
  ENAME VARCHAR(14),
  JOB VARCHAR(30),
  MGR INT,
  HIREDATE DATE,
  SAL INT,
  COMM INT,
  DEPTNO INT,
  FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO)
);

INSERT INTO EMP VALUES
(7369,'SMITH','CLERK',7902,'1980-12-17',800,null,20);
INSERT INTO EMP VALUES
(7499,'ALLEN','SALESMAN',7698,'1981-02-20',1600,300,30);
INSERT INTO EMP VALUES
(7521,'WARD','SALESMAN',7698,'1981-02-22',1250,200,30);
INSERT INTO EMP VALUES
(7566,'JONES','MANAGER',7839,'1981-04-02',2975,30,20);
INSERT INTO EMP VALUES
(7654,'MARTIN','SALESMAN',7698,'1981-09-28',1250,300,30);
INSERT INTO EMP VALUES
(7698,'BLAKE','MANAGER',7839,'1981-04-01',2850,null,30);
INSERT INTO EMP VALUES
(7782,'CLARK','MANAGER',7839,'1981-06-01',2450,null,10);
INSERT INTO EMP VALUES
(7788,'SCOTT','ANALYST',7566,'1982-10-09',3000,null,20);
INSERT INTO EMP VALUES
(7839,'KING','PRESIDENT',null,'1981-11-17',5000,3500,10);
INSERT INTO EMP VALUES
(7844,'TURNER','SALESMAN',7698,'1981-09-08',1500,0,30);
INSERT INTO EMP VALUES
(7876,'ADAMS','CLERK',7788,'1983-01-12',1100,null,null);
INSERT INTO EMP VALUES
(7900,'JAMES','CLERK',7698,'1981-10-03',950,null,30);
INSERT INTO EMP VALUES
(7902,'FORD','ANALYST',7566,'1981-10-3',3000,null,20);
INSERT INTO EMP VALUES
(7934,'MILLER','CLERK',7782,'1982-01-23',1300,null,10);


DROP TABLE IF EXISTS visitor, imgtest, meeting, reply;


-- 4. visitor ���̺� ����

create table visitor (
  id int primary key auto_increment,
  name varchar(15) not null,
  writedate datetime not null,
  memo varchar(100) not null
);


insert into visitor (name, writedate, memo) values('�Ѹ�', now(), 'ȣ��ȣ��~~');
insert into visitor (name, writedate, memo) values('��ġ', '2023-12-25', '�� Ÿ�����^^');
insert into visitor (name, writedate, memo) values('�����', '1990-8-20', '����߾� ���̼� �Ծ��');




-- 5. imgtest ���̺� ����

create table imgtest (
    id int primary key auto_increment,
    filename  varchar(45) not null,
    imgcontent  mediumblob not null
);



-- 6. meeting ���̺� ����

create table meeting(
    id int primary key auto_increment,
    name  varchar(24),
    title  varchar(120),
    meetingdate  datetime
);


insert into meeting (name, title, meetingdate) values('������', '�߽ĸ������ �޴� ���ϼ���', '2024-08-13 12:30');
insert into meeting (name, title, meetingdate) values('��ũ', '�нĸ������ �޴� ���ϼ���', '2024-08-10 15:00');
insert into meeting (name, title, meetingdate) values('�ν�', '�Ͻĸ������ �޴� ���ϼ���', '2024-09-01 10:30');




-- 7. reply ���̺� ����

create table reply (
    id int primary key auto_increment,
    name varchar(30),
    content varchar(120),
    refid int,
    foreign key (refid) references meeting(id) on delete cascade
);


insert into reply (name, content, refid) values ('�����', '������', 1);
insert into reply (name, content, refid) values ('��浿', '¥���', 1);
insert into reply (name, content, refid) values ('��ġ', '�ʹ�', 3);
insert into reply (name, content, refid) values ('����', '��ǳ��', 1);
insert into reply (name, content, refid) values ('�Ѹ�', '�쵿', 3);



 



