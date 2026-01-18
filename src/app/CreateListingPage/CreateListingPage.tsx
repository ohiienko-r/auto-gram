import CreateListingForm from "./components/CreateListingForm";
import Title from "@/components/Title";

export default function CreateListingPage() {
  return (
    <section className="flex flex-col gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Продати авто</Title>
      </header>

      <CreateListingForm />
    </section>
  );
}
