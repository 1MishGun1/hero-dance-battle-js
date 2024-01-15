// Initilisation buttons
const sendToBattleButton = document.getElementById('sendToBattleButton');
const getEnemyButton = document.getElementById('getEnemyButton');
const doSkillButton = document.getElementById('doSkillButton');
const startBattleButton = document.getElementById('startBattleButton');

// Limiters heroes
const gameParameters = {
  MAX_LEVEL: 10,
  MAX_STAT: 99,
  MIN_STAT: 10,
};

const gameClasses = {
  Mage: 'Маг',
  Knight: 'Рыцарь',
  Hero: 'Класс',
};

// Initilisation heroes
let playerHero = null;
let enemyHero = null;

// Show information player hero
function displayPlayerHero(hero) {
  document.getElementById('playerHeroClass').innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById('playerHeroName').innerHTML = hero.name;
  document.getElementById('playerHeroLevel').innerHTML = hero.level;
  document.getElementById('playerHeroHp').innerHTML = hero.healthPoints;
  document.getElementById('playerHeroStrength').innerHTML = hero.stats.str;
  document.getElementById('playerHeroIntelligence').innerHTML = hero.stats.int;
  document.getElementById('playerHeroAgility').innerHTML = hero.stats.agi;

  hero.displayHero();
}

// Show information enemy hero
function displayEnemyHero(hero) {
  document.getElementById('enemyHeroClass').innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById('enemyHeroName').innerHTML = hero.name;
  document.getElementById('enemyHeroLevel').innerHTML = hero.level;
  document.getElementById('enemyHeroHp').innerHTML = hero.healthPoints;
  document.getElementById('enemyHeroStrength').innerHTML = hero.stats.str;
  document.getElementById('enemyHeroIntelligence').innerHTML = hero.stats.int;
  document.getElementById('enemyHeroAgility').innerHTML = hero.stats.agi;

  hero.displayHero();
}

// Information to hero player
sendToBattleButton.onclick = () => {
  const heroName = document.getElementById('name').value;
  if (heroName !== '') {
    const heroClass = document.querySelector(
      'input[name="class"]:checked'
    ).value;
    const heroLevel = document.getElementById('level').value;
    const heroStats = {};

    heroStats.str = Number(document.getElementById('strength').value);
    if (heroStats.str > gameParameters.MAX_STAT) {
      heroStats.str = gameParameters.MAX_STAT;
    }
    heroStats.int = Number(document.getElementById('intelligence').value);
    if (heroStats.int > gameParameters.MAX_STAT) {
      heroStats.int = gameParameters.MAX_STAT;
    }
    heroStats.agi = Number(document.getElementById('agility').value);
    if (heroStats.agi > gameParameters.MAX_STAT) {
      heroStats.agi = gameParameters.MAX_STAT;
    }

    const additionalAbility = document.querySelector(
      'input[name="additionalAbility"]:checked'
    ).value;
    const additionalStat = document.getElementById('additionalStat').value;

    if (heroClass === 'Mage') {
      playerHero = new Mage(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else if (heroClass === 'Knight') {
      playerHero = new Knight(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else {
      console.error('Fatal error! Something needs to be fixed.');
      return;
    }
    displayPlayerHero(playerHero);

    // Delete block buttons
    getEnemyButton.removeAttribute('disabled');
    doSkillButton.removeAttribute('disabled');
  } else {
    alert('Напиши герою имя');
  }
};

// Players request
getEnemyButton.onclick = () => {
  fetch(`https://api-code.practicum-team.ru/heroes`)
    .then((response) => response.json())
    .then((data) => {
      let randomEnemy = data[Math.floor(Math.random() * data.length)];
      console.log(randomEnemy);

      // Enemy hero
      enemyHero = new Hero(
        randomEnemy.title, // Name enemy
        Math.floor(Math.random() * 10) + 1, // Level enemy
        randomEnemy.hp, // Hp enemy
        { str: randomEnemy.str, int: randomEnemy.int, agi: randomEnemy.agi } // Parametrs enemy
      );
      displayEnemyHero(enemyHero);

      // Checked second player
      if (playerHero) {
        startBattleButton.removeAttribute('disabled');
      }
    })
    .catch((error) => console.error('Error: ', error));
};

// Win hero
function countStatsSum(hero) {
  let statsSum = 0;
  statsSum += hero.stats.str;
  statsSum += hero.stats.int;
  statsSum += hero.stats.agi;
  statsSum += hero.healthPoints;

  return statsSum;
}

// Arena
function arena(firstHero, secondHero) {
  console.log(
    `Let it begin tance battle between ${firstHero} and ${secondHero}`
  );

  let winner = null;
  let firstHeroSum = countStatsSum(firstHero);
  let secondHeroSum = countStatsSum(secondHero);

  console.log('Sum points parametrs first hero: ', firstHeroSum);
  console.log('Sum points parametrs second hero: ', secondHeroSum);
  alert(
    `Sum points parametrs: \nfirst hero: ${firstHeroSum} \nsecond hero: ${secondHeroSum}`
  );

  if (firstHeroSum > secondHeroSum) {
    winner = firstHero;
  } else if (secondHeroSum > firstHeroSum) {
    winner = secondHero;
  }

  if (winner) {
    console.log(`Rhythmically honoring the winner: ${winner.name}`);
    alert(`Rhythmically honoring the winner: ${winner.name}`);
  } else {
    console.log('Friendship won the dance battle!');
    alert('Friendship won the dance battle!');
  }
}

startBattleButton.onclick = () => {
  arena(playerHero, enemyHero);
};

// Chiting button
doSkillButton.onclick = () => {
  if (playerHero) {
    if (playerHero.constructor.name === 'Mage') {
      playerHero.hpUpdateMage(playerHero);
    } else if (playerHero.constructor.name === 'Knight') {
      playerHero.dexterityUpKnight(playerHero);
    } else {
      console.log('It is fatal error');
    }
  } else {
    alert('Please, add new player');
  }
  displayPlayerHero(playerHero);
};

// Update background cards on click btn
const cardHero = document.querySelectorAll('.card-wrapper');
const btnPlayerHero = document.querySelector('.form-button');
const btnEnemyHero = document.getElementById('getEnemyButton');
const addUpdate = document.querySelectorAll('.card-button');
const btnStartBattle = document.querySelector('.battle-zone-button');
const cardPlayer = document.getElementById('cardPlayer');
const cardEnemy = document.getElementById('cardEnemy');

// Clicks on btns
btnPlayerHero.addEventListener('click', function () {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  cardHero.forEach(function (cardHero) {
    cardHero.style.background = randomColor;
  });
});

btnEnemyHero.addEventListener('click', function () {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  cardHero.forEach(function (cardHero) {
    cardHero.style.background = randomColor;
  });
});

btnStartBattle.addEventListener('click', function () {
  cardHero.forEach(function (cardHero) {
    cardHero.style.background = 'red';
  });
});

btnStartBattle.addEventListener('click', function () {
  addUpdate.forEach(function (addUpdate) {
    addUpdate.style.background = 'white';
    addUpdate.style.color = 'black';
  });
});

// Battle
cardPlayer.classList.remove('card-player');
cardEnemy.classList.remove('card-enemy');

btnStartBattle.addEventListener('click', function () {
  cardPlayer.classList.add('card-player');
  cardEnemy.classList.add('card-enemy');
});
