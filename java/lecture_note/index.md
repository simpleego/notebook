---
    title:  >
      쉽게 풀어쓴 C 프로그래밍
    date:
    slug: java1
    category:
    author:
---

<a href="java1.pdf">PDF version</a> | <a href="java1.pptx">Powerpoint Version</a>


    

<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide00.png' alt='제1장 기초 사항
어서와 Java는 처음이지!
' title='Slide: 0' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide01.png' alt='프로그램
프로그램은 작업지시서와 같다. 
' title='Slide: 1' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide02.png' alt='가장 많이 사용되는 언어는?
' title='Slide: 2' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide03.png' alt='자바는 누가 만들었을까?

' title='Slide: 3' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide04.png' alt='1991년에 Sun에서는 제임스 고슬링(James Gosling)를 비롯한 Green 연구팀에서는 가정용 전자 제품에 사용할 수 있는 작은 컴퓨터 언어를 설계

처음에 C++를 사용하여 운영 체제를 만들려고 시도하였는데 C++의 복잡도로 인하여 실패

Green 프로젝트를 위한 더 나은 언어를 직접 만들게 되는데 이것이 바로 자바. 

Green 프로젝트는 Time Warner의 주문형 비디오 시스템을 개발하다가 Time Warner가 경쟁사인 실리콘 그래픽스 사를 선택하는 바람에 결국 실패

1993년, 그래픽 기반의 월드 와이드 웹(world wide web)이 발표되고 자바의 개발자들은 곧 이러한 웹 기반의 응용 프로그램에는 자바와 같은 기계 중립적인 언어가 이상적이라는 것을 발견
자바의 역사
' title='Slide: 4' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide05.png' alt='자바 버전
' title='Slide: 5' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide06.png' alt='람다식(Lambda expressions)
작은 가상기계(VM)
병렬 배열 정렬(Parallel Array Sorting)
컬럭션을 위한 대용량 데이터 처리
Base64 엔코딩과 디코딩을 위한 표준 API
새로운 날짜, 시간 API(Date &amp; Time API)
강화된 패스워드기반 암호화(Password-Based-Encryption (PBE))

JDK8
' title='Slide: 6' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide07.png' alt='자바의 특징
' title='Slide: 7' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide08.png' alt='Write once, Run everywhere!
자바의 가장 큰 장점
' title='Slide: 8' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide09.png' alt='기존의 언어들의 실행방식
' title='Slide: 9' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide10.png' alt='자바 가상 기계
Write Once!
Run Everywhere!
' title='Slide: 10' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide11.png' alt='자바 컴파일러는 특정한 컴퓨터가 아닌 가상적인 기계(virtual machine)를 위한 코드를 생성한다. 

자바 가상 기계
' title='Slide: 11' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide12.png' alt='public class Hello {
	public static void main(String[] args) {
		System.out.println(&quot;Hello&quot;);
	}
}
바이트 코드
자바 프로그램
바이트 코드
Compiled from &quot;Hello.java&quot;
public class Hello extends java.lang.Object{
public Hello();
Code:
0:	aload_0
1:	invokespecial	#1; //Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
4:	return
public static void main(java.lang.String[]);
Code:
0:	getstatic	#2; //Field java/lang/System.out:Ljava/io/PrintStream;
3:	ldc	#3; //String Hello World!
5:	invokevirtual	#4; //Method java/io/PrintStream.println:(Ljava/lang/String;)V
8:	return
}


' title='Slide: 12' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide13.png' alt='자바 가상 기계
자바 가상 기계
Windows 7
Intel CPU
자바 가상 기계
리눅스 
AMD CPU
자바 바이트 코드

*.class


' title='Slide: 13' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide14.png' alt='중간 점검 문제
바이트 코드
자바 가상 기계
특정한 컴퓨터가 아닌 중간적인 코드를 생성하고 이것을 해석하여 실행하는 구조로 되어 있기 때문이다.
' title='Slide: 14' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide15.png' alt='중간 점검
바이트 코드와 자바 가상 기계
C 언어는 절차적 언어, 자바는 객체 지향 언어
여러 작업을 동시에 실행하는 것
' title='Slide: 15' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide16.png' alt='Java SE(Standard Edition)
Java EE(Enterprise Edition)
Java ME(Micro Edition)
자바의 버전



' title='Slide: 16' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide17.png' alt='자바의 버전
' title='Slide: 17' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide18.png' alt='Java SE는 데스크탑과 서버에서 자바 애플리케이션을 개발하고 실행할 수 있게 해주며 임베디드 환경(embedded environment)과 실시간 환경(real-Time environments)도 지원한다.
Java SE 

' title='Slide: 18' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide19.png' alt='Java SE 

' title='Slide: 19' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide20.png' alt='Java EE는 기업용 애플리케이션을 개발하는 데 필요한 여러 가지 도구 및 라이브러리들을 모아 놓은 것
응용 서버, 웹서버, J2EE API, 엔터프라이즈 자바 빈즈(JavaBeans) 지원, 자바 서블릿 API 와 JSP 등을 포함
Java EE
' title='Slide: 20' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide21.png' alt='Java ME는 핸드폰, PDA, TV 셉톱박스, 프린터와 같은 모바일 기기나 다른 엠베디드 장치들에서 실행되는 애플리케이션을 위한 강인하고 유연한 환경을 제공 
Java ME

' title='Slide: 21' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide22.png' alt='리치-인터넷-애플리케이션(RIA: Rich Internet Application)을 생성하고 배포하기 위한 자바 클라이언트 플랫폼
RIA은 서로 인터넷 상의 다양한 플랫폼에서도 동일한 외관으로 실행된다. 
자바 기술에 기반을 두고, JavaFX 플랫폼은 고성능의 하드웨어 가속 그래픽과 미디어 엔진 API를 제공
JavaFX

' title='Slide: 22' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide23.png' alt='자바 애플리케이션(Java application)
독립적으로 실행될 수 있는 일반 응용 프로그램
자바 애플릿(Java applet)
웹 브라우저 안에서 실행되는 작은 프로그램이다. 
자바로 만들 수 있는 것
' title='Slide: 23' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide24.png' alt='자바 서블릿(Java servlet)
웹서버에서 동작하는 서버 모듈로서 클라이언트의 요구를 받아서 그에 대한 처리를 한 후에, 실행 결과를 HTML 문서 형태로 클라이언트 컴퓨터로 전송
자바로 만들 수 있는 것
' title='Slide: 24' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide25.png' alt='HTML안에 자바 코드를 넣으면 웹페이지를 사용자와 상호작용하도록 만들 수 있다. JSP는 서버에서 실행되고 결과를 사용자에게 보여준다. 
자바로 만들 수 있는 것
' title='Slide: 25' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide26.png' alt='안드로이드 애플리케이션은 자바로 작성
안드로이드 개발자들은 자바의 SE 버전 중에서 AWT와 스윙(swing)을 제외한 거의 모든 패키지를 사용
효율성때문에 자체적인 달빅 가상 머신을 구현하였다. 


안드로이드 애플리케이션

' title='Slide: 26' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide27.png' alt='애플릿과 서블릿을 비교하여 보자. 



JSP에 대하여 웹을 통하여 조사하여 보자.
중간 점검 문제

애플릿: 서버에서 다운로드되어서 웹 페이지 안에서 실행
서블릿: 웹 서버 안에서 사용자의 요청을 처리
JavaServer Pages (JSP)는 서버 측의 자바 기술로서 클라이언트 컴퓨터의 요청에 따라서 동적으로, HTML, XML 등이 포함된 웹 페이지를 생성한다. 
' title='Slide: 27' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide28.png' alt='명칭: JDK (Java Development Kit) 
설명: 자바 개발 도구
다운로드 위치: java.sun.com
비용: 무료



자바를 사용하려면 무엇이 필요한가?

' title='Slide: 28' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide29.png' alt='JRE(Java Runtime Environment)
JRE는 자바 프로그램을 실행하기 위한 라이브러리, 자바 가상 기계, 기타 컴포넌트들을 제공한다. 

JDK(Java Development Kit)
JDK는 JRE에 추가로 자바 프로그램을 개발하는데 필요한 컴파일러, 디버거와 같은 명령어행 개발 도구를 추가한 것이다.

JDK와 JRE


JDK = JRE + 컴파일러 + 디버거 + …
' title='Slide: 29' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide30.png' alt='
다운로드
' title='Slide: 30' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide31.png' alt='
자바 설치
' title='Slide: 31' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide32.png' alt='
자바 설치
' title='Slide: 32' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide33.png' alt='JDK의 기본 설치 폴더는 c:\Program Files\Java

JDK의 구조
' title='Slide: 33' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide34.png' alt='데모와 샘플 파일
' title='Slide: 34' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide35.png' alt='데모와 샘플 파일
' title='Slide: 35' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide36.png' alt='자바 프로그램을 개발하는 데 개발 도구를 ______________라고 한다. 



JDK와 JRE의 차이점은 무엇인가?
중간 점검 문제

JDK 
JRE는 자바 프로그램을 실행만 시킬 수 있는 환경이고 JDK는 개발도 할 수 있는 환경이다. 
' title='Slide: 36' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide37.png' alt='자바 프로그램 개발 단계
' title='Slide: 37' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide38.png' alt='소스 파일의 생성
에디터를 사용
소스 파일은 .java 확장자
메모장, 이클립스 (www.eclipse.org), 넷빈(www.netbeans.org) 사용

컴파일	
컴파일러는 자바 소스 코드를 바이트 코드로 변환
바이트 코드는 확장자가 .class로 끝나는 파일에 저장

클래스 적재 
바이트 코드 파일을 메모리로 적재
네트워크를 통하여 적재될 수도 있다. 
자바 프로그램 개발 단계
' title='Slide: 38' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide39.png' alt='바이트 코드 검증
바이트 코드들이 이상이 없으며 자바의 보안 규칙을 위배하지 않는지를 검사

실행
자바 가상 기계가 바이트 코드를 실행
가장 빈번하게 실행되는 부분(HotSpot)에서는 JIT 컴파일러가 바이트 코드를 실제 컴퓨터의 기계어로 직접 변환하여 빠르게 실행
자바 프로그램 개발 단계
' title='Slide: 39' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide40.png' alt='어디에서나 컴파일러를 실행할 수 있도록 경로(path) 설정하기
제어판의 환경 변수 path를 변경한다. 
JDK 사용하기
' title='Slide: 40' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide41.png' alt='윈도우 보조 프로그램의 메모장 사용
파일의 확장자는 .java로 한다. 
소스 파일 작성
' title='Slide: 41' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide42.png' alt='컴파일

C:\java\examples&gt;javac Hello.java
C:\java\examples&gt;


C:\java\examples&gt;dir
...
2009-06-05 오후 04:06 454 Hello.class
2009-06-05 오후 02:53 144 Hello.java
2개 파일 598 바이트
' title='Slide: 42' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide43.png' alt='실행

C:\java\examples&gt;java Hello
안녕하세요. 자바 프로그래머 여러분!
C:\java\examples&gt;


java 명령어가 바로 “자바 가상 기계”를 구현한 것입니다.
' title='Slide: 43' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide44.png' alt='명령어 도구
' title='Slide: 44' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide45.png' alt='1. 컴파일하는 명령어 버전 이름은 __________이다.
2. Hello.java를 컴파일하면 ________     파일이 생성된다. 
3. 자바 가상 기계는 ____________ 프로그램으로 구현한다.

중간 점검 문제

javac
Hello.class
java
' title='Slide: 45' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide46.png' alt='자바 API 문서
자바 라이브러리에 대하여 설명하는 문서

자바 튜토리얼
자바 언어에 대한 강좌
자바 문서 참조 하기
' title='Slide: 46' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide47.png' alt='자바 API 문서 
' title='Slide: 47' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide48.png' alt='자바 튜토리얼
' title='Slide: 48' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide49.png' alt='demo 디렉토리의 서브 디렉토리 applets\Animator폴더로 이동하라. 명령 프롬프트에서 다음과 같은 명령어를 실행한다. 
C&gt; appletviewer example1.html
Lab: 데모 프로그램 실행하기
' title='Slide: 49' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide50.png' alt='demo 디렉토리의 서브 디렉토리 jfc\java2D로 이동하라. 명령 프롬프트에서 다음과 같은 명령어를 실행한다. 
C&gt; appletviewer Java2Demo.html
Lab: 데모 프로그램 실행하기
' title='Slide: 50' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide51.png' alt='Eclipse 
다중 언어 소프트웨어 개발 도구로서 IDE 와 plug-in 으로 구성
자바로 작성되었다.
자바 애플리케이션을 개발하는데 사용할수도 있다. 
C, C++, COBOL, Python, Perl, PHP도 지원
free and open source software.
NetBeans 
자바를 위한  cross-platform open source IDE
문법 하이라이팅 기능, 코드 완결 기능
비주얼 디자인 도구 포함
free and open source software.
자바를 위한 통합 개발 환경
' title='Slide: 51' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide52.png' alt='이클립스

' title='Slide: 52' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide53.png' alt='이클립스 설치
' title='Slide: 53' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide54.png' alt='작업 공간을 물어본다 -&gt; 자신이 사용하는 디렉토리로 변경
이클립스 실행
' title='Slide: 54' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide55.png' alt='이클립스 첫화면
' title='Slide: 55' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide56.png' alt='프로젝트 생성

' title='Slide: 56' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide57.png' alt='클래스 생성

' title='Slide: 57' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide58.png' alt='소스 코드 입력
' title='Slide: 58' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide59.png' alt='프로그램 실행

' title='Slide: 59' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide60.png' alt='프로그램 실행
' title='Slide: 60' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide61.png' alt='소스를 입력하는 과정에서 다음과 같이 System으로 하여야 할 것을 system으로 잘못 입력하였다고 가정.
컴파일 오류
' title='Slide: 61' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide62.png' alt='
컴파일 오류
' title='Slide: 62' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide63.png' alt='해결 방법을 제시
이클립스의 Quick Fix
' title='Slide: 63' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide64.png' alt='앞에서 작성한 hello 프로젝트를 USB에 저장하려면 hello 프로젝트를 선택한 상태에서 [File] -&gt; [Export] 메뉴를 선택한다.
이클립스 프로젝트 내보내기
' title='Slide: 64' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide65.png' alt='[File] -&gt; [Import] 메뉴를 선택한다
이클립스 프로젝트 읽기
' title='Slide: 65' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide66.png' alt='다음 프로그램을 이클립스를 이용하여 컴파일, 실행하여 보자. 

public class Hello2 {
       public static void main(String args[]) {
             System.out.println(&quot;안녕하세요?&quot;);		// ①
             System.out.println(&quot;자바를 처음 공부합니다.&quot;);
             System.out.println(&quot;자바는 재미있나요?&quot;);
       }
}




Lab: 이클립스 프로그램 작성하기
' title='Slide: 66' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide67.png' alt='SOLUTION
' title='Slide: 67' border='1'  width='85%%'/>





</section>



<section typeof='http://purl.org/ontology/bibo/Slide'>
<img src='Slide68.png' alt='Q &amp; A
' title='Slide: 68' border='1'  width='85%%'/>





</section>

