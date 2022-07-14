const play = document.querySelector('.game-control__play');
const stop = document.querySelector('.game-control__stop');
const timer = document.querySelector('.game-control__timer');
const bgm = new Audio('/sound/bg.mp3');
const invalid = null;
const HIDDEN_CLASSNAME = 'hidden';

play.addEventListener('click', () => {
  bgm.play();
  play.classList.add(HIDDEN_CLASSNAME);
  stop.classList.remove(HIDDEN_CLASSNAME);

  let leftTime = 10;
  setInterval(() => {
    if (leftTime < 10) {
      timer.innerText = `00:0${leftTime}`;
    } else {
      timer.innerText = `00:${leftTime}`;
    }
    leftTime -= 1;
    if (leftTime < 0) {
      timer.innerText = `00:00`;
    }
  }, 1000);
});

stop.addEventListener('click', () => {
  stop.style.visibility = HIDDEN_CLASSNAME;
  bgm.pause();
});
