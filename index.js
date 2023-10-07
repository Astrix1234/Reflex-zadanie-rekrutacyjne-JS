'use strict';
const tile = document.querySelectorAll('.tile');
const btnStart = document.querySelector('.start');

let currentTile = null;

const onStart = () => {
  let randomTile;

  const interval = setInterval(() => {
    if (currentTile) {
      currentTile.classList.remove('active');
    }
    randomTile = tile[Math.floor(Math.random() * tile.length)];
    randomTile.classList.add('active');
    currentTile = randomTile;
  }, 3000);

  setTimeout(() => {
    clearInterval(interval);
    if (randomTile) {
      randomTile.classList.remove('active');
    }
  }, 60000);
};

btnStart.addEventListener('click', onStart);
