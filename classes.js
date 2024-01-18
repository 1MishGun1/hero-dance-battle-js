class Hero {
  constructor(name, level, healthPoints, stats) {
    this.name = name;
    this.level = level;
    this.healthPoints = healthPoints;
    this.stats = stats;
    this.stats.inst = 0;
  }

  displayHero() {
    const infoHero =
      `Name hero: ${this.name}` +
      `\nLevel hero: ${this.level}` +
      `\nHealth points hero: ${this.healthPoints}` +
      `\nPower: ${this.stats.str}` +
      `\nIntelligence: ${this.stats.int}` +
      `\nDexterity: ${this.stats.inst}`;
    alert(infoHero);
    console.log(infoHero);
  }
}

class Knight extends Hero {
  constructor(name, level, healthPoints, stats, isHorseTango, energy) {
    super(name, level, healthPoints, stats);
    this.isHorseTango = isHorseTango;
    this.energy = energy;
  }

  // Chiting
  dexterityUpKnight(hero) {
    if (this.energy) {
      if (this.energy > gameParameters.MIN_STAT) {
        let dexterityRes = (this.level * this.energy) / 30;

        if (hero.stats.agi + dexterityRes < gameParameters.MAX_STAT) {
          hero.stats.agi += dexterityRes;
          console.log(
            this.name +
              ' увеличивает ловкость ' +
              hero.name +
              ' на ' +
              dexterityRes +
              ' единиц.'
          );
        } else {
          hero.stats.agi = gameParameters.MAX_STAT;
        }

        let dexterityLowerKnight = (dexterityRes * 10) / this.level;
        if (this.energy - dexterityLowerKnight > gameParameters.MIN_STAT) {
          this.energy -= dexterityLowerKnight;
        } else {
          this.energy = gameParameters.MIN_STAT;
        }

        displayPlayerHero(playerHero);
      } else {
        alert('Мало энергии, мало каши ел');
      }
    }
  }

  displayHero() {
    super.displayHero();
    console.log(`Energy: ${this.energy}`);

    if (this.isHorseTango === 'true') {
      console.log('This hero can tango on a horse');
    }
  }
}

class Mage extends Hero {
  constructor(name, level, healthPoints, stats, hasTectonicPotion, mana) {
    super(name, level, healthPoints, stats);
    this.hasTectonicPotion = hasTectonicPotion;
    this.mana = mana;
  }

  // Chiting
  hpUpdateMage(hero) {
    if (this.mana) {
      if (this.mana > gameParameters.MIN_STAT) {
        let hpResult = this.level * 15;
        hero.healthPoints += hpResult;
        console.log(
          this.name +
            ' увеличивает танец ' +
            hero.name +
            ' на ' +
            hpResult +
            ' очков.'
        );
        this.mana -= hpResult * (15 / this.level) - this.level;
      } else {
        alert('Мало каши ел :(');
      }
    }
  }

  displayHero() {
    super.displayHero();
    console.log(`Mana: ${this.mana}`);

    if (this.hasTectonicPotion === 'true') {
      console.log('There is a potion');
    }
  }
}
