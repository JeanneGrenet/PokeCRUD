import { PokemonType } from '@prisma/client';
import { prisma } from 'prisma/seed/utils';

export async function createPokemons() {
  console.log('⏳ Seeding Pokemons');

  let createdCounter = 0;
  const existingCount = await prisma.pokemon.count();

  const pokemons = [
    {
      name: 'Bulbasaur',
      type: PokemonType.GRASS,
      secondType: PokemonType.POISON,
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
      description: 'A strange seed was planted on its back at birth.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    },
    {
      name: 'Charmander',
      type: PokemonType.FIRE,
      secondType: null,
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
      description: 'Obviously prefers hot places.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
    },
    {
      name: 'Squirtle',
      type: PokemonType.WATER,
      secondType: null,
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
      description: 'After birth, its back swells and hardens into a shell.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
    },
    {
      name: 'Pikachu',
      type: PokemonType.ELECTRIC,
      secondType: null,
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
      description:
        'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    },
    {
      name: 'Jigglypuff',
      type: PokemonType.FAIRY,
      secondType: PokemonType.NORMAL,
      hp: 115,
      attack: 45,
      defense: 20,
      speed: 20,
      description: 'Uses its alluring eyes to enrapture its foe.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png',
    },
    {
      name: 'Zubat',
      type: PokemonType.POISON,
      secondType: PokemonType.FLYING,
      hp: 40,
      attack: 45,
      defense: 35,
      speed: 55,
      description: 'Forms colonies in perpetually dark places.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png',
    },
    {
      name: 'Machop',
      type: PokemonType.FIGHTING,
      secondType: null,
      hp: 70,
      attack: 80,
      defense: 50,
      speed: 35,
      description: 'Loves to build its muscles.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png',
    },
    {
      name: 'Geodude',
      type: PokemonType.ROCK,
      secondType: PokemonType.GROUND,
      hp: 40,
      attack: 80,
      defense: 100,
      speed: 20,
      description: 'Often found in fields and mountains.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png',
    },
    {
      name: 'Gastly',
      type: PokemonType.GHOST,
      secondType: PokemonType.POISON,
      hp: 30,
      attack: 35,
      defense: 30,
      speed: 80,
      description:
        'Almost invisible, this gaseous Pokémon cloaks the target and puts it to sleep.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/092.png',
    },
    {
      name: 'Dragonite',
      type: PokemonType.DRAGON,
      secondType: PokemonType.FLYING,
      hp: 91,
      attack: 134,
      defense: 95,
      speed: 80,
      description: 'An extremely rarely seen marine Pokémon.',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png',
    },
  ];

  for (const pokemon of pokemons) {
    const exists = await prisma.pokemon.findUnique({
      where: { name: pokemon.name },
    });

    if (!exists) {
      await prisma.pokemon.create({ data: pokemon });
      createdCounter += 1;
    }
  }

  console.log(
    `✅ ${existingCount} existing pokemons 👉 ${createdCounter} created`
  );
}
