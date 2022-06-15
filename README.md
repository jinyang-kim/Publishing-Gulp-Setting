## Publishing Gulp 환경세팅

Gulp 환경의 Publishing 작업을 하기 위해 만들어진 Repository 입니다.
- Gulp에서 JavaScript를 사용하기 위해 gulp파일을 babel을 이용해 컴파일합니다.
- 해당 Project는 local 환경에서 작업 또는 Web Server에 Source를 올려서 확인하는 Publishing Project입니다.
  * resource 경로 설정 시 /build/css, /build/js 와 같이 설정해주시면 됩니다. (예시 index.html 파일에서 경로 확인하여 작업 시 참고 부탁드립니다.)
  * /build/index.html, /build/page/index.html을 폴더에서 직접 실행 시 경로 오류로 확인이 불가능합니다.

* Gulp JS Site (URL) : [https://gulpjs.com/](https://gulpjs.com/)
* Gulp Packages Searching : https://www.npmjs.com/
* CSS 네이밍 규칙(BEM / Block__Element--Modifier) : https://nykim.work/15
* Browsers List : 전 세계 1% 이상 브라우저, 최근 2개 버전의 브라우저, firefox 4 이상, safari 7-8, IE 10-11
  * 벤더 프리픽스(Vendor Prefix) : 주요 웹 브라우저 공급자가 새로운 기능을 제공할 때 이전 버전의 웹 브라우저에서 그 사실을 알려주기 위해 사용하는 접두사(prefix)를 의미합니다.
  * 벤더 프리픽스 관련 설명 : http://www.tcpschool.com/css/css3_module_vendorPrefix

**1. 필수 설치 (required)**
-
* node.js와 npm이 먼저 미리 설치되어 있어야 한다.
  * [https://nodejs.org/ko/](https://nodejs.org/ko/) 페이지에서 LTS 버전으로 설치
  * node 설치 확인
    * node -v
    * npm -v
* gulp 설치
  * npm version : npm install gulp-cli -g
  * yarn version : yarn add gulp-cli
  * gulp 설치 확인 : gulp -v
* gulp 실행 명령어
  * gulp : gulp task_name;
    * gulp build / 해당 gulp 실행 시 build 처리만 되며, webserver 작동하지 않습니다.
      * build 폴더 경로 파일 삭제 처리
      * /static/asset/img 경량화 처리
      * /static/asset/img sprite 처리
      * html 경량화 처리
      * scss > css compile, 경량화 처리
      * js > common.js 파일 압축, 경량화, babel 처리
    * gulp dev / build task에 추가로
      * webserver 작동 및 html, js, css watch 작업 처리
      * localhost:8080(default port:8080) 접근 하여 페이지 확인 가능 (port 정보는 /gulpfile.babel.js:71에서 수정 후 gulp 재빌드 시 변경된 정보로 접근 가능합니다.)
    * gulp deploy / github 환경 사용 시 해당 repository에 배포 진행
      * Error 발생 시 아래 4. Gulp Deploy Error 내용 확인해주세요.
  * yarn : yarn task_name;
* 프로젝트 불러왔을 경우 (필수)
  * 프로젝트를 불러왔을 경우, node_module이 설치되지 않았기 때문에 Gulp 프로젝트가 실행되지 않습니다.
  * 프로젝트 저장 시 node_modules, Compile된 파일들은 저장소에 들어가지 않아도 되는 불필요한 파일이기 때문에 .gitignore 파일에서 제외시켜둡니다.
  * Terminal에 npm install 명령어를 입력하면 package.json에 들어있는 정보를 읽어서 프로젝트에 필요한 node_module들을 설치합니다.

**2. 프로젝트 경로 (Directory)**
- 
* gulp_setting
  * build (Compile Files)
    * _lib / js, scss 파일로 외부에서 파일은 별도 관리 처리 (gulp task에서 제외시키기 위해서 별도 폴더 구성처리)
    * fonts (Web Fonts)
    * img (/static/asset/img에 있는 이미지 파일을 경량화 처리한 파일들이 생성됩니다.)
    * js (/static/asset/js에 있는 js 파일을 압축한 파일 common.js 및 src/작성한 js 경량화 처리가된 파일들이 생성됩니다.)
    * css (/static/asset/scss에 있는 scss파일들을 컴파일하여 경량화 처리가된 css 파일들이 생성됩니다.)
    * html (/html/**/*.html 파일을 컴파일하여 html 파일들이 생성됩니다.)
  * html (HTML 원본 소스 파일)
    * _components (동일한 경로에 위치한 HTML Include Components)
    * page
      * _components (동일한 경로에 위치한 HTML Include Components)
      * index.html
    * index.html
  * static (Resource 원본 소스 파일)
    * asset
      * img (Images) / gulp 첫 실행 시 해당 경로에 있는 이미지들을 gulp-imagemin을 통해서 경령화 처리 후 build/img 경로에 이미지가 생성됩니다.
        * 이미지 경량화 처리는 gulp 첫 실행 시에만 작업 처리를 하기 때문에 이미지가 추가될 경우, gulp를 재실행 시켜주셔야 경령화 처리가 됩니다.
        * 이미지 경량화 처리를 watch에 추가하시려면 gulpfile.bable.js에서 function watch에 있는 주석되어 있는 부분을 풀어주시면 이미지 추가 시 경량화 처리가 됩니다.
        * 단, 이미지가 무겁거나하면 처리하는데 시간이 걸릴 수 있습니다.
      * common_js (JavaScript) / 해당 경로에 있는 js파일은 common.js 파일 하나로 합쳐집니다.
      * js (JavaScript) / 공통 js외에 작성할 js 폴더 경로입니다.
      * scss (SCSS)
      * _scss (SCSS) / 공통 SCSS 및 variables 폴더
        * mixins / SCSS Mixin 폴더
  * .gitignore
  * .babelrc (하위 디렉토리나 파일에서 특정 플러그인이나 규칙을 실행할 때 사용)
  * gulpfile.js (Gulp 관리)
  * gulpfile.babel.js (Gulp JavaScript 관리)
  * package.json (node package 관리)
  * README.md

**3. 파일 추가 관련**
- 
* 파일에서 언더스코어(_)를 붙이면 SASS한테 자기들을 Compile하지말고 사용만 하라고 알려주는것

**4. Gulp Deploy Error**
- 
* Gulp Deploy 명령어 실행 시 오류가 나는 경우, node package 추가 설치 필요
  * cd node_modules/gulp-gh-pages/  //플러그인 폴더로 이동
  * npm install --save gift@0.10.2  //gift폴더 설치
  * cd ../../                       
  * gulp deploy 

**5. Web Fonts**
- 
* Pretendard
* NotoSans

**6. Include Library Files**
- 
* HTML 작업 진행 시 필요한 기본 Library Files (사용자 선택에 따라서 포함을 안시켜도 됩니다.)
  * html5shiv.js
  * html5shiv.min.js
  * jquery-1.11.1.min.js
  * jquery-2.1.3.min.js
  * jquery-3.6.0.min.js
  * respond.min.js
  * lazysizes.min.js