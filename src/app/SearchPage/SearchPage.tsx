import Title from "@/components/Title";
import SearchForm from "./forms/SearchForm";

export default function SearchPage() {
  return (
    <section className="flex flex-col gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Пошук</Title>
      </header>

      <SearchForm />
    </section>
  );
}
