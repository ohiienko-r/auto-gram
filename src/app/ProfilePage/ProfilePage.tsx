import { useMemo } from "react";
import useMe from "@/hooks/useMe";
import useMyListings from "./hooks/useMyListings";

import { LISTING_STATUS } from "@/constants/listing";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/Card";
import MyListingCard from "./components/MyListingCard";
import ProfileForm from "./forms/ProfileForm";
import ProfileEmpty from "./components/ProfileEmpty";
import Title from "@/components/Title";
import PlusIcon from "@/icons/PlusIcon";
import { LoaderCircle } from "lucide-react";

export default function ProfilePage() {
  const { data: me } = useMe();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyListings();

  const { approved, pending, removed } = useMemo(() => {
    const listings = data?.pages.flatMap((page) => page?.results) ?? [];
    return {
      approved: listings.filter(
        (listing) => listing.status === LISTING_STATUS.APPROVED,
      ),
      pending: listings.filter(
        (listing) => listing.status === LISTING_STATUS.PENDING,
      ),
      removed: listings.filter(
        (listing) => listing.status === LISTING_STATUS.REMOVED,
      ),
    };
  }, [data]);

  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Профіль</Title>
      </header>

      <section className="flex flex-col gap-8">
        <Card className="flex flex-col gap-8">
          <CardContent>
            {me && (!me.first_name || !me.phone_number) && (
              <p className="max-w-64 font-medium text-primary text-base">
                Щоб виставити авто на продаж, заповніть профіль
              </p>
            )}

            <ProfileForm />
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex flex-col flex-1 justify-center items-center">
            <LoaderCircle className="size-10 text-primary animate-spin" />
          </div>
        )}

        {approved.length === 0 &&
          pending.length === 0 &&
          removed.length === 0 &&
          !isLoading && <ProfileEmpty />}

        {(approved.length > 0 || pending.length > 0 || removed.length > 0) && (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="opacity-60 font-medium text-base">
                  Авто на продажі ({approved.length})
                </h3>

                <button className="flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer">
                  Додати <PlusIcon />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {approved.length === 0 && (
                  <p className="text-gray-500 text-center">
                    Немає авто на продажі
                  </p>
                )}

                {approved?.map((listing) => (
                  <MyListingCard key={listing.id} {...listing} />
                ))}

                {hasNextPage && (
                  <Button
                    variant="link"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    Завантажити ще
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="opacity-60 font-medium text-base">
                На модерації ({pending.length})
              </h3>

              <div className="flex flex-col gap-5">
                {pending.length === 0 && (
                  <p className="text-gray-500 text-center">
                    Немає авто на модерації
                  </p>
                )}

                {pending?.map((listing) => (
                  <MyListingCard key={listing.id} {...listing} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="opacity-60 font-medium text-base">
                Зняті ({removed.length})
              </h3>

              <div className="flex flex-col gap-5">
                {removed.length === 0 && (
                  <p className="text-gray-500 text-center">Немає знятих авто</p>
                )}

                {removed?.map((listing) => (
                  <MyListingCard key={listing.id} {...listing} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </section>
  );
}
