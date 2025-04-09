'use client';

import { Suspense } from 'react';

import PagePokemon from '@/features/pokemons/PagePokemon';

export default function Page() {
  return (
    <Suspense>
      <PagePokemon />
    </Suspense>
  );
}
