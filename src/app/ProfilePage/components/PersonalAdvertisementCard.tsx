import { formatDistanceToNowStrict } from "date-fns";
import { uk } from "date-fns/locale";

import { Card, CardContent } from "@/components/Card";
// TODO: remove this import as well as file
import TempCar from "@/assets/temp_car.png";

import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import TrashIcon from "@/icons/TrashIcon";

export default function PersonalAdvertisementCard() {
  return (
    <Card>
      <img
        src={TempCar}
        alt="Transport photo"
        className="rounded-2xl w-full h-auto max-h-[200px] object-cover"
      />

      <CardContent className="gap-3 py-3">
        <div className="flex-col gap-1 fex">
          {/* Add title (car name) */}
          <h2 className="font-semibold text-2xl">BMW X4 35i III</h2>

          <p className="inline-flex items-center gap-2 font-semibold text-base">
            {/* Price in USD */}
            <span className="text-primary">15 500$</span>

            {/* Price in UAH */}
            <span className="text-black/60">645 000 грн</span>
          </p>
        </div>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <p className="font-medium text-black/60 text-sm">
              {formatDistanceToNowStrict(new Date("2025-12-01T12:00:00Z"), {
                addSuffix: true,
                locale: uk,
              })}
            </p>

            <div className="flex items-center gap-4">
              <EyeIcon className="text-primary" />

              <ul className="gap-8 grid grid-cols-3">
                <li className="flex flex-col gap-1 font-medium text-sm">
                  <p className="opacity-60">24 години:</p>
                  <p>6</p>
                </li>

                <li className="flex flex-col gap-1 font-medium text-sm">
                  <p className="opacity-60">7 днів:</p>
                  <p>45</p>
                </li>

                <li className="flex flex-col gap-1 font-medium text-sm">
                  <p className="opacity-60">Весь час:</p>
                  <p>150</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer">
              Змінити <EditIcon />
            </button>

            <button className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer">
              Видалити <TrashIcon />
            </button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
