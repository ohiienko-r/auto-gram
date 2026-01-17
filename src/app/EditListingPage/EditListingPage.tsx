import { useParams } from "react-router";

import Title from "@/components/Title";
import ListingForm from "@/shared/forms/ListingForm";

export default function EditListingPage() {
  const { id } = useParams();

  return (
    <section className="flex flex-col gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Редагування</Title>
      </header>

      <ListingForm />
    </section>
  );
}
