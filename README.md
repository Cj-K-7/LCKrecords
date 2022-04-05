# LCK RECORDS 

# Twitch live status 추가 필요
# 일정에 따른 기능 구현에 대해서 재사용가능하게끔 변경 고민.

  React / Typescript / Firebase
  
  routing pages 
  
   1 . Auth - sign in/up , with google/github email  
   2 . Main - Use Fire/Base , get LCK games schedules, and send match result by make admin page .

# 2022/3/12

## Firestore

firestore collection reading 개선을 위해 데이터 구조 변경 및 refactoring

collection 자체를 불러오는 행위가 너무 많은 request 였음을 확인하여 이에 refactring

# 2022/3/18

+ CONTENTS : 지난 경기 결과 스코어 보기/ 너무 난잡하지 않게 스크롤로 볼 수 있도록.

## CSS Grid

responsive sizing : 매 경기 정보에 대해서 grid layout 을 통해 표현하는데 창 크기 조절할때마다 자동으로 각 Grid 내부 element들이 열과 크기가 나뉘도록 조절할때 auto-fit / minmax() css방식으로 변경.

## Styled-components

리스트 필터링으로 최근 경기 2개를 그라데이션으로 하이라이트 하던 방법을

"해당 매치 날짜와 오늘 날짜가 같으면" 으로 오늘 경기가 이뤄지면 하이라이트가 되게끔 변경!
비슷하게 라이브일때 상태도 만들 수 있을 것으로 보임

처음에는 twitch 방송의 해당 live status를 api를 통해 받을 수 있는지 확인하다가, 너무 시간이 오래 걸려 다른 기능부터 진행!

# 2022/3/20

Play Off 일정 / TBD  추가
Grid css 변경, 
배포. 

# 2022/3/21

1. 지난 경기 날짜별 grouping 을 다시 하기 위해 reduce 함수 사용

2. 해당 날짜내 이뤄진 경기를 묶고, 지난 경기 기록을 보고 싶을때 기준을
 최근 끝난 경기를 가져오게끔 하기 위해  

 Javascript document.getElementsbyClassName 을 이용해서 마지막 해당 엘레먼트에  
 Landing 되게끔. scrolltoView() 사용. (useEffect)

3. redux tool-kit 을 이용한 팀별 매치 필터링 기능 추가. 간단한 애니메이션 추가

# 2022/3/22

FIREBASE AUTH popup invalid 상태 
Google API key 에서 자동으로 AUTH 보안 설정되어 SNS를 통한 로그인 시도시 도메인이 막힘..., 도메인 재등록으로 해결..


# 2022/3/25

1. Redux : 로그인 하지 않아도 볼 수 있도록 Continue 버튼 추가.
2. 메인 홈의 리더보드 STANDINGS는 정규시즌만 적용(Round 1 / 2)하여 Play Off 적용 안되도록 필터링
3. PlayOFF 요소 Matches 페이지에 추가 추후 Play Off 일정에 가까울때만 띄우도록 수정 및 디자인 개선 필요.

# 2022/4/4

upcoming 경기 없는 경우 'no upcoming matches' 표시.
