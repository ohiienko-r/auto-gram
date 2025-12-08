import Title from "@/components/Title";
import { Card, CardContent } from "@/components/Card";
import ProfileForm from "./forms/ProfileForm";
import ProfileEmpty from "./components/ProfileEmpty";
import PersonalAdvertisementCard from "./components/PersonalAdvertisementCard";

import PlusIcon from "@/icons/PlusIcon";

const data: string[] = [];

export default function ProfilePage() {
  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Профіль</Title>
      </header>

      <section className="flex flex-col gap-8">
        <Card className="flex flex-col gap-8">
          <CardContent>
            <p className="max-w-64 font-medium text-primary text-base">
              Щоб виставити авто на продаж, заповніть профіль
            </p>

            <ProfileForm />
          </CardContent>
        </Card>

        {data.length !== 0 && <ProfileEmpty />}

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="opacity-60 font-medium text-base">
              Авто на продажі (1)
            </h3>

            <button className="flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer">
              Додати <PlusIcon />
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <PersonalAdvertisementCard />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="opacity-60 font-medium text-base">На модерації (1)</h3>

          <div className="flex flex-col gap-5">
            <PersonalAdvertisementCard />
          </div>
        </div>
      </section>
    </section>
  );
}
