# Django
출처 : https://tutorial.djangogirls.org/ko/

## 가상 디렉토리 구축(CentOS 기준)
    # mkdir djangogirls
    # cd djangogirls
    # python3 -m venv myvenv      // myvenv 이름(임의지정 가능)의 가상환경 구축
    # source myvenv/bin/activate  // 가상환경 시작
## 설치
    # python3 -m pip install --upgrade pip  // pip upgrade
    # pip install django~=2.0.0             // Django 설치
## GIT 설치    
    # sudo yum install git 
## 동작 방식
1. 웹 서버에 요청이 오면 장고로 전달됨.
2. 장고 urlresolver 는 전달된 웹 페이지의 주소 확인.
3. URL이 일치할 경우 view 함수에 전달.
4. view 함수는 권한을 확인, 수정, 웹 브라우저에 전달.

## 프로젝트 제작
    # django-admin startproject mysite .  // . 은 현재 디렉토리에 설치하라는 의미
.
    // 생성된 django 디렉토리 내부
    djangogirls
    ├───manage.py
    └───mysite
            settings.py
            urls.py
            wsgi.py
            __init__.py












