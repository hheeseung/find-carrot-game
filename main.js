// sound effect
const GAME_BGM = new Audio('/sound/bg.mp3');
const STOP_SOUND = new Audio('/sound/alert.wav');
const CARROT_CLICK = new Audio('/sound/carrot_pull.mp3');
const BUG_CLICK = new Audio('/sound/bug_pull.mp3');
const GAME_CLEAR = new Audio('/sound/game_win.mp3');

const playBtn = document.querySelector('.game__control__play');
const stopBtn = document.querySelector('.game__control__stop');
const timer = document.querySelector('.game__control__timer');
const field = document.querySelector('.game__field');
const count = document.querySelector('.game__control__count');
const replayPopup = document.querySelector('.game__replay');
const replayPopupText = document.querySelector('.game__replay__text');
const replayBtn = document.querySelector('.game__replay__btn');

const HIDDEN_CLASSNAME = 'hidden';
const FIELD_RECT = field.getBoundingClientRect();
const ITEM_SIZE = 80;
let leftTime = 10;
let leftTimeCounter;
let carrotCount = 10;

function onPlayBtnClick() {
  GAME_BGM.play();
  playBtn.classList.add(HIDDEN_CLASSNAME);
  stopBtn.classList.remove(HIDDEN_CLASSNAME);
  leftTimeCounter = setInterval(gameTimeCounter, 1000);
  setItems('carrot', '/img/carrot.png', 10);
  setItems('bug', '/img/bug.png', 10);
  count.innerText = carrotCount;
}

function onStopBtnClick() {
  GAME_BGM.pause();
  STOP_SOUND.play();
  stopBtn.classList.add(HIDDEN_CLASSNAME);
  clearInterval(leftTimeCounter);
  replayPopup.classList.remove(HIDDEN_CLASSNAME);
  replayPopupText.innerText = 'REPLAY❓';
}

function gameTimeCounter() {
  if (leftTime < 10) {
    timer.innerText = `00:0${leftTime}`;
  } else {
    timer.innerText = `00:${leftTime}`;
  }
  leftTime -= 1;
  if (leftTime < 0) {
    GAME_BGM.pause();
    clearInterval(leftTimeCounter);
  }
}

function setItems(item, src, totalItem) {
  for (let i = 0; i < totalItem; i++) {
    item = document.createElement('img');
    item.src = src;
    if (src.includes('carrot')) {
      item.className = 'carrot';
    } else {
      item.className = 'bug';
    }
    item.style.position = 'absolute';
    item.style.top = `${Math.floor(
      (FIELD_RECT.height - ITEM_SIZE) * Math.random()
    )}px`;
    item.style.left = `${Math.floor(
      (FIELD_RECT.width - ITEM_SIZE) * Math.random()
    )}px`;
    field.appendChild(item);
    itemClickEvent(item);
  }
}

function itemClickEvent(item) {
  if (item.className === 'carrot') {
    item.addEventListener('click', () => {
      item.classList.add(HIDDEN_CLASSNAME);
      CARROT_CLICK.play();
      carrotCount--;
      count.innerText = carrotCount;
      if (carrotCount === 0 && leftTime > 0) {
        GAME_BGM.pause();
        GAME_CLEAR.play();
        clearInterval(leftTimeCounter);
        replayPopupText.innerText = 'YOU WIN🎉';
        replayPopup.classList.remove(HIDDEN_CLASSNAME);
      }
    });
  }
  if (item.className === 'bug') {
    item.addEventListener('click', () => {
      GAME_BGM.pause();
      BUG_CLICK.play();
      clearInterval(leftTimeCounter);
      replayPopupText.innerText = 'YOU LOSE👎';
      replayPopup.classList.remove(HIDDEN_CLASSNAME);
    });
  }
}

function onReplayBtnClick() {
  GAME_BGM.load();
  leftTime = 10;
  carrotCount = 10;
  field.innerHTML = '';
  replayPopup.classList.add(HIDDEN_CLASSNAME);
  onPlayBtnClick();
}

playBtn.addEventListener('click', onPlayBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
replayBtn.addEventListener('click', onReplayBtnClick);
