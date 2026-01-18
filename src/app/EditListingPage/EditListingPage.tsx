import EditListingForm from "./components/EditListingForm";
import Title from "@/components/Title";

export default function EditListingPage() {
  return (
    <section className="flex flex-col gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Редагування</Title>
      </header>

      <EditListingForm />
    </section>
  );
}
