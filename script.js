// Initilisation buttons
const sendToBattleButton = document.getElementById("sendToBattleButton");
const getEnemyButton = document.getElementById("getEnemyButton");
const doSkillButton = document.getElementById("doSkillButton");
const startBattleButton = document.getElementById("startBattleButton");

// Limiters heroes
const gameParameters = {
  MAX_LEVEL: 10,
  MAX_STAT: 99,
  MIN_STAT: 10,
};

const gameClasses = {
  Mage: "Маг",
  Knight: "Рыцарь",
  Hero: "Класс",
};

// Initilisation heroes
let playerHero = null;
let enemyHero = null;

function displayPlayerHero(hero) {
  document.getElementById("playerHeroClass").innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById("playerHeroName").innerHTML = hero.name;
  document.getElementById("playerHeroLevel").innerHTML = hero.level;
  document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}

// Information to hero player
sendToBattleButton.onclick = () => {
  const heroName = document.getElementById("name").value;
  if (heroName !== "") {
    const heroClass = document.querySelector(
      'input[name="class"]:checked'
    ).value;
    const heroLevel = document.getElementById("level").value;
    const heroStats = {};

    heroStats.str = Number(document.getElementById("strength").value);
    if (heroClass.str > gameParameters.MAX_STAT) {
      heroStats.str = gameParameters.MAX_STAT;
    }
    heroStats.int = Number(document.getElementById("intelligence").value);
    if (heroClass.int > gameParameters.MAX_STAT) {
      heroStats.int = gameParameters.MAX_STAT;
    }
    heroClass.agi = Number(document.getElementById("agility").value);
    if (heroClass.agi > gameParameters.MAX_STAT) {
      heroStats.agi = gameParameters.MAX_STAT;
    }

    const additionalAbility = document.querySelector(
      'input[name="additionalAbility"]:checked'
    ).value;
    const additionalStat = document.getElementById("additionalStat").value;

    if (heroClass === "Mage") {
      playerHero = new Mage(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else if (heroClass === "Knight") {
      playerHero = new Knight(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else {
      console.error("Фатальная ошибка! Что-то нужно исправить");
      return;
    }
    displayPlayerHero(playerHero);

    // Delete block buttons
    getEnemyButton.removeAttribute("disabled");
    doSkillButton.removeAttribute("disabled");
  } else {
    alert("Напиши герою имя");
  }
};

// Players request
getEnemyButton.onclick = () => {
  fetch(`https://api-code.practicum-team.ru/heroes`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
        startBattleButton.removeAttribute("disabled");
      }
    })
    .catch((error) => console.error("Error: ", error));
};

function displayEnemyHero(hero) {
  document.getElementById("enemyHeroClass").innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById("enemyHeroName").innerHTML = hero.name;
  document.getElementById("enemyHeroLevel").innerHTML = hero.level;
  document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}
