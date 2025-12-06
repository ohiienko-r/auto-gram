import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import Title from "@/components/Title";
import { Card, CardContent } from "@/components/Card";

import HeartIcon from "@/icons/HeartIcon";
import SpeedometerIcon from "@/icons/SpeedometerIcon";
import TransmissionIcon from "@/icons/TransmissionIcon";
import GeoPinIcon from "@/icons/GeoPinIcon";
import TelegramOutlineIcon from "@/icons/TelegramOutlineIcon";

// TODO: remove this import as well as file
import TempCar from "@/assets/temp_car.png";

export default function DetailsPage() {
  const { id } = useParams();
  console.log(id);

  return (
    <section className="flex flex-col gap-4 px-4 pt-5">
      <header className="text-center">
        <Title>Авто</Title>
      </header>

      <div className="flex flex-col gap-6">
        <Card>
          <img
            src={TempCar}
            alt="Transport photo"
            className="rounded-2xl w-full h-auto max-h-[200px] object-cover"
          />

          <CardContent className="gap-6 py-3">
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
                <HeartIcon className="fill-primary" />
              </button>
            </div>

            <section className="flex flex-col gap-4">
              <div className="gap-4 grid grid-cols-2">
                <div className="flex items-center gap-3 col-span-2">
                  <GeoPinIcon />

                  <div className="font-medium text-base">
                    <p className="text-black/60">Місто</p>
                    <p>Харків</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <SpeedometerIcon />

                  <div className="font-medium text-base">
                    <p className="text-black/60">Пробіг</p>
                    <p>170тис. км</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TransmissionIcon />

                  <div className="font-medium text-base">
                    <p className="text-black/60">Коробка</p>
                    <p>Автомат</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Опис</h3>

                <p>
                  Компактный и надёжный автомобиль, отлично подходит для
                  повседневной езды. Экономичный расход топлива и простое
                  обслуживание делают его удобным в эксплуатации. Уютный салон и
                  базовые функции комфорта обеспечивают приятную поездку
                </p>
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Двигун</h3>

                <p>Toyota — 1ZR-FE (1.6 л, бензин)</p>
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Колір</h3>

                <p>Червоний</p>
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Матеріал салону</h3>

                <p>Шкіра</p>
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Безпека</h3>

                <p>Шкіра</p>
              </div>

              <div className="flex flex-col gap-1.5 font-medium text-base">
                <h3 className="text-black/60">Стан</h3>

                <p>Нова</p>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="gap-3 py-3">
            <div className="flex justify-between items-center font-medium text-black/60 text-base">
              <p>Продавець</p>

              <p>3 роки з нами</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 font-semibold text-2xl">
                <h2>Николай</h2>
                <p className="text-primary">+38 099 286 98 37</p>
              </div>

              <Button>
                Написати в Телеграм
                <TelegramOutlineIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
