import { useParams } from "react-router";
import useListingDetails from "../../hooks/useListingDetails";
import useToggleListingLike from "@/hooks/useToggleListingLike";
import { openTelegramLink } from "@tma.js/sdk-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/Card";
import ListingPhotosCarousel from "@/components/ListingPhotoCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import Title from "@/components/Title";

import HeartIcon from "@/icons/HeartIcon";
import SpeedometerIcon from "@/icons/SpeedometerIcon";
import TransmissionIcon from "@/icons/TransmissionIcon";
import GeoPinIcon from "@/icons/GeoPinIcon";
import TelegramOutlineIcon from "@/icons/TelegramOutlineIcon";
import { LoaderCircle } from "lucide-react";

export default function DetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useListingDetails(id);
  const { mutate, isPending } = useToggleListingLike();

  return (
    <section className="flex flex-col gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Авто</Title>
      </header>

      <div className="flex flex-col gap-6">
        <Card>
          {isLoading ? (
            <Skeleton className="rounded-2xl w-full h-[220px]" />
          ) : (
            <ListingPhotosCarousel
              data={data?.files.map((file) =>
                file.replace(
                  "http://localhost:8000",
                  "https://7tt5472n-8000.euw.devtunnels.ms"
                )
              )}
            />
          )}

          <CardContent className="gap-6 py-3">
            <div className="flex justify-between items-start">
              <div className="flex-col gap-1 fex">
                {isLoading ? (
                  <Skeleton className="rounded-md w-40 h-8" />
                ) : (
                  <h2 className="font-semibold text-2xl">
                    {data?.brand} {data?.model}
                  </h2>
                )}

                {isLoading ? (
                  <Skeleton className="rounded-sm w-40 h-6" />
                ) : (
                  <p className="inline-flex items-center gap-2 font-semibold text-base">
                    <span className="text-primary">{data?.price}$</span>

                    <span className="text-black/60">
                      {Math.round(data?.price ?? 0 * 42.34)} грн
                    </span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => mutate(Number(id))}
                className="group size-6 cursor-pointer"
              >
                {isPending ? (
                  <LoaderCircle className="size-6 text-primary animate-spin" />
                ) : (
                  <HeartIcon />
                )}
              </button>
            </div>

            <section className="flex flex-col gap-4">
              <div className="gap-4 grid grid-cols-2">
                <div className="flex items-center gap-3 col-span-2">
                  <GeoPinIcon />

                  <div className="font-medium text-base">
                    <p className="text-black/60">Місто</p>
                    {isLoading ? (
                      <Skeleton className="rounded-sm w-10 h-6" />
                    ) : (
                      <p>{data?.settlement}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <SpeedometerIcon />

                  <div className="font-medium text-base">
                    <p className="text-black/60">Пробіг</p>
                    {isLoading ? (
                      <Skeleton className="rounded-sm w-10 h-6" />
                    ) : (
                      <p>{data?.mileage} тис. км</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TransmissionIcon />

                  <div className="font-medium text-base">
                    <p className="text-black/60">Коробка</p>
                    {isLoading ? (
                      <Skeleton className="rounded-sm w-10 h-6" />
                    ) : (
                      <p>{data?.gearbox}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Опис</h3>

                {isLoading ? (
                  <Skeleton className="rounded-sm w-full h-6" />
                ) : (
                  <p>{data?.description || "-"}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Двигун</h3>

                {isLoading ? (
                  <Skeleton className="rounded-sm w-10 h-6" />
                ) : (
                  <p>{data?.engine_capacity_l} л.</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Колір</h3>

                {isLoading ? (
                  <Skeleton className="rounded-sm w-10 h-6" />
                ) : (
                  <p>{data?.color ?? "-"}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Матеріал салону</h3>

                {isLoading ? (
                  <Skeleton className="rounded-sm w-10 h-6" />
                ) : (
                  <p>{data?.salon_material}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Стан</h3>

                {isLoading ? (
                  <Skeleton className="rounded-sm w-10 h-6" />
                ) : (
                  <p>{data?.condition}</p>
                )}
              </div>
            </section>
          </CardContent>
        </Card>

        {isLoading ? (
          <Skeleton className="rounded-2xl w-full h-[200px]" />
        ) : (
          data?.owner && (
            <Card>
              <CardContent className="gap-3 py-3">
                <div className="flex justify-between items-center font-medium text-black/60 text-base">
                  <p>Продавець</p>

                  {/* TODO: Implement when applicable */}
                  {/* <p>3 роки з нами</p> */}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 font-semibold text-2xl">
                    <h2>{data.owner.name}</h2>
                    <p className="text-primary">{data.owner?.phone}</p>
                  </div>

                  <Button
                    onClick={() =>
                      openTelegramLink(`https://t.me/${data.owner?.name}`)
                    }
                  >
                    Написати в Телеграм
                    <TelegramOutlineIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
