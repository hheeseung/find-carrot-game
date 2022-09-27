// sound effect
const GAME_BGM = new Audio('/sound/bg.mp3');
const STOP_SOUND = new Audio('/sound/alert.wav');
const CARROT_CLICK = new Audio('/sound/carrot_pull.mp3');
const BUG_CLICK = new Audio('/sound/bug_pull.mp3');
const GAME_CLEAR = new Audio('/sound/game_win.mp3');

const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');
const timer = document.querySelector('.timer');
const field = document.querySelector('.lower-field');
const count = document.querySelector('.carrot-count');
const replayPopup = document.querySelector('.replay');
const replayPopupText = document.querySelector('.replay-text');
const replayBtn = document.querySelector('.replay-btn');

const HIDDEN_CLASSNAME = 'hidden';
const FIELD_RECT = field.getBoundingClientRect();
const ITEM_SIZE = 80;
const ITEM_COUNT = 10;
const TIME_LIMIT = 10;

let TIMER;

function initGame() {
  count.innerText = ITEM_COUNT;
  setItems('carrot', ITEM_COUNT, 'img/carrot.png');
  setItems('bug', ITEM_COUNT, 'img/bug.png');
  startTimer();
  activeStopButton();
}

function setItems(className, count, imgSrc) {
  const x1 = 0;
  const y1 = 0;
  const x2 = FIELD_RECT.width - ITEM_SIZE;
  const y2 = FIELD_RECT.height - ITEM_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgSrc);
    item.style.position = 'absolute';
    const x = Random(x1, x2);
    const y = Random(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function Random(min, max) {
  return Math.random() * (max - min) + min;
}

function startTimer() {
  let runningTime = TIME_LIMIT;
  updateCountdown(runningTime);
  TIMER = setInterval(() => {
    if (runningTime <= 0) {
      clearInterval(TIMER);
      return;
    }
    updateCountdown(--runningTime);
  }, 1000);
}

function updateCountdown(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10) {
    timer.innerText = `0${min}:0${sec}`;
  } else {
    timer.innerText = `0${min}:${sec}`;
  }
}

function activeStopButton() {
  playBtn.classList.add(HIDDEN_CLASSNAME);
  stopBtn.classList.remove(HIDDEN_CLASSNAME);
}

function stopGame() {
  clearInterval(TIMER);
  popupText('REPLAY❓');
}

function popupText(text) {
  replayPopup.classList.remove(HIDDEN_CLASSNAME);
  replayPopupText.innerText = text;
}

// function itemClickEvent(item) {
//   if (item.className === 'carrot') {
//     item.addEventListener('click', () => {
//       item.classList.add(HIDDEN_CLASSNAME);
//       CARROT_CLICK.play();
//       carrotCount--;
//       count.innerText = carrotCount;
//       if (carrotCount === 0 && leftTime > 0) {
//         GAME_BGM.pause();
//         GAME_CLEAR.play();
//         clearInterval(leftTimeCounter);
//         replayPopupText.innerText = 'YOU WIN🎉';
//         replayPopup.classList.remove(HIDDEN_CLASSNAME);
//       }
//     });
//   }
//   if (item.className === 'bug') {
//     item.addEventListener('click', () => {
//       GAME_BGM.pause();
//       BUG_CLICK.play();
//       clearInterval(leftTimeCounter);
//       replayPopupText.innerText = 'YOU LOSE👎';
//       replayPopup.classList.remove(HIDDEN_CLASSNAME);
//     });
//   }
// }

// function onReplayBtnClick() {
//   GAME_BGM.load();
//   leftTime = 10;
//   carrotCount = 10;
//   field.innerHTML = '';
//   replayPopup.classList.add(HIDDEN_CLASSNAME);
//   onPlayBtnClick();
// }

playBtn.addEventListener('click', initGame);
stopBtn.addEventListener('click', stopGame);
// replayBtn.addEventListener('click', );
