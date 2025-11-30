import Title from "@/components/Title";
import { Card, CardContent } from "@/components/Card";
import SearchForm from "./forms/SearchForm";

export default function SearchPage() {
  return (
    <section className="gap-4 px-4 pt-5 max-h-screen">
      <div className="flex flex-col flex-1 gap-4">
        <header className="text-center">
          <Title>Пошук</Title>
        </header>

        <Card>
          <CardContent>
            <SearchForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
