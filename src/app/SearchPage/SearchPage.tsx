import Title from "@/components/Title";
import { Card, CardContent } from "@/components/Card";
import SearchForm from "./forms/SearchForm";

export default function SearchPage() {
  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5">
      <header className="text-center">
        <Title>Пошук</Title>
      </header>

      <div className="overflow-y-auto">
        <Card>
          <CardContent>
            <SearchForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
