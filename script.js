const sendToBattleButton = document.getElementById("sendToBattleButton");
const getEnemyButton = document.getElementById("getEnemyButton");
const doSkillButton = document.getElementById("doSkillButton");
const startBattleButton = document.getElementById("startBattleButton");

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

let playerHero = null;
let enemyHero = null;

sendToBattleButton.onclick = () => {};
