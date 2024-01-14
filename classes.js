class Hero {
  constructor(name, level, healthPoints, stats) {
    this.name = name;
    this.level = level;
    this.healthPoints = healthPoints;
    this.stats = stats;
  }

  displayHero() {
    const infoHero =
      `Name hero: ${this.name}` +
      `\nLevel hero: ${this.level}` +
      `\nHealth points hero: ${this.healthPoints}` +
      `\nPower: ${this.stats.str}` +
      `\nIntelligence: ${this.stats.int}` +
      `\nDexterity: ${this.stats.inst}`;
    console.log(infoHero);
  }
}

class Knight extends Hero {
  constructor(name, level, healthPoints, stats, isHorseTango, energy) {
    super(name, level, healthPoints, stats);
    this.isHorseTango = isHorseTango;
    this.energy = energy;
  }

  displayHero() {
    super.displayHero();
    console.log(`Energy: ${this.energy}`);

    if (this.isHorseTango === "true") {
      console.log("This hero can tango on a horse");
    }
  }
}

class Mage extends Hero {
  constructor(name, level, healthPoints, stats, hasTectonicPotion, mana) {
    super(name, level, healthPoints, stats);
    this.hasTectonicPotion = hasTectonicPotion;
    this.mana = mana;
  }

  displayHero() {
    super.displayHero();
    console.log(`Mana: ${this.mana}`);

    if (this.hasTectonicPotion === "true") {
      console.log("There is a potion");
    }
  }
}
