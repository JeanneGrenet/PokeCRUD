import { z } from 'zod';

export const zPokemonType = z.enum([
  'STEEL',
  'FIGHTING',
  'DRAGON',
  'WATER',
  'ELECTRIC',
  'FAIRY',
  'FIRE',
  'ICE',
  'BUG',
  'NORMAL',
  'GRASS',
  'POISON',
  'PSYCHIC',
  'ROCK',
  'GROUND',
  'GHOST',
  'DARK',
  'FLYING',
]);

export type PokemonType = z.infer<typeof zPokemonType>;

export const zPokemon = () =>
  z.object({
    id: z.string().cuid(),
    name: z.string(),
    type: zPokemonType,
    secondType: zPokemonType.nullish(),
    hp: z.number().int(),
    attack: z.number().int(),
    defense: z.number().int(),
    speed: z.number().int(),
    description: z.string().nullish(),
    imageUrl: z.string().url().nullish(),
  });

export type Pokemon = z.infer<ReturnType<typeof zPokemon>>;
