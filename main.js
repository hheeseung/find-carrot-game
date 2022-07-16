const play = document.querySelector('.game__control__play');
const stop = document.querySelector('.game__control__stop');
const timer = document.querySelector('.game__control__timer');
const replay = document.querySelector('.game__replay');
const field = document.querySelector('.game__field');
const count = document.querySelector('.game__control__count');
const fieldRect = field.getBoundingClientRect();

const bgm = new Audio('/sound/bg.mp3');
const stopEffect = new Audio('/sound/alert.wav');
const carrotEffect = new Audio('/sound/carrot_pull.mp3');
const bugAlert = new Audio('/sound/bug_pull.mp3');
const gameClear = new Audio('/sound/game_win.mp3');

const HIDDEN_CLASSNAME = 'hidden';
const CARROT_SIZE = 80;

// ▶ 버튼 클릭 시 이벤트
play.addEventListener('click', () => {
  bgm.play();
  play.classList.add(HIDDEN_CLASSNAME);
  stop.classList.remove(HIDDEN_CLASSNAME);
  playTimer = setInterval(countdown, 1000);
  setItems('carrot', '/img/carrot.png', 10);
  setItems('bug', '/img/bug.png', 10);
});

// ⏹ 버튼 클릭 시 이벤트
stop.addEventListener('click', (e) => {
  e.preventDefault();
  stop.style.visibility = HIDDEN_CLASSNAME;
  bgm.pause();
  clearInterval(playTimer);
  stopEffect.play();
  replay.classList.remove(HIDDEN_CLASSNAME);
});

// 10초 카운트다운
let leftTime = 10;
let playTimer;
function countdown() {
  if (leftTime < 10) {
    timer.innerText = `00:0${leftTime}`;
  } else {
    timer.innerText = `00:${leftTime}`;
  }
  leftTime -= 1;
  if (leftTime < 0) {
    clearInterval(playTimer);
    bgm.pause();
  }
}

// 당근, 벌레 이미지를 랜덤으로 화면에 뿌리기
function setItems(item, src, totalNumber) {
  for (let i = 0; i < totalNumber; i++) {
    item = document.createElement('img');
    if (src.includes('carrot')) {
      item.setAttribute('class', 'carrot');
    } else if (src.includes('bug')) {
      item.setAttribute('class', 'bug');
    }
    item.setAttribute('src', src);
    item.style.position = 'absolute';
    item.style.top = `${(fieldRect.height - CARROT_SIZE) * Math.random()}px`;
    item.style.left = `${(fieldRect.width - CARROT_SIZE) * Math.random()}px`;
    field.appendChild(item);
    onItemClick(item);
  }
}

let carrotCount = 10;
function onItemClick(item) {
  item.addEventListener('click', () => {
    if (item.className === 'carrot') {
      carrotEffect.play();
      item.classList.add(HIDDEN_CLASSNAME);
      carrotCount--;
      count.innerText = carrotCount;
      if (carrotCount === 0 && leftTime > 0) {
        clearInterval(playTimer);
        bgm.pause();
        gameClear.play();
      }
    } else if (item.className === 'bug') {
      stop.style.visibility = HIDDEN_CLASSNAME;
      clearInterval(playTimer);
      bgm.pause();
      bugAlert.play();
    }
  });
}
