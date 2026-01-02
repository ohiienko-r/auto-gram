import useFavorites from "./hooks/useFavorites";

import { Button } from "@/components/ui/button";
import CarListingCard from "@/components/CarListingCard";
import FavoritesEmpty from "./components/FavoritesEmpty";
import Title from "@/components/Title";
import { Skeleton } from "@/components/ui/skeleton";

export default function FavoritesPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFavorites();

  const favorites = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5">
      <header className="text-center">
        <Title>Обране</Title>
      </header>

      {favorites.length === 0 && <FavoritesEmpty />}

      {favorites.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="font-medium text-black/60 text-base">
            Збережено {favorites.length} авто
          </h3>

          <div className="flex flex-col gap-5">
            {favorites.map((favorite) => (
              <CarListingCard key={favorite.id} {...favorite} />
            ))}

            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="rounded-2xl w-full h-[430px]"
                />
              ))}

            {hasNextPage && (
              <Button
                variant="ghost"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                Завантажити ще
              </Button>
            )}
          </div>
        </section>
      )}
    </section>
  );
}
