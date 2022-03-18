## Publishing Gulp 환경세팅

Gulp 환경의 Publishing 작업을 하기 위해 만들어진 Repository 입니다.
- Gulp에서 JavaScript를 사용하기 위해 gulp파일을 babel을 이용해 컴파일합니다.

Gulp JS Site (URL) : [https://gulpjs.com/](https://gulpjs.com/)

**1. 필수 설치 (required)**
-
1) node.js와 npm이 먼저 미리 설치되어 있어야 한다.
 - [https://nodejs.org/ko/](https://nodejs.org/ko/) 페이지에서 LTS 버전으로 설치
2) gulp 설치
 - npm version : npm install gulp-cli -g
 - yarn version : yarn add gulp-cli

**2. 프로젝트 경로 (Directory)**
- 
* gulp_setting
    * build (Compile Files)
    * src (원본 소스 파일)
      * fonts (웹 폰트)
      * html (HTML)
      * images (Images)
      * js (JavaScript)
      * scss (SCSS)
    * .gitignore
    * gulpfile.js (Gulp 관리)
    * gulpfile.babel.js (Gulp JavaScript 관리)
    * package.json (node package 관리)
    * README.md