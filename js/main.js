'use strict';

{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 2 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    document.getElementById("body").classList.add("done");
    //alert(`${score}文字正解, ${miss}文字間違え, ${accuracy.toFixed(2)}%の正答率です!`);
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    const timerId = setTimeout(() => {
      updateTimer();
    }, 100);
    if (timeLeft < 0) {
      isPlaying = false;
      showResult();
      clearTimeout(timerId);
      //timerLabel.textContent = '0.00';
      //target.textContent = 'クリックしてもう一回？';
    }
  }

  window.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    updateTarget();
    startTime = Date.now();
    updateTimer();

  });

  window.addEventListener('keyup', e => {
    if (isPlaying !== true) {
      return;
    }
    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      score++;
      scoreLabel.textContent = score;
      updateTarget();
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}
