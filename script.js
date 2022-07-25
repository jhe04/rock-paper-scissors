const app = {};

app.init = () => {
  console.log('app initiated');
  app.addActionListeners();
  app.addPlayingListener();
};

app.playing = true;
app.playerSelection = '';

app.addPlayingListener = function () {
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'W') {
      app.playing = !app.playing;
      console.log(app.playing);
    }
  });
};

app.addActionListeners = function () {
  const actions = document.querySelector('.player-actions');
  const playerSelectionText = document.querySelector('.player-selection-text');
  const playerSelectionImage = document.querySelector(
    '.player-selection-image'
  );
  const computerSelectionText = document.querySelector(
    '.computer-selection-text'
  );

  actions.addEventListener('click', function (e) {
    const pEl = document.createElement('p');
    const imgEl = document.createElement('img');

    playerSelectionText.innerHTML = '';
    playerSelectionImage.innerHTML = '';
    computerSelectionText.innerHTML = '';

    app.playerSelection = e.target.textContent;
    pEl.textContent = e.target.textContent;
    playerSelectionText.appendChild(pEl);

    imgEl.src = `./assets/${e.target.textContent}.png`;
    playerSelectionImage.appendChild(imgEl);

    app.displayOutcome();
  });
};

app.displayOutcome = function () {
  const outcomes = ['rock', 'paper', 'scissors'];
  const computerSelectionImage = document.querySelector(
    '.computer-selection-image'
  );
  const computerSelectionText = document.querySelector(
    '.computer-selection-text'
  );
  let counter = 0;

  const timer = setInterval(() => {
    computerSelectionImage.innerHTML = '';
    imgEl = document.createElement('img');
    imgEl.src = `./assets/${outcomes[counter]}.png`;
    if (counter < 2) {
      computerSelectionImage.appendChild(imgEl);
      ++counter;
    } else {
      counter = 0;
      computerSelectionImage.appendChild(imgEl);
    }
  }, 200);

  setTimeout(() => {
    clearInterval(timer);
    const result = app.determineOutcome();
    imgEl = document.createElement('img');
    imgEl.src = `./assets/${result}.png`;
    computerSelectionImage.innerHTML = '';
    computerSelectionImage.appendChild(imgEl);
    const pEl = document.createElement('p');
    if (app.playing) {
      pEl.textContent = 'You lose! Better luck next time';
    } else {
      pEl.textContent = 'Nice win!';
    }
    computerSelectionText.appendChild(pEl);
  }, 1600);
};

app.determineOutcome = function () {
  if (app.playing) {
    return app.playerSelection === 'Rock'
      ? 'paper'
      : app.playerSelection === 'Paper'
      ? 'scissors'
      : 'rock';
  } else {
    return app.playerSelection === 'Rock'
      ? 'scissors'
      : app.playerSelection === 'Paper'
      ? 'rock'
      : 'paper';
  }
};

app.restart = function () {};

app.init();
