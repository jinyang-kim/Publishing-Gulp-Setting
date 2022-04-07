## Publishing Gulp 환경세팅

Gulp 환경의 Publishing 작업을 하기 위해 만들어진 Repository 입니다.
- Gulp에서 JavaScript를 사용하기 위해 gulp파일을 babel을 이용해 컴파일합니다.

* Gulp JS Site (URL) : [https://gulpjs.com/](https://gulpjs.com/)
* Gulp Packages Searching : https://www.npmjs.com/
* CSS 네이밍 규칙(BEM / Block__Element--Modifier) : https://nykim.work/15

**1. 필수 설치 (required)**
-
1) node.js와 npm이 먼저 미리 설치되어 있어야 한다.
 * [https://nodejs.org/ko/](https://nodejs.org/ko/) 페이지에서 LTS 버전으로 설치
 * node 설치 확인
   * node -v
   * npm -v
2) gulp 설치
 * npm version : npm install gulp-cli -g
 * yarn version : yarn add gulp-cli
 * gulp 설치 확인 : gulp -v
3) gulp 실행 명령어
 * gulp : gulp task_name;
 * yarn : yarn task_name;
4) 프로젝트 불러왔을 경우 (필수)
 * 프로젝트를 불러왔을 경우, node_module이 설치되지 않았기 때문에 Gulp 프로젝트가 실행되지 않습니다.
 * 프로젝트 저장 시 node_modules, Compile된 파일들은 저장소에 들어가지 않아도 되는 불필요한 파일이기 때문에 .gitignore 파일에서 제외시켜둡니다.
 * Terminal에 npm install 명령어를 입력하면 package.json에 들어있는 정보를 읽어서 프로젝트에 필요한 node_module들을 설치합니다.

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

**3. 파일 추가 관련**
- 
* SCSS파일에서 언더스코어(_)를 붙이면 SASS한테 자기들을 Compile하지말고 사용만 하라고 알려주는것