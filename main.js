// sound effect
const GAME_START = new Audio('sound/bg.mp3');
const GAME_STOP = new Audio('sound/alert.wav');
const GAME_CLEAR = new Audio('sound/game_win.mp3');
const CARROT_CLICK = new Audio('sound/carrot_pull.mp3');
const BUG_CLICK = new Audio('sound/bug_pull.mp3');

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

let gameTimer = undefined;
let gameScore = 0;

field.addEventListener('click', onItemClick);
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
replayBtn.addEventListener('click', replayGame);

function startGame() {
  initGame();
  playSound(GAME_START);
}

function stopGame() {
  inactiveStopButton();
  clearInterval(gameTimer);
  popupText('REPLAY❓');
  stopSound(GAME_START);
  playSound(GAME_STOP);
}

function replayGame() {
  field.innerHTML = '';
  replayPopup.classList.add(HIDDEN_CLASSNAME);
  initGame();
  playSound(GAME_START);
}

function finishGame(win) {
  if (win) {
    stopSound(GAME_START);
    playSound(GAME_CLEAR);
  } else {
    stopSound(GAME_START);
    playSound(BUG_CLICK);
  }
  inactiveStopButton();
  clearInterval(gameTimer);
  popupText(win ? 'YOU WIN🎉' : 'YOU LOSE😥');
}

function initGame() {
  field.innerHTML = '';
  count.innerText = ITEM_COUNT;
  gameScore = 0;
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
  gameTimer = setInterval(() => {
    if (runningTime <= 0) {
      clearInterval(gameTimer);
      finishGame(gameScore === ITEM_COUNT);
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

function inactiveStopButton() {
  stopBtn.classList.add(HIDDEN_CLASSNAME);
}

function popupText(text) {
  replayPopup.classList.remove(HIDDEN_CLASSNAME);
  replayPopupText.innerText = text;
}

function onItemClick(e) {
  const target = e.target;
  if (target.matches('.carrot')) {
    playSound(CARROT_CLICK);
    target.remove();
    gameScore++;
    updateScore();
    if (gameScore === ITEM_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    playSound(BUG_CLICK);
    stopSound(GAME_START);
    finishGame(false);
  }
}

function updateScore() {
  count.innerText = ITEM_COUNT - gameScore;
}

function playSound(sound) {
  sound.load();
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
