# git Command

## Initializing
#### git start - 초기화, 시작
    $ git init

#### git clone - 저장소 복제
    $ git clone <repository url>
    
#### add new remote repository - 새로운 원격 저장소 추가
    $ git remote add <remote repository> <repository url>

## Basic
#### add and staging files  - 새로운 파일을 추가하거나 존재하는 파일 스테이지에 추가
    $ git add <file name>   # or .
#### commit 
    $ git commit -m "messege"
#### only add some parts of files - 파일 일부만 스테이징
    $ git add -p [<file> [<file> [files etc…]]]
#### add files using git conversation mode - add시 Git 대화 모드를 사용하여 파일 추가
    $ git add -i
#### staging the changes modified files - 수정된 파일의 변경 사항 스테이징
    $ git add -u [<path> [<path>]]
#### commit the changes all modified files - 수정되고 추적되는 모든 파일의 변경 사항 커밋하기
    $ git commit -m “message” -a
#### recover the changes of working tree - 작업 tree의 변경 사항 복구
    $ git checkout HEAD <file> [<file>]
#### cancel uploaded files on stage - add 로 업로드된 파일 취소하기
    $ git reset HEAD <file> [<file>]
#### modify last commit - 마지막 커밋 수정
    $ git commit -m “message” - -amend
#### modify previous commit and reuse commit message - 이전 커밋을 수정하고 커밋 메시지를 재사용하기
    $ git commit -C HEAD - -amend
#### rewind before updating - 수정 이전으로 돌리기
    $ git reset --hard

----------------------
## stash command
#### save into stash
    $ git stash     // = git stash save
#### check stash list
    $ git stash list
#### check certain stash detail 
    $ git stash <file>
#### apply stash - by removing files from stash lists
    $ git stash pop
#### apply stash - by leaving files from stash lists
    $ git stash apply

## branch
#### see local branch - 지역 브랜치 목록 확인
    $ git branch
#### see remote branch - 원격 브랜치 목록 확인
    $ git branch -r
#### see all branch lists - 지역과 원격을 포함한 모든 브랜치 목록 확인
    $ git branch -a
#### reproduce new branch from now branch - 현재 브랜치에서 새로운 브랜치 생성
    $ git branch <new branch>
#### checkout other branch - 다른 브랜치로 이동
    $ git checkout <branch name>
#### create and use new branch from new branch - 현재 브랜치에서 새로운 브랜치 생성, 이동
    $ git checkout -b <new branch name>
#### create branch from other initial directory - 다른 시작 지점에서 브랜치 생성
    $ git branch <new branch name> <location for new branch>
#### overwrite previous branch with new branch - 기존의 브랜치를 새로운 브랜치로 덮어쓰기
    $ git branch -f <previous branch> [<location for new branch>]
#### move/rename branch - 브랜치를 옮기거나 브랜치명 변경하기
    $ git checkout -m <previous branch name> <new branch name>  # if "new branch" doesn't exist ... - <새로운 브랜치>가 존재하지 않을 경우
    $ git checkout -M <previous branch> <new branch>    # overwrite - 무조건 덮어쓰기

#### merge other branch into now branch - 다른 브랜치를 현재 브랜치로 합치기
    $ git merge <branch>
#### merge without commit - 커밋하지 않고 합치기
    $ git merge - -no-commit <branch>
#### merge after choose - 선택하여 합치기
    $ git cherry-pick <commit name>
#### merge after choose without commit - 커밋하지 않고 선택하여 합치기
    $ git cherry-pick -n <commit name>
#### merge contents into other branch- 브랜치의 이력을 다른 브랜치에 합치기
    $ git merge - -squash <branch>
#### remove branch - 브랜치 삭제하기
    $ git branch -d <subject branch>  # 삭제할 브랜치가 현재 브랜치에 합쳐졌을 경우에만
    $ git branch -D <subject branch>   # 삭제할 브랜치가 현재 브랜치에 합쳐지지 않았어도


## Git changes

#### see all the changes - 모든 이력 확인
    $ git log
#### show the chages with logs 변경 사항을 보여주는 패치와 함께 로그 표시하기
    $ git log -p
#### limit log count with only 1 lists - 1개의 항목만 보이도록 로그 개수 제한하기
    $ git log -1
#### limit log count with only 20 lists and patch - 20개의 항목과 패치만 보이도록 로그 제한하기
    $ git log -20 -p
#### see commit log for 6 months - 6개월 동안의 커밋 로그 보기
    $ git log - -since=”6 hours”
#### see commit log before 2 days - 이틀 전까지의 커밋 로그 보기
    $ git log - -before=”2 days”
#### see 3 logs before HEAD - HEAD보다 세 개 이전의 커밋 로그 보기
    $ git log -1 HEAD-3
    $ git log -1 HEAD^^^
    $ git log -1 HEAD~1^^
#### see commit log between two point - 두 지점 사이의 커밋 로그 보기
    $ git log <start point> … <end point>
    * start/end point can be used by commit name, branch name or tag name or combined contents as well.
    * 시작 지점이나 끝 지점은 커밋명, 브랜치명, 혹은 태그명이 될 수 있고 조합하여 사용 가능하다.
#### see each log with one line - 각 항목의 로그 이력 한 줄씩 보기
    $ git log - -pretty=oneline
#### see static of line impacted by each content - 각 항목마다 영향 받은 줄의 통계 보기
    $ git log - -stat
#### see the file state in the commit point - 커밋할 시점의 파일 상태 보기
    $ git log - -name-status
#### see the difference index and working tree - 현재 작업 트리와 인덱스의 차이점 보기
    $ git diff
#### see the difference between index and repository - 인덱스와 저장소의 차이점 보기
    $ git diff - -cached
#### see the difference between working tree and repository - 작업 트리와 저장소의 차이점 보기
    $ git diff HEAD
#### see the difference between working tree and a certain location - 작업 트리와 특정 위치 간의 차이점 보기
    $ git diff <start poitn>
    * start point would be commit name/branch name/tag name
    * 시작 지점은 커밋명 or 브랜치명 or 태그명이다.
#### see the difference between two points - 저장소의 두 지점 사이의 차이점 보기
    $ git diff <start point> <end point>
#### see statistics of diffrence -  차이점의 통계 보기
    $ git diff - -stat <start point> [<end point>]
#### see the commit info with lines - 파일의 커밋 정보 줄 단위로 보기
    $ git blame <file>
#### see information of copy, paste, move - 파일의 줄 단위의 복사, 붙여 넣기, 이동 정보 보기
    $ git blame -M <file>
#### see information of line moving and original file - 파일의 줄 단위의 이동과 원본 파일 정보 보기
    $ git blame -C -C <파일>
#### see info of copy/paste from log - 로그에서 복사와 붙여 넣은 정보 보기
    $ git log -C -C -p -1 <특정 지점>
    
    
    
## Remote repository - 원격 저장소

#### clone repo - 저장소 복제하기
    $ git clone <repo name>
#### clone repo including only 200 commits - 마지막 200개의 커밋만 포함하여 저장소 복제하기
    $ git clone - -depth 200 <repo name>
#### add new remote repo - 새로운 원격 저장소 추가하기
    $ git remote add <remote repo> <repo url>
#### see all remote branch lists- 모든 원격 브랜치 목록 보기
    $ git branch -r
#### create local branch in remote branch - 원격 브랜치에서 지역 브랜치 생성하기
    $ git branch <new branch> <remote branch>
#### create local branch from remote tag - 원격 태그에서 지역 브랜치 생성하기
    $ git branch <new branch> <remote tag>
#### bring the change into local branch without merge in origin repo - origin 저장소에서 합치지 않고 지역 브랜치로 변경 사항 가져오기
    $ git fetch
#### bring the change into local branch without merge in remote repo - 원격 저장소에서 합치지 않고 지역 브랜치로 변경 사항 가져오기
    $ git fetch <remote repo>
#### merge the changes of remote repo into now branch - 원격 저장소에서 변경 사항을 가져와 현재 브랜치에 합치기
    $ git pull <remote repo>
#### merge the changes from origin repo into now branch - origin 저장소에서 변경 사항을 가져와 현재 브랜치에 합치기
    $ git pull
#### push local branch into local branch - 지역 브랜치를 원격 브랜치에 푸싱하기
    $ git push <remote repo> <local branch>:<remote branch>
#### push local branch into the same named remote branch - 지역 브랜치를 동일한 이름의 원격 브랜치에 푸싱하기
    $ git push <remote repo> <local branch>
#### push local branch into remote repo - 새로운 로컬 브랜치를 원격 저장소에 푸싱하기
    $ git push <remote repo> <local branch>
#### remove useless remote branch from remote repo - 원격 저장소에서 쓸모가 없어진 원격 브랜치 제거하기
    $ git remote prune <remote repo>
#### remove remote repo and related branch - 원격 저장소를 제거하고 관련된 브랜치도 제거하기
    $ git remote rm <remote repo>
