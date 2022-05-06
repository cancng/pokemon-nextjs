import {
  Alert,
  Box,
  Grid,
  SimpleGrid,
  Skeleton,
  Switch,
  useMantineColorScheme,
} from "@mantine/core";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery, useQuery } from "react-query";
import PokemonCard from "../components/PokemonCard";
import pokemonApi from "../lib/pokemonApi";
import { IPokemon } from "../types/pokemon";

function Home() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery(
      "pokemons",
      ({ pageParam }) => pokemonApi.getPokemons(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
      }
    );

  if (isLoading)
    return Array(16)
      .fill(0)
      .map((_, i) => (
        <Skeleton height="50px" mb="10px" key={`skeleton__${i}`} />
      ));

  if (isError)
    return (
      <Alert title="Error!" color="red">
        {(error as any).message}
      </Alert>
    );

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage as any} hasMore={hasNextPage}>
        <SimpleGrid
          cols={5}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
          spacing="lg"
          my="xl"
        >
          {data.pages.map((p) => {
            return p.results.map((poke: IPokemon) => {
              return <PokemonCard key={poke.id} pokemon={poke} />;
            });
          })}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
}

export default Home;
