# 당근 줍기 게임

## About Project

JavaScript DOM 객체를 활용한 당근 줍기 게임입니다. DOM 객체에 대한 공부와 실습을 위해 제작하게 되었습니다.

### How to Play?

주어진 시간 안에 당근을 모두 클릭하면 성공, 벌레를 클릭하거나 시간이 초과되면 실패합니다.
게임이 끝나면 replay 버튼을 통해 다시 시작할 수 있습니다.

![carrot-game-win](https://user-images.githubusercontent.com/87454393/192696589-72e08a4f-13fc-4ab0-b997-5e5ea2ca30e4.gif)

![carrot-game-lose](https://user-images.githubusercontent.com/87454393/192697710-b780aa2b-b176-4c33-ac83-0946445fc6a5.gif)

### What I Learn

- Element.matches(selectors)
- Audio 객체
- getBoundingClientRect()
- 기능을 함수 형태로 구현하여 재사용성 높이기

## Deploy

https://hheeseung.github.io/find-carrot-game/

## During the Project

### 어려웠던 점

큰 틀을 기능별로 나누어 잡고 시작했는데, 큰 단위로 구현하려니 응집도가 높아져 클릭 시 나타나야 할 이벤트들을 구현하기가 어려워졌습니다.

### 해결

함수로 작은 단위까지 쪼개서 코드의 재사용을 높이도록 하였습니다. 세분화하여 구현하니 훨씬 방향을 잡기가 수월해졌습니다.

### 더 생각해봐야 할 것들

- [ ] 모듈화 - 기능별로 나눠보기
- [ ] 디자인 패턴 적용하기: Builder Pattern
