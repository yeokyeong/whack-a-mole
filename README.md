# Whack a mole 

> ## Game rule

 - start 버튼 클릭시 게임이 시작되고 60초간 종료되지 않습니다. 
 
 - 새로고침해도 게임을 계속 이어집니다. 
 
 - 두더지는 1-3초간 랜덤하게 나옵니다.
 
 - 두더지는 최대 5마리가 동시에 나올 수 있습니다. 
 
 - 두더지 클릭시 점수가 올라갑니다.
 
 - 게임이 종료되면 해당 점수와 게임이 종료된 시간이 기록됩니다. 


> ## Used Skills
 
 - js, react(hook) 

> ## The way to implementation


1. **두더지,두더지 집 관련**
   
    - 두더지는 두더지가 출현할때 랜덤으로 가져와야 하는 index를 편리하게 가져오기 위해 1차원 배열로 구성하였습니다.
  
    - 1차원 배열로 구성하였기 때문에 문제에서 정해져있는 두더지 집 프레임을 그릴때 line-break를 생성하는 function을 제작하여 프레임을 rendering하도록 하였습니다.
  
    - 두더지는 1차원 배열에 있는 값을 통해 active/inactive 됩니다.
      
    - active로 값을 바꾸는 방법은 setInterval을 통해 1-3초 사이의 랜덤 시간을 주어 수행합니다.
      
    - inactive는 active된 두더지가 화면상에 보여지고 난뒤 0.5초 이후에 사라지도록 설계했습니다.
      
    - active된 두더지의 정보를 array로 저장하고있습니다. 만약 두더지가 5마리 이상 active 되어 있다면, array의 첫번째 값을 inactive 로 변경하고 다시 setInterval을 수행합니다.
  

2. **게임 관련**
   
    - 컴포넌트가 mount될때 localstorage에 있는 값을 가져와 게임 데이터(점수,시간,게임 진행 여부) 로 저장합니다. 이를 통해   
    페이지를 새로고침해도 게임이 계속 유지될수 있습니다.
      
    - 게임이 진행여부가 변경되거나, 시간이 변경되거나, 점수가 변경될때 localstorage에 데이터를 업데이트합니다.
     
    - timer가 종료되어야지만 게임도 종료됩니다.
     
    - 게임이 종료될때 해당 게임이 종료된 시간과 점수를 history에 기록합니다. history도 localstorage에 저장합니다.


3. **코드 관련**
   
    - page architechture은 다음과 같습니다. home는 game 컴포넌트를 렌더링하고 game 컴포넌트안에는 timer, score, history, mole 의 컴포넌트들을 포함하고 있습니다.
         
    - 상수 관련 변수는 util로  분리해 관리하도록 하였습니다.
         
    - 여러 컴포넌트에서 쓰일수있는 function도 util로 분리해 관리하도록 하였습니다.



> ## How to run the project

In the project directory, you can run:

```sh
yarn && yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

