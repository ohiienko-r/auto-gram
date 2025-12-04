import Title from "@/components/Title";
import AdvertisementCard from "@/components/AdvertisementCard";

export default function FavoritesPage() {
  return (
    <section className="flex flex-col gap-4 px-4 pt-5">
      <header className="text-center">
        <Title>Обране</Title>
      </header>

      <section className="flex flex-col gap-3">
        <h3 className="font-medium text-black/60 text-base">
          Збережено 1 авто
        </h3>

        <div className="flex flex-col gap-5">
          <AdvertisementCard />
        </div>
      </section>
    </section>
  );
}
