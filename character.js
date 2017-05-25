var character = {
  name: Seras,
  games: ["D&D", "Mutants and Masterminds"],
  classes: ["Ninja", "Assassin", "Cleric"],
  abilities: [
    {
      name: Sealth,
      type: combative
    },
    {
      name: Deception,
      type: social
    },
    {
      name: Healing,
      type: utility
    }
  ],
  relations: [
    {
      name: Yvette,
      status: Wife,
      gender: Female
    },
    {
      name: Ephera,
      status: True Love,
      gender: Female
    },
    {
      name: Keth,
      status: Partner,
      gender: Male
    }
  ]
};

module.exports = character;
