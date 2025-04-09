import React from 'react';

import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';

import { trpc } from '@/lib/trpc/client';

import { Pokemon, PokemonType } from './schemas';

export default function PagePokemon() {
  const { data, isLoading } = trpc.pokemons.getAll.useQuery();

  const pokemons = data?.items || [];
  const total = data?.total || 0;

  const bgColor = useColorModeValue('white', 'gray.800');
  const headerBgColor = useColorModeValue('gray.50', 'gray.700');

  const getTypeColor = (type: PokemonType) => {
    const typeColors = {
      FIRE: { bg: 'red.100', color: 'red.800' },
      WATER: { bg: 'blue.100', color: 'blue.800' },
      GRASS: { bg: 'green.100', color: 'green.800' },
      ELECTRIC: { bg: 'yellow.100', color: 'yellow.800' },
      ICE: { bg: 'cyan.100', color: 'cyan.800' },
      FIGHTING: { bg: 'orange.100', color: 'orange.800' },
      POISON: { bg: 'purple.100', color: 'purple.800' },
      GROUND: { bg: 'orange.100', color: 'orange.800' },
      FLYING: { bg: 'blue.100', color: 'blue.800' },
      PSYCHIC: { bg: 'pink.100', color: 'pink.800' },
      BUG: { bg: 'green.100', color: 'green.800' },
      ROCK: { bg: 'gray.100', color: 'gray.800' },
      GHOST: { bg: 'purple.100', color: 'purple.800' },
      DRAGON: { bg: 'purple.100', color: 'purple.800' },
      DARK: { bg: 'gray.100', color: 'gray.800' },
      STEEL: { bg: 'gray.100', color: 'gray.800' },
      FAIRY: { bg: 'pink.100', color: 'pink.800' },
      NORMAL: { bg: 'gray.100', color: 'gray.700' },
    };

    return typeColors[type] || { bg: 'gray.100', color: 'gray.800' };
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="xl" mb={6}>
        Pokemon Database
      </Heading>

      <Stat mb={6}>
        <StatLabel>Total Pokemon</StatLabel>
        <StatNumber>{total}</StatNumber>
      </Stat>

      {isLoading ? (
        <Flex justify="center" my={8}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Flex>
      ) : (
        <Box overflowX="auto" borderRadius="md" boxShadow="md">
          <Table variant="simple" size="md" bg={bgColor}>
            <Thead bg={headerBgColor}>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th isNumeric>HP</Th>
                <Th isNumeric>Attack</Th>
                <Th isNumeric>Defense</Th>
                <Th isNumeric>Speed</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pokemons.length > 0 ? (
                pokemons.map((pokemon: Pokemon) => (
                  <Tr key={pokemon.id} _hover={{ bg: 'gray.50' }}>
                    <Td>
                      {pokemon.imageUrl ? (
                        <Flex align="center">
                          <Box
                            mr={3}
                            borderRadius="full"
                            overflow="hidden"
                            boxSize="40px"
                          >
                            <Image
                              src={pokemon.imageUrl}
                              alt={pokemon.name}
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </Box>
                          <Text fontWeight="medium">{pokemon.name}</Text>
                        </Flex>
                      ) : (
                        <Text fontWeight="medium">{pokemon.name}</Text>
                      )}
                    </Td>
                    <Td>
                      <Flex direction="column" gap={1}>
                        <Badge
                          colorScheme={
                            getTypeColor(pokemon.type).color.split('.')[0]
                          }
                          px={2}
                          py={1}
                          borderRadius="md"
                          textTransform="capitalize"
                        >
                          {pokemon.type.toLowerCase()}
                        </Badge>
                        {pokemon.secondType && (
                          <Badge
                            colorScheme={
                              getTypeColor(pokemon.secondType).color.split(
                                '.'
                              )[0]
                            }
                            px={2}
                            py={1}
                            borderRadius="md"
                            textTransform="capitalize"
                          >
                            {pokemon.secondType.toLowerCase()}
                          </Badge>
                        )}
                      </Flex>
                    </Td>
                    <Td isNumeric>
                      <Tag colorScheme="red" variant="subtle" size="sm">
                        {pokemon.hp}
                      </Tag>
                    </Td>
                    <Td isNumeric>
                      <Tag colorScheme="orange" variant="subtle" size="sm">
                        {pokemon.attack}
                      </Tag>
                    </Td>
                    <Td isNumeric>
                      <Tag colorScheme="blue" variant="subtle" size="sm">
                        {pokemon.defense}
                      </Tag>
                    </Td>
                    <Td isNumeric>
                      <Tag colorScheme="green" variant="subtle" size="sm">
                        {pokemon.speed}
                      </Tag>
                    </Td>
                    <Td maxW="xs" isTruncated>
                      {pokemon.description || '-'}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center" py={8}>
                    <Text color="gray.500">No Pokemon found.</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
}
