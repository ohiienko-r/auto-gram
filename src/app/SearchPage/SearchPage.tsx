import Title from "@/components/Title";
import { Card, CardContent } from "@/components/Card";
import SearchForm from "./forms/SearchForm";

export default function SearchPage() {
  return (
    <section className="flex flex-col gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Пошук</Title>
      </header>

      <Card>
        <CardContent>
          <SearchForm />
        </CardContent>
      </Card>
    </section>
  );
}
