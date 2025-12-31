import Title from "@/components/Title";
import AdvertisementCard from "@/components/CarListingCard";
import FavoritesEmpty from "./components/FavoritesEmpty";
// TODO: mock
const data: string[] = [];

export default function FavoritesPage() {
  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5">
      <header className="text-center">
        <Title>Обране</Title>
      </header>

      {data.length === 0 && <FavoritesEmpty />}

      {data.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="font-medium text-black/60 text-base">
            Збережено {data?.length} авто
          </h3>

          <div className="flex flex-col gap-5">
            <AdvertisementCard />
          </div>
        </section>
      )}
    </section>
  );
}
