'use strict';
const tiles = document.querySelectorAll('.tile');
const btnStart = document.querySelector('.start');
const btnRemove = document.querySelector('.reset');
const timeCounter = document.querySelector('.timeCounter');
const livesCounter = document.querySelector('.liveCounter');
const punksCounter = document.querySelector('.punksCounter');

let currentTile = null;
let interval = null;
let timeInterval = null;
let endTimeTimeout = null;
let tileTimeout = null;
let time = 60;
let randomTile;
let tileClicked = false;
let lives = 3;
let punks = 0;

livesCounter.innerHTML = lives;
punksCounter.innerHTML = punks;

const onStart = () => {
  interval = setInterval(() => {
    if (currentTile) {
      currentTile.classList.remove('active');
    }
    tileClicked = false;
    randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    randomTile.classList.add('active');

    tileTimeout = setTimeout(() => {
      randomTile.classList.remove('active');
      if (!tileClicked) {
        lives--;
        livesCounter.innerHTML = lives;
        alert('Straciłeś życie!');
        if (lives === 0) {
          alert('Straciłeś wszystkie życia. Koniec gry!');
          clear();
        }
      }
    }, 2000);

    currentTile = randomTile;
  }, 3000);

  timeInterval = setInterval(() => {
    time--;
    timeCounter.innerHTML = time;
  }, 1000);

  endTimeTimeout = setTimeout(() => {
    clear();
    alert('Koniec czasu! Zacznij nową grę');
  }, 60000);
};

const chooseTile = e => {
  if (!e.target.classList.contains('active')) {
    return;
  }

  if (e.target === currentTile) {
    punks++;
    tileClicked = true;
    e.target.classList.remove('active');
    punksCounter.innerHTML = punks;
  }
};

const clear = () => {
  clearInterval(interval);
  tiles.forEach(tile => tile.classList.remove('active'));
  currentTile = null;
  clearInterval(timeInterval);
  clearTimeout(endTimeTimeout);
  clearTimeout(tileTimeout);
  time = 60;
  timeCounter.innerHTML = '';
  lives = 3;
  livesCounter.innerHTML = lives;
  punks = 0;
  punksCounter.innerHTML = punks;
};

btnStart.addEventListener('click', onStart);
btnRemove.addEventListener('click', clear);
tiles.forEach(tile => tile.addEventListener('click', chooseTile));
