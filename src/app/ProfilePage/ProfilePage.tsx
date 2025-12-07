import Title from "@/components/Title";
import { Card, CardContent } from "@/components/Card";
import ProfileForm from "./forms/ProfileForm";

export default function ProfilePage() {
  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5 overflow-y-auto">
      <header className="text-center">
        <Title>Профіль</Title>
      </header>

      <section className="flex flex-col gap-8">
        <Card className="flex flex-col gap-8">
          <CardContent>
            <p className="max-w-64 font-medium text-primary text-base">
              Щоб виставити авто на продаж, заповніть профіль
            </p>

            <ProfileForm />
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
