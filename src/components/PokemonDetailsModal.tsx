import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Box,
  Image,
  Text,
  Progress,
  Stack,
} from "@mantine/core";
import { IPokemon } from "../types/pokemon";

type Props = {
  pokemon: IPokemon;
};

function PokemonDetailsModal({ pokemon }: Props) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={pokemon.name.toUpperCase()}
      >
        <Box>
          <Image
            src={pokemon.sprites.other.dream_world.front_default}
            height={200}
            fit="contain"
            alt={pokemon.name}
          />

          <Text weight="bold">Stats</Text>

          <Stack>
            {pokemon.stats.map((stat, i) => (
              <Progress
                key={`stat__${i}`}
                radius="xs"
                size="xl"
                value={stat.base_stat}
                label={`${stat.stat.name} - ${stat.base_stat}`}
              />
            ))}
          </Stack>
        </Box>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          fullWidth
          variant="light"
          color="violet"
        >
          Details
        </Button>
      </Group>
    </>
  );
}

export default PokemonDetailsModal;
