---
layout: default
title: Resume
---

![Profile](/assets/img/profile.jpg){:class="profile"}

# 안녕하세요, 개발자 박흥준입니다.

## TL;DR

**_스스로 성장 중인 현업 Frontend 개발자 2년차._** JavaScript에 익숙하며 React Native, Next.js, Nest.js를 실무에 활용 중입니다. 기획자 및 디자이너와 충분한 소통으로 의도한 바를 탐색합니다. <br>**DONE IS BETTER THAN PERFECT.** 구현이 불가능한 것이 아니라면, 스케줄을 우선합니다.

## Contact & Channel

- Email: [rockheung@gmail.com](mailto:rockheung@gmail.com)
- Github: [Rockheung](https://github.com/Rockheung){:target="_blank"}
- Blog: [바로 여기!](/){:target="_blank"}

## Experience

### 2019.06 ~ 현재: [차봇 모빌리티](https://www.chabot.kr/){:target="_blank"} 재직 중

- 차봇프라임 Application 개발 및 유지보수: **[PlayStore](https://play.google.com/store/apps/details?id=com.chabotprime&hl=ko&gl=US){:target="_blank"}**, **[AppStore](https://apps.apple.com/kr/app/%EC%B0%A8%EB%B4%87%ED%94%84%EB%9D%BC%EC%9E%84/id1492427449){:target="_blank"}** - React Native, Apollo Client(v2.6), GraphQL(Prisma v1), Next.js, Nest.js
- 포지션에 구애받지 않고 백엔드 개발자와 협업하여 다양한 상황에 대응하여 개발: _앱 서버 구현_, _웹 스크래핑_, _차량DB 관리_, _외주 앱 내재화_ 등.

### 2017.03 ~ 2017.07: Finfra

- 이미지 Annotation 웹 어드민 개발 - 개발스택: **[elm](https://elm-lang.org/){:target="_blank"}**

## Education

### 2019.02 ~ 2019.05

- **코드스테이츠(Code States)**, Advanced Software Engineering Immersive Program - 11th

### 2010.03 ~ 2017.08

- **서울시립대학교(University of Seoul)**, 전자전기컴퓨터공학부 학사

## Project

### 2020.06 ~ 현재: 차봇 프라임(v2) 개발 및 유지보수

- **다룬 주요 기술스택**: React Native(0.61 => 0.63), Apollo Client(v2.6), React Navigation(v5), CodePush, GraphQL(Prisma v1), Nest.js, Firebase, [node-http-proxy](https://www.npmjs.com/package/http-proxy){:target="_blank"}
- React Native의 Animated를 활용하여 다이나믹한 UI 개발
- Refresh, Access Token을 서버에서 발급하여 유저 인증, Refresh Token이 유효하면 Access Token 자동 갱신, Access Token을 GraphQL 인증 토큰으로 활용
- 인앱에서 Js Injection을 통해 웹사이트의 데이터 스크래핑
- **당면했던 문제 및 해결 과정**: <br>기존의 서버코드는 Prisma binding을 이용해서 Graphql Resolver를 [자동 생성하여 사용]("https://github.com/nestjs/docs.nestjs.com/blob/Sikora00-docs/typeorm/content/recipes/prisma.md")했습니다. 그러나 잦은 스키마 변경 및 갱신을 반복했었기에 이번 v2에서는 `node-http-proxy`라이브러리를 이용해서 인증 레이어를 중간에 하나 만들고, 승인된 앱 사용자만 `Authorization: Bearer {ACCESS_TOKEN}` 헤더를 중간에 가로채어 `Authorization: Bearer {PRISMA_ACCESS_TOKEN}`으로 교체하는 방식으로 승인된 사용자만 Prisma 컨테이너와 통신을 할 수 있도록 설계했습니다. 이런 설계를 통해 개발 기간 중에 지속적으로 확장/변경되는 Prisma Schema에도 매번 쉽게 대응하여 보다 빠른 개발이 가능하게 하였습니다.

### 2020.12 ~ 2021.03: 삼성카드 다이렉트 오토 신차 견적 역경매 서비스 개발

- **다룬 주요 기술스택**: Next.js, [react-native-web](https://necolas.github.io/react-native-web/docs/){:target="_blank"}
- 빠른 대응이 필요한 서비스 기획을 반영하여 WebView 및 Next.js로 인앱 모바일 페이지 개발.
- **당면했던 문제 및 해결 과정**: <br>`react-native-web`의 CSS-in-JS 구문을 React Native처럼 사용하다 보니 `const styles = StyleSheet.create({ container, disable })` 로 생성해서 `<View style={styles.container} />`와 같은 식으로 작성한 페이지는 최초 Html Document 요청 시에 스타일이 잘 적용되어 로드되지만, `<TouchableOpacity style={[styles.container, disabledState && { backgroundColor: "#eee" }]} />`와 같은 인라인 스타일을 작성했을 경우 `{ backgroundColor: "#eee" }` 부분이 제대로 적용되지 않았습니다. 이 문제가 발견된 시점이 개발이 상당히 이루어진 이후였기 때문에 기존 코드를 전부 초기 로드에 고려해서 모두 다시 작성하면 일정을 맞추기 어려워서 `/pages/_/{routeName}`와 같은 초기 로드 페이지를 작성하여 해당 패스에 들어오는 요청을 `uesEffect(() => {},[])`와 같은 훅을 통해 브라우저 라우팅이 되도록 하여 해결하였습니다. 중간에 확장된 기획에서 페이지 자격 등을 검증하는 로직이 추가되어 해당 `/_/{routeName}?query=string`에서 일단 Role 검증을 하고, 목적 페이지로 라우트(`/{routeName}?query=string`)하는 비즈니스 로직을 작성하는 데에 용이해진 부수적 장점도 있었습니다.<br>이후 레거시에서는 사용되었지만 현재 버전에서는 권장되지 않는 `getInitialProps`메서드를 이용하여 관련 문제를 개선했고, `getStaticProps`, `getServerSideProps`에서는 관련 로직이 제대로 작동하지 않아 업데이트를 기다리고 있습니다. 

### 2019.08 ~ 2020.02: 차봇 프라임(v1) 개발

- **다룬 주요 기술스택**: React Native(0.60), Apollo Client(v2.6), React Navigation(v4), Nest.js, [ZongJi](https://www.npmjs.com/package/zongji){:target="_blank"}
- Refresh, Access Token을 서버에서 발급하여 유저 인증
- 운영중인 Legacy Database에서 MySQL Binlog를 활용하여 신규 서비스의 Database와 실시간 데이터베이스 연동
- 회원가입 시에 기존 유저인지 판단하여 신규 서비스의 Database에 선택적으로 마이그레이션
- Legacy Database의 php 내장함수로 암호화되어 있는 사용자 정보를 활용하기 위해 Node.js로 암복호화 함수를 구현
- **당면했던 문제 및 해결 과정**: <br>새로운 앱을 개발하면서 기존 데이터베이스와 완전히 분리된 새로운 데이터베이스를 기반으로 프로젝트가 진행되었는데, 초기 기획에서는 모호했던 신규 앱 사용자 인증 기획이 기존의 내부 CRM 웹페이지에서 되어야 한다는 요구조건으로 확정되면서 두 데이터베이스에 같이 저장된 사용자 계정을 동기화시켜야 하는 로직이 필요했습니다. 당시 PHP 서버와 NodeJS 서버와의 긴밀한 통신이 필요한 로직에서 지속적으로 기대하지 못한 동작이 계속되었는데, 이를 [ZongJi](https://www.npmjs.com/package/zongji){:target="_blank"} 라이브러리를 통해 Pub-Sub 모델을 설계 및 도입하여 백엔드 비즈니스 로직을 단순화시켰습니다. 이 설계를 통해 PHP 백엔드가 다루는 Database에서 특정 테이블에 변화가 생기면 mysql binlog를 통해 이벤트가 발생하여 NodeJS에서 원하는 비즈니스 로직을 실행할 수 있게 되었습니다.



### 2019.06 ~ 2019.08: 차봇 VIP(alpha) 설계 변경(PhoneGap + PHP => ReactNative + NodeJS)

- **다룬 주요 기술스택**: React Native(0.60), ExpressJS, php
- php + PhoneGap 기반의 웹뷰 하이브리드 앱을 React Native + ExpressJS 로 재작성
- 데이터베이스 커넥션부터 php 에서 nodejs로 이전. 고전적인 Server Side Rendering(SSR) 방식에서 Hybrid Application 방식으로 설계를 변경하여 사용자 경험에 유리하도록 클론 앱 구현.
- 기존 php기반의 4개의 서비스가 한 EC2에서 배포되어 서비스 중이었는데, 이런 ftp 업로드 방식의 개발 방식에서 환경변수를 분리하여 php 서버코드를 레포지토리에 서비스별로 나누어 gitlab에 업로드하면서 git flow(dev => qa => prod)를 도입
- **당면했던 문제 및 해결 과정**:<br>php 기반의 앱 화면을 js 기반의 React Native + NodeJS 구조로 전환하기 위해서는 데이터베이스의 구조를 잘 알고 이를 서버에서 어떻게 활용하고 있는지 코드 수준에서 파악이 필요했습니다. 데이터베이스의 각 테이블 간 관계도가 문서화 되어 있지 않아 기존 앱 서비스에서 SQL을 로깅하도록 php 코드를 수정한 후에, git flow를 도입하면서 가능해진 테스트 모바일 웹페이지를 기능 단위별로 사용해 보면서 데이터베이스를 어떻게 활용하고 있고 각 테이블 간 관계는 어떻게 되는지 파악하였습니다. 이를 토대로 NodeJS API 서버를 구현하고, 여기에 React Native로 기존 앱의 화면을 클론하여 구현하였습니다. 이 프로젝트는 결과적으로 배포되지는 않았지만, 데이터베이스 관계 파악 등의 경험은 이후 프로젝트에서 중요하게 고려되었던 기존 데이터 마이그레이션에도 긍정적인 영향을 주었습니다.

<style>
h2, h3, h4, h5 {
  margin: 3rem 0 2rem;
}

h1 {
  margin: -1rem 0 4rem;
}

h2 {
  margin-top: 7.2rem;
}

.profile {
  border-radius: 50%;
  width: 18rem;
  margin-bottom: 8rem;
}

.easy-to-print {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 1.6rem;
  font-weight: 700;
  transform: rotate(45deg) translate(calc(50% / 1.414),calc(50% / 1.414));
}

@media (min-width: 720px) {
  .profile {
    position: absolute;
    width: 12rem;
    left: 50vw;
    transform: translateX(calc(-50% + 340px - 6rem - 2rem));
    border-radius: 50%;
  }
}

@media print {
  .no-print {
    display: none;
  }
}
</style>

<script>
  document.querySelector('header').hidden = true;
  var banner = document.createElement('div');
  var bannerText = document.createTextNode('PDF 출력하기 좋습니다!');
  banner.className = 'easy-to-print no-print';
  banner.appendChild(bannerText);
  document.querySelector('body').appendChild(banner);
</script>
