# LCK RECORDS 

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

