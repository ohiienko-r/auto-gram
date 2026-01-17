import { useParams } from "react-router";

import Title from "@/components/Title";

export default function EditListingPage() {
  const { id } = useParams();

  console.log(id);

  return (
    <section className="flex flex-col gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Редагування</Title>
      </header>
    </section>
  );
}
