import { z } from 'zod';

import { zPokemon } from '@/features/pokemons/schemas';

import { createTRPCRouter, protectedProcedure } from '../config/trpc';

export const pokemonsRouter = createTRPCRouter({
  getAll: protectedProcedure({ authorizations: ['APP', 'ADMIN'] })
    .meta({
      openapi: {
        method: 'GET',
        path: '/pokemons',
        protect: true,
        tags: ['pokemons'],
      },
    })
    .input(z.object({}).default({}))
    .output(
      z.object({
        items: z.array(zPokemon()),
        total: z.number(),
      })
    )
    .query(async ({ ctx }) => {
      ctx.logger.info('Getting pokemons from database');

      const [total, items] = await ctx.db.$transaction([
        ctx.db.pokemon.count({}),
        ctx.db.pokemon.findMany({
          orderBy: {
            name: 'asc',
          },
        }),
      ]);

      return {
        items,
        total,
      };
    }),
});
