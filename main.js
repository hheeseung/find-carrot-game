const play = document.querySelector('.game-control__play');
const stop = document.querySelector('.game-control__stop');
const timer = document.querySelector('.game-control__timer');
const replay = document.querySelector('.replay');
const field = document.querySelector('.game-field');
const bgm = new Audio('/sound/bg.mp3');
const stopEffect = new Audio('/sound/alert.wav');
const HIDDEN_CLASSNAME = 'hidden';

// 10초 카운트다운
let leftTime = 10;
let playTimer;
const countdown = () => {
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
};

// ▶ 버튼 클릭 시 이벤트
play.addEventListener('click', () => {
  bgm.play();
  play.classList.add(HIDDEN_CLASSNAME);
  stop.classList.remove(HIDDEN_CLASSNAME);
  playTimer = setInterval(countdown, 1000);
});

// ⏹ 버튼 클릭 시 이벤트
stop.addEventListener('click', () => {
  stop.style.visibility = HIDDEN_CLASSNAME;
  bgm.pause();
  clearInterval(playTimer);
  stopEffect.play();
  replay.classList.remove(HIDDEN_CLASSNAME);
});

function setCarrot() {}
