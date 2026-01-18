import { useNavigate } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";
import { LISTING_STATUS } from "@/constants/listing";
import clsx from "clsx";

import type { MyCarListing } from "@/types/app";

import { Card, CardContent } from "@/components/Card";
import RemoveListingButtonWidthModal from "./RemoveListingButtonWithModal";

import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import TrashIcon from "@/icons/TrashIcon";

export default function MyListingCard({
  id,
  title,
  price,
  created_ago,
  cover,
  views,
  status,
}: MyCarListing) {
  const navigate = useNavigate();

  return (
    <Card>
      <img
        src={cover}
        alt=""
        className="rounded-2xl w-full h-auto max-h-[200px] object-cover"
      />

      <CardContent className="gap-3 py-3">
        <div className="flex-col gap-1 fex">
          <h2 className="font-semibold text-2xl">{title}</h2>

          <p className="inline-flex items-center gap-2 font-semibold text-base">
            <span className="text-primary">{price}$</span>
          </p>
        </div>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <p className="font-medium text-black/60 text-sm">{created_ago}</p>

            <div className="flex items-center gap-4">
              <EyeIcon className="text-primary" />

              <ul className="gap-8 grid grid-cols-3">
                <li className="flex flex-col gap-1 font-medium text-sm">
                  <p className="opacity-60">24 години:</p>
                  <p>{views.last_24h}</p>
                </li>

                <li className="flex flex-col gap-1 font-medium text-sm">
                  <p className="opacity-60">7 днів:</p>
                  <p>{views.last_7d}</p>
                </li>

                <li className="flex flex-col gap-1 font-medium text-sm">
                  <p className="opacity-60">Весь час:</p>
                  <p>{views.all_time}</p>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={clsx(
              "flex items-center",
              status === LISTING_STATUS.REMOVED
                ? "justify-end"
                : "justify-between"
            )}
          >
            {status !== LISTING_STATUS.PENDING && (
              <button
                onClick={() => navigate(`${ROUTES_NAMES.EDIT_LISTING}/${id}`)}
                className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer"
              >
                Змінити <EditIcon />
              </button>
            )}

            {status !== LISTING_STATUS.REMOVED && (
              <RemoveListingButtonWidthModal id={id} />
            )}

            <button className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer">
              Видалити <TrashIcon />
            </button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
