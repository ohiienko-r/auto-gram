import useFavorites from "./hooks/useFavorites";

import { Button } from "@/components/ui/button";
import CarListingCard from "@/components/CarListingCard";
import FavoritesEmpty from "./components/FavoritesEmpty";
import Title from "@/components/Title";

import { LoaderCircle } from "lucide-react";

export default function FavoritesPage() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useFavorites();

  const favorites = data?.pages?.flatMap((page) => page.results) ?? [];

  const showLoader = isLoading || (isRefetching && favorites.length === 0);

  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5">
      <header className="flex justify-center items-center gap-2">
        <Title>Обране</Title>
      </header>

      {favorites?.length === 0 && !isLoading && !isRefetching && (
        <FavoritesEmpty />
      )}

      {showLoader && (
        <div className="flex flex-col flex-1 justify-center items-center">
          <LoaderCircle className="size-10 text-primary animate-spin" />
        </div>
      )}

      {!showLoader && favorites?.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="font-medium text-black/60 text-base">
            Збережено {favorites.length} авто
          </h3>

          <div className="flex flex-col gap-5">
            {favorites?.map((favorite) => (
              <CarListingCard key={favorite.id} {...favorite} />
            ))}

            {hasNextPage && (
              <Button
                variant="link"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Завантажуємо...
                  </>
                ) : (
                  "Завантажити ще"
                )}
              </Button>
            )}
          </div>
        </section>
      )}
    </section>
  );
}
