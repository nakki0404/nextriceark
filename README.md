<p>주소. https://www.nextriceark.site/</p>

<h1>###쌀로아</h1>

<p>로스트아크 게임 내 재화 쌀이라고도 불리는 골드를 절약하기 위해서 만든 웹입니다.</p>

<h2>##사용된 기술</h2>
<p>React Next React Query Redux Tailwind CSS</p>
<p>Node Express </p>
<p>MongoDB</p>
<p>Ec2 Docker Nginx Tesseract OpenCV rechart websocket</p>

<h2>##주요 기능 목록</h2>
<p>악세 조합기 : 계정 내 악세서리들의 이용가능한 조합이 있는지 확인합니다.</p>
<p>재화 계산기 : 재화들의 가격을 당일 평균가에 맞춰서 합산해줍니다.</p>
<p>거래소 통계 : 거래소 특정 카테고리의 거래 통계를 보여줍니다.</p>

<h3>#악세 조합기</h3>

<p>모아둔 장비들로 가능한 조합을 찾아줍니다.</p>

![이미지 설명](https://github.com/nakki0404/nextriceark/blob/main/front/src/asset/png/recycle-manual.png)

<p>입력을 요구하는 것이 5~7항목이다 보니 귀찮음 때문인지 예상보다 유저수가 나오지 않았습니다.</p>
<p>tessract로 텍스트를 추출하고 조건에 따라 입력되도록 하였습니다.</p>
<p>일평균 10명이상 이용해주는 것으로 파악됩니다.</p>


![image](https://github.com/nakki0404/nextriceark/assets/141347738/5fa7ae79-0a9f-4d68-8388-a078b05dc20d)


<h3>#재화 계산기</h3>

<p>더보기 또는 캐시아이템 구매가 이득인지 손해인지 물음에 해결해주기 위해서 제작했습니다.</p>

![이미지 설명](https://github.com/nakki0404/nextriceark/blob/main/front/src/asset/png/caculator-manual.png)

<p> 저장 기능에 제한이 없어서 DB에 데이터가 4만개가 등록되어서 웹에 출력이 안되는 문제가 있었습니다.</p>
<p>무료로 제공 받은 도메인으로는 흔히 접하는 chapcha 서비스 이용이 불가능했습니다. </p>
<p>유사한 기능을 직접 만들어서 매크로에 의한 DB 저장을 막을 수 있었습니다.</p>

![image](https://github.com/nakki0404/nextriceark/assets/141347738/43168bc3-e248-420a-b459-a2f89b5bb8ca)

<h3>#거래소 통계</h3>

<p>로스트아크 게임사 제공 api는 2주간의 정보만 제공하여 긴 기간동안 재화들의 가격 추이를 보여주고 싶었습니다.</p>

<p>서버에 24시간마다 게임사 api에 거래 데이터를 받아서 db에 입력하도록 합니다.</p>
<p>차트 라이브러리를 이용했습니다.</p>

![이미지 설명](https://github.com/nakki0404/nextriceark/blob/main/front/src/asset/png/statistics-manual.png)


<p>그외 기능</p>
<p>주화 효율 : 골드외 각종 주화로 구매 가능한 목록을 골드로 환산 해둔 목록입니다.</p>
<p>연습 : 이번 레이드 기믹 중 일부인 좌우 반전의 캐릭터를 찾는 연습을 도와줍니다.</p>
<p>게시판 : 버그 제보를 받습니다.</p>
