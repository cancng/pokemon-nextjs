import {
  Card,
  Group,
  Image,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "react-query";
import pokemonApi from "../lib/pokemonApi";
import { IPokemon } from "../types/pokemon";
import PokemonDetailsModal from "./PokemonDetailsModal";

type Props = {
  pokemon: any;
};
function PokemonCard({ pokemon }: Props) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const { data, isLoading } = useQuery<IPokemon>(
    ["pokemon", pokemon.name],
    () => pokemonApi.getPokemon(pokemon.name)
  );

  return (
    <div>
      <Card shadow="xs" p="md">
        {isLoading ? (
          <Skeleton height="300px" />
        ) : (
          <>
            <Card.Section>
              <Image
                src={data.sprites.other.dream_world.front_default}
                height={200}
                fit="contain"
                alt={data.name}
              />
            </Card.Section>

            <Group
              position="apart"
              style={{
                marginBottom: 5,
                marginTop: theme.spacing.sm,
              }}
            >
              <Text weight={500} transform="capitalize">
                {data.name}
              </Text>
            </Group>

            <PokemonDetailsModal pokemon={data} />
          </>
        )}
      </Card>
    </div>
  );
}

export default PokemonCard;
