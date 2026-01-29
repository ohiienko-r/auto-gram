import type { MouseEvent } from "react";
import useMe from "@/hooks/useMe";
import useToggleListingLike from "@/hooks/useToggleListingLike";
import clsx from "clsx";

import { Link } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";

import { formatDistanceToNowStrict } from "date-fns";
import { uk } from "date-fns/locale";
import type { CarListing } from "@/types/app";

import { Card, CardContent } from "@/components/Card";
import ListingPhotosCarousel from "./ListingPhotoCarousel";

import HeartIcon from "@/icons/HeartIcon";
import SpeedometerIcon from "@/icons/SpeedometerIcon";
import TransmissionIcon from "@/icons/TransmissionIcon";
import GeoPinIcon from "@/icons/GeoPinIcon";
import FireIcon from "@/icons/FireIcon";

export default function CarListingCard({
  id,
  brand,
  model,
  price,
  mileage,
  settlement,
  fuel_type,
  gearbox,
  files,
  created_at,
  owner,
  is_liked,
}: CarListing) {
  const { data: me } = useMe();
  const { mutate } = useToggleListingLike();

  const handleAddToFavorites = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    mutate(id);
  };

  return (
    <Link to={`${ROUTES_NAMES.DETAILS}/${id}`}>
      <Card>
        <ListingPhotosCarousel data={files} />

        <CardContent className="gap-5 py-3">
          <div className="flex justify-between items-start">
            <div className="flex-col gap-1 fex">
              <h2 className="font-semibold text-2xl">
                {brand} {model}
              </h2>

              <p className="inline-flex items-center gap-2 font-semibold text-primary text-base">
                {`$${price}`}
              </p>
            </div>

            {me?.telegram_id !== owner?.telegram_id && (
              <button
                type="button"
                onClick={handleAddToFavorites}
                className="group size-6 cursor-pointer"
              >
                <HeartIcon className={clsx(is_liked && "fill-primary")} />
              </button>
            )}
          </div>

          <section className="flex flex-col gap-4">
            <div className="gap-5 grid grid-cols-2">
              <div className="flex items-center gap-2">
                <SpeedometerIcon />

                <div>
                  <p className="font-semibold text-black/60 text-xs">Пробіг</p>
                  <p className="font-medium text-base">{mileage}тис. км</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TransmissionIcon />

                <div>
                  <p className="font-semibold text-black/60 text-xs">Коробка</p>
                  <p className="font-medium text-base">{gearbox}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <GeoPinIcon />

                <div>
                  <p className="font-semibold text-black/60 text-xs">Місто</p>
                  <p className="font-medium text-base">{settlement}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FireIcon />

                <div>
                  <p className="font-semibold text-black/60 text-xs">Паливо</p>
                  <p className="font-medium text-base">{fuel_type}</p>
                </div>
              </div>
            </div>

            <p className="font-medium text-black/60 text-sm">
              {formatDistanceToNowStrict(new Date(created_at), {
                addSuffix: true,
                locale: uk,
              })}
            </p>
          </section>
        </CardContent>
      </Card>
    </Link>
  );
}
