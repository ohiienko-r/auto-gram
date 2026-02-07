import { useNavigate } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";
import useListingSearch from "@/hooks/useListingSearch";

import { Button } from "@/components/ui/button";
import CarListingCard from "../../components/CarListingCard";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";

import PlusIcon from "@/icons/PlusIcon";
import { LoaderCircle } from "lucide-react";

export default function MainPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useListingSearch();

  const navigate = useNavigate();

  const listings = data?.pages?.flatMap((page) => page.results) ?? [];

  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5 overflow-hidden">
      <header className="flex justify-between items-center">
        <Logo />

        <Button
          size="icon-sm"
          onClick={() => navigate(ROUTES_NAMES.CREATE_LISTING)}
        >
          <PlusIcon />
        </Button>
      </header>

      <Navigation />

      <section className="flex flex-col flex-1 gap-3 overflow-y-auto">
        <h3 className="font-medium text-black/60 text-base">Рекомендуємо</h3>

        <div className="flex flex-col gap-5">
          {listings?.map((listing) => (
            <CarListingCard key={listing.id} {...listing} />
          ))}

          {(isLoading || isFetchingNextPage) &&
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} className="rounded-2xl w-full h-[430px]" />
            ))}

          {!isLoading && listings?.length === 0 && (
            <p className="mt-10 text-black/40 text-center">
              Нічого не знайдено
            </p>
          )}
        </div>

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
      </section>
    </section>
  );
}
