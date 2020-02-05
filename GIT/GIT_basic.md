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
#### ? - 커밋되지 않고 스테이징된 변경 사항 재설정
    $ git reset HEAD <file> [<file>]
#### modify last commit - 마지막 커밋 수정
    $ git commit -m “message” - -amend
#### modify previous commit and reuse commit message - 이전 커밋을 수정하고 커밋 메시지를 재사용하기
    $ git commit -C HEAD - -amend

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
    $ git branch -D <삭제할 브랜치>   # 삭제할 브랜치가 현재 브랜치에 합쳐지지 않았어도


