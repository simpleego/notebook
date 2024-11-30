Git은 git repository(저장소) 내의 파일들을 관리한다. 저장소는 두 가지 방법으로 만들 수 있다.

아직 버전관리를 하지 않는 로컬 디렉토리 하나를 선택해서 Git 저장소를 적용
GitHub에 새로운 저장소 만들어서 url 생성

```git
$ git init //.git 하위 디렉토리를 만들어 저장소에 필요한 뼈대 파일 생성 혹은 초기화
$ git remote add origin <remote repo url> //remote repo url = origin으로 설정
$ git remote -v
$ git add .
$ git commit // 파일 버전관리 시작
$ git push -u origin main
```

다른 어딘가에서 Git 저장소를 Clone
다른 프로젝트에 참여하거나 git repository를 복사하고 싶을 때
$ git clone <remote repo url> //reomte repo를 로컬로 복제하기
 or
$ git clone <remote repo url.git> <newname> // 새로운 디렉토리 이름으로 복제하기 
1.2.1 Origin이란?
지금까지는 많은 생각없이 origin이라는 용어를 사용해왔다. 이 origin의 의미는 무엇일까? Origin은 우리 로컬 저장소와 연결된 원격 저장소의 url을 의미한다. 따라서 아래의 커맨드들은 다음과 같은 의미를 가진다.

$ git remote add origin <remote repo url> // 원격 서버의 origin을 해당 url로 설정하겠다고 git에게 알려줌
$ git push origin main // origin url의 main 브랜치로 commit을 푸시하겠다
$ git pull origin main // origin url의 main 브랜치에서 commit을 가져오겠다
origin = alias(별칭) of remote repository url

$git remote -v // 커맨드로 origin이 가리키는 url 확인
remote = origin이 참조하는 깃 커맨드

1.2.2 Upstream이란?


새로운 저장소를 만들고 원격 저장소에 커밋을 푸시할 때 $ git push -u origin main 와 같이 upstream을 초기에 설정해주어야 한다(-u는 --set-upstream 을 의미). Upstream(상류)는 저장소간의 관계를 의미하는 상대적인 개념이다.

개인 프로젝트
원격 저장소가 upstream, 로컬 저장소가 downstream
우리는 상류(원격 저장소)에 커밋을 push하고, 상류로부터 pull 커맨드를 사용해 커밋을 받아온다.
팀 프로젝트(Fork)
팀프로젝트 원격 저장소가 upstream, 나의 원격 저장소가 downstream
나의 원격 저장소가 upstream, 로컬 저장소가 downstream
우리의 원격 저장소에는 fork를 한 팀 프로젝트 원격 저장소로 push할 권한이 없음. 대신 PR(Pull Request)을 보내고 merge를 기다려야 함
팀 프로젝트(Clone)
팀프로젝트 원격 저장소가 upstream, 나의 로컬 저장소가 downstream
1.3 Commit
Commit은 일종의 save point이다. 그 시점의 프로젝트 파일들을 묶어 snapshot을 찍고 git에 변경 사항과 그 시간을 저장할 수 있다. 커밋과 관련된 커맨드는 아래와 같으며 우리는 add > commit > push 사이클을 자주 사용하게 된다. 여기서 주의할 점은 git은 변경 사항만 저장하는 것이 아니라 그 시점의 파일을 통째로 저장한다.

add: 커밋하고 싶은 것들만 묶어서 stage에 올림
commit: 세이브 포인트. 저장을 원하는 파일들을 묶어서 커밋 명령
push: 현재 세이브 데이터(커밋)를 내 원격 서버 저장소로 올림
1.4 Local repository의 3 가지 영역


로컬 저장소에서 파일은 3 가지 영역(상태)로 관리되며, Working directory→ Staging Area → Repository Area의 흐름을 가진다

working directory: 파일을 수정하고 작업하는 영역
staging area: commit할 파일의 snapshot을 만드는 영역
repository area: commit들의 히스토리를 기록하는 영역
$tree .git: working directory 구조 확인
$git.log: commit history 확인

1.4 Branch와 merge
1.4.1 Branch란?

[사진 출처: https://www.atlassian.com/ko/git/tutorials/using-branches/git-merge]

하나의 프로젝트에 대해 여러 버전을 만들거나 기능 개발을 위해 독립적인 공간이 필요할 때 branch(브랜치)를 생성한다.

feature_x 브랜치 만들고 해당 브랜치로 HEAD 옮기기
$git checkout -b feature_x
main으로 돌아오기 / 브랜치 이동하기
$git checkout main
$git checkout <branch name>
브랜치 삭제하기
$git branch -d <branch name>
브랜치를 원격 저장소에 전송해야 다른사람들이 접근할 수 있음
$git push origin <branch name>
HEAD: 내가 위치해있는 commit

1.4.2 Merge: 갱신과 병합
하나의 브랜치를 현재 브랜치(HEAD)와 병합하기 위해 merge 를 사용한다.

로컬 저장소를 원격 저장소에 맞춰 갱신하기 git pull
원격 저장소의 변경 내용을 로컬에서 받고 병합: pull = fetch + merge
$git pull origin <branch name>
다른 브랜치의 변경 내용을 현재 브랜치로 병합하기 $git merge <branch name>
변경 내용 병합 전에 어떻게 바뀌었는지 비교도 가능 $git diff <원래 브랜치> <비교대상브랜치>
두 과정 모두 git은 자동으로 변경 내용을 병합하려하지만 가끔 conflict 발생하므로, git이 알려주는 충돌 부분을 직접 수정해서 병합 가능한 상태 만들어야 한다.

2. 자주 사용하는 Git CLI(Command Line Interface) 흐름 파악하기

내가 자주 사용하는 깃의 커맨드를 위와 같이 그림으로 표현해보았다. 자주 헷갈리는 로컬 저장소 내에서 사용하는 커맨드와 로컬 - 원격 저장소 간에 사용하는 커맨드를 한 눈에 구분할 수 있다.

3. 내가 자주 겪은 문제들
내가 깃허브를 사용하면서 자주 겪고있는 문제들을 정리해보려 한다. 참고로 VS code에서 파일 옆에 c 표시가 생기는 것은 충돌이 발생했다는 뜻이다.

3.1 원격 저장소가 로컬 저장소의 commit보다 앞설 경우
서버 저장소(origin/main)가 내 로컬(main)보다 더 앞선 커밋을 가지고 있는 경우, 로컬 저장소에서 작업을 시작하기 전에 git pull을 진행해야 한다. 그러나 pull을 잊고 로컬에서 새로운 commit을 만든 경우 merge하라는 경고가 뜨게 된다. 그 경우 아래와 같이 해결하면 된다.

$git push origin <branch name>을 입력하면 merge하라는 충돌이 뜬다.
i를 누른다 (commit message를 입력하기 위해)
merge에 대한 message를 입력한다.
esc를 누른다.
:wq를 입력한다.
enter를 누른다 → merge 완료
$git push origin <branch name> --force : 혹은 강제로 푸시할 수도 있다.
3.2 이전 commit 덮어쓰기
Commit 메시지를 수정하지 않고 변경사항만 덮어쓰고 싶은 경우가 발생할 경우 아래와 같이 해결하면 된다. 이 방법은 가장 최근 commit만 수정 가능하다.

$git commit --amend --no-edit (메시지 수정 없다는 뜻) → $git push origin <branch name> --force 강제 푸시
3.3 Fork 해온 저장소의 최신 커밋 받아오기
팀 프로젝트를 진행하면서 팀의 원격 저장소가 변경되었을 때(팀원 코드 merge, 새로운 세팅) 최신 커밋들을 받아와야 하는 경우가 있었다. pull 커맨드를 사용하는 것보다 아래와 같이 fetch와 merge를 따로 사용하는 것이 이해하기 편하여 정리하였다.

먼저 로컬 저장소에서 작업하던 내용을 커밋으로 올려야한다. 피치 못하게 커밋을 할 수 없는 경우
git stash를 사용하여 임시 저장한다.(git stash pop으로 불러올 수 있다)

팀의 원격 저장소의 url 별칭 만들기
나의 로컬 저장소는 기본적으로 origin으로 나의 원격 저장소 url을 별칭으로 가지고 있다. 보통 upstream이라는 별칭으로 팀 저장소의 url을 저장하나 다른 이름을 사용하여도 된다.

git remote add upstream // upstream 별칭을 만든다
git remote add upstream [팀 저장소 url] // upstream에 팀 저장소 url을 저장한다.
git remote -v // origin이 나의 원격 저장소, upstream이 팀의 원격 저장소로 설정되어있으면 된다.

팀의 원격 저장소에서 최신 커밋을 가져오자
git fetch upstream // 최신 커밋 가져오기

커밋을 가져올 브랜치는 로컬에서 따로 생성해주어야 한다. 내 로컬 브랜치에서 같은 이름을 사용하려고 해도 생성해야 하는 것 같다. (이 부분은 추후 알아볼 예정이다.)
git checkout (-b) [로컬 브랜치] // 최신 커밋을 받을 로컬 저장소 브랜치
git merge upstream/팀브랜치 // 팀 원격 저장소 중 커밋을 받아올 브랜치를 설정한다.

나의 원격 저장소에 머지 내용을 올린다.
git push origin [로컬 브랜치]

예를들어, 팀의 원격 저장소의 develop 브랜치의 커밋 내용을 나의 teamDevelop 브랜치로 가져오려면
git fetch upstream > git checkout -b teamDevelop > git merage upstream/develop > conflict 해결 >git push origin teamDevelop

conflict는 VScode source control에서 해결 가능하며 아래와 같이 ~n으로 터미널에서 충돌이 난 파일 개수(n)을 확인할 수 있다. 숫자가 모두 없어지면 해당 내용을 커밋하고 나의 원격 저장소에 올리면 머지가 종료된다.



마치며
추가로 좋은 커밋 메시지를 위해 우테코에서는 the AngularJS commit conventions 을 권장하는데 이에 대해서는 따로 글로 정리할 예정이다.

Git/GitHub를 사용하는 이유는 개발을 하다 되돌아가기 위한 세이브 포인트를 만들기 위해서이다. 이제는 깃에 대한 두려움을 줄이고 커맨드를 이해하면서 사용하는 습관을 들이려 한다.

참고자료
