# React 프로젝트 기본 구조

![image](https://github.com/user-attachments/assets/51088a62-148a-4ca5-9f22-ca8787736f12)


## node_modules

CRA를 구성하는 모든 패키지 소스 코드가 존재하는 폴더
package.json

CRA 기본 패키지 외 추가로 설치된 라이브러리/패키지 정보(종류, 버전)가 기록되는 파일
모든 프로젝트마다 package.json이 하나씩 존재한다.

### "dependencies"
리액트를 사용하기 위한 모든 패키지 리스트, 버전 확인이 가능.
실제 코드는 node.modules 폴더에 존재한다.

"scripts"
start : 프로젝트 development mode(개발 모드) 실행을 위한 명령어. npm run start
build : 프로젝트 production mode(배포 모드) 실행을 위한 명령어. 서비스 상용화.

❓❓ 근데 왜 node.modules과 package.json에서 이중으로 패키지를 관리할까?
- 실제 내가 작성한 코드, 내가 설치한 패키지는 내 로컬에만 존재.
- github에 올릴 때 내가 작성한 코드와 함께 pacakge.json(추가로 설치한 패키지)를 넘긴다.
- 다른 사람이 그것을 (pull) 받아서 npm install만 입력하면 package.json에 기록되어 있는 패키지의 이름과 버전 정보를 확인하여 자동으로 설치한다.
- 이 때, github에 올릴 때, node.modules는 올리면 안되는데 (불필요한 용량 차지)
- .gitignore 파일에 github에 올리고 싶지 않은 폴더와 파일을 작성할 수 있다.
.gitignore

.gitignore 파일에 github에 올리고 싶지 않은 폴더와 파일을 작성할 수 있다.
push를 해도 .gitignore 파일에 작성된 폴더와 파일은 올라가지 않는다.
package-lock.json (or yarn.lock)

프로그래머가 관리할 필요가 없고 npm 이나 yarn이 알아서 관리해주는 파일들
lock파일은 해당 프로젝트에 설치한 패키지 , 그패키지와 관련된 모든 패키지의 버전정보를 포함한다.

💡 예를 들어 우리가 패키지 두 개를 가지고 있다고 생각해보자.
package A를 1.0 버전으로, package B를 2.1버전으로 설치했을 때, 만약 다른 사람이 이 프로젝트를 클론받아 npm install은 한다면 동일하게 A는 1.0버전, B는 2.1 버전으로 설치가 될것이다.
하지만 만약에 package A라는 것이 사실 package C라는 것을 포함하고 있는데 이 C라는 것은 어떤 버전으로 설치해야 되는지 명시가 안되어 있어 다른 사람이 설치를 했을 때 프로젝트가 실행이 안될 가능성이 있다.
하지만 package-lock파일이 있어 이런 것들을 방지할 수 있는데 package-lock파일에는 C가 어떤 버전으로 설치가 되었는지 기록이 되어있기 때문이다.
이렇게 관련된 패키지 버전들을 자동으로 관리하는 역할을 한다.

## public

### index.html을 포함하고 있다.
<div id="root><div>
가상 DOM을 위한 html파일 (빈 껍데기 파일)

💡 우리가 웹을 배포한다는 건 특정 폴더를 서버 컴퓨터에 올려두는 것이다. 그래서 서버랑 연결된 url로 접근하면 해당 폴더의 파일을 요청할 수 있다 -> 뒤에 따로 추가적인 url을 안붙이면 index.html을 요청한다. 우리가 CRA를 배포했을 때 실제 서버에 배포되는 폴더가 public 폴더이다. 그래서 우리가 public에 특정 디렉토리, 파일을 만들어두면 서버 url을 통해서 접근이 가능하다. 예시로, public/images/test.png 파일을 만들어두면, 서버에 접속해서 해당 파일에 접근할 수 있다.


  
## src

index.js을 포함하고 있다.
React의 시작
ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render 함수의 인자는 두개이다. 첫 번째 인자는 화면에 보여주고 싶은 컴포넌트,
두 번째 인자는 화면에 보여주고 싶은 컴포넌트의 위치

### App.js

현재 화면에 보여지고 있는 초기 컴포넌트
React Router를 설치하면 컴포넌트가 최상위 컴포넌트로 App.js 컴포넌트 자리에 위치하게 된다.
