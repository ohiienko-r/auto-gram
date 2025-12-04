import { formatDistanceToNowStrict } from "date-fns";
import { uk } from "date-fns/locale";

import { Card, CardContent } from "@/components/Card";
// TODO: remove this import as well as file
import TempCar from "@/assets/temp_car.png";

import HeartIcon from "@/icons/HeartIcon";
import SpeedometerIcon from "@/icons/SpeedometerIcon";
import TransmissionIcon from "@/icons/TransmissionIcon";
import GeoPinIcon from "@/icons/GeoPinIcon";
import FireIcon from "@/icons/FireIcon";

export default function AdvertisementCard() {
  return (
    <Card>
      <img
        src={TempCar}
        alt="Transport photo"
        className="rounded-2xl w-full h-auto max-h-[200px] object-cover"
      />

      <CardContent className="gap-5 py-3">
        <div className="flex justify-between items-start">
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

          <button className="group size-6 cursor-pointer">
            <HeartIcon className="group-hover:fill-primary" />
          </button>
        </div>

        <section className="flex flex-col gap-4">
          <div className="gap-5 grid grid-cols-2">
            <div className="flex items-center gap-2">
              <SpeedometerIcon />

              <div>
                <p className="font-semibold text-black/60 text-xs">Пробіг</p>
                <p className="font-medium text-base">170тис. км</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TransmissionIcon />

              <div>
                <p className="font-semibold text-black/60 text-xs">Коробка</p>
                <p className="font-medium text-base">Автомат</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <GeoPinIcon />

              <div>
                <p className="font-semibold text-black/60 text-xs">Місто</p>
                <p className="font-medium text-base">Харків</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FireIcon />

              <div>
                <p className="font-semibold text-black/60 text-xs">Паливо</p>
                <p className="font-medium text-base">Бензин</p>
              </div>
            </div>
          </div>

          <p className="font-medium text-black/60 text-sm">
            {formatDistanceToNowStrict(new Date("2025-12-01T12:00:00Z"), {
              addSuffix: true,
              locale: uk,
            })}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
