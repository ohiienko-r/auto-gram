import { useState, useRef } from "react";
import { useSearchStore } from "@/stores/search-store";
import useSaveSearch from "../hooks/useSaveSearch";
import { toast } from "sonner";

import { transformSearchPayload } from "../utils/utils";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveIcon } from "lucide-react";

export default function SaveButtonWithDrawer() {
  const [open, setOpen] = useState(false);
  const { formValues } = useSearchStore();
  const { mutateAsync, isPending } = useSaveSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSaveSearch = () => {
    if (formValues === null) {
      setOpen(false);
      toast.warning("Неможливо зберегти порожній пошук");
      return;
    }

    const searchName = inputRef?.current?.value;

    if (!searchName || searchName.length === 0) {
      toast.warning("Введіть назву пошуку!");
      return;
    }

    const saveSearchPayload = transformSearchPayload(searchName, formValues);

    toast.promise(() => mutateAsync(saveSearchPayload), {
      loading: "Зберігаємо пошук...",
      style: {
        background: "#3c0366",
        color: "#e9d4ff",
      },
    });

    setOpen(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild disabled={isPending}>
        <Button
          type="button"
          className="rounded-full w-12 h-12"
          disabled={isPending}
        >
          <SaveIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined} className="px-2 min-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Зберегти пошук</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-2">
          <Label>Назва пошуку</Label>

          <Input
            ref={inputRef}
            placeholder="Назва пошуку"
            disabled={isPending}
          />

          <Button onClick={handleSaveSearch} disabled={isPending}>
            Зберегти
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
