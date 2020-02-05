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
