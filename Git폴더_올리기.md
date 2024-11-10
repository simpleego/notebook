Git Init, 깃허브 초기화
개발자는 매일 새로운 것들을 배우고 성장해야 하는 숙명이 있습니다. 그중에서도 깃헙은 개발자가 알아야 할 중요한 툴입니다. 깃헙으로 작업을 하다 보면 로컬의 대부분의 파일을 삭제했고 또 새로 생성된 파일들이 많을 때가 있을 수 있고 또 불필요한 내용 또는 올리지 말아야 할 내용들을 commit을 하는 경우가 발생합니다. 이런 경우 정리가 필요하지만 원격 저장소를 아예 다시 만드는 것까지는 번거로울 수 있습니다. 이때 원격 저장소를 초기화하는 방법에 대해서 알아보겠습니다 

 
[Github] 로컬 및 원격 branch 생성 | 조회 | 변경 | 삭제 | 디폴트 브랜치 설정

Github, 깃허브 GitHub는 소스 코드 호스팅 서비스입니다. 개발자들이 코드를 저장, 공유, 개발할 수 있는 공간을 제공합니다. 사용자는 프로젝트에 대한 액세스 권한을 부여할 수 있으며, 다른 사용


Git 초기화 명령어
1. 로컬 저장소의 .git directory를 삭제합니다.

rm -rf ./.git
 

2. 삭제 후 로컬 저장소를 초기화합니다.

git init

# 출력
Reinitialized existing Git repository in C:/~~/.git/
 

3. 초기화된 파일을 커밋합니다.

git add .
git commit -m 'Commit Message'
// add + commit message
git commit -am 'Commit Message'
 

4. 이후 원격 저장소 다시 연결을 처리합니다.

git remote add origin <원격 저장소 url>
 

5. 그리고 마지막으로 원격 저장소에 push 합니다.

git push --force --set-upstream origin   main < branch name: ex) master >
 

