import { useState, useRef } from "react";
import { useSearchStore } from "@/stores/search-store";
import useSaveSearch from "../hooks/useSaveSearch";
import useSavedSearches from "../hooks/useSavedSearches";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { SAVED_SEARCHES_TABS } from "../constants/tabs";

import { SaveIcon, TrashIcon, CheckIcon } from "lucide-react";

export default function SaveButtonWithDrawer() {
  const [open, setOpen] = useState(false);
  const { formValues } = useSearchStore();
  const { data } = useSavedSearches();
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
          <DrawerTitle>Пошуки</DrawerTitle>
        </DrawerHeader>

        <Tabs defaultValue={SAVED_SEARCHES_TABS.SAVE}>
          <TabsList className="w-full">
            {Object.values(SAVED_SEARCHES_TABS).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="w-full font-semibold data-[state=active]:text-primary"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={SAVED_SEARCHES_TABS.SAVE}>
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
          </TabsContent>

          <TabsContent value={SAVED_SEARCHES_TABS.SAVED}>
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between items-center gap-2 px-3 py-2 border rounded-md">
                <p className="font-semibold">Search name</p>

                <span className="inline-flex items-center gap-4">
                  <button
                    className="hover:opacity-60 text-primary transition-opacity cursor-pointer"
                    title="Apply filters"
                  >
                    <CheckIcon />
                  </button>

                  <button
                    className="hover:opacity-60 text-red-500 transition-opacity cursor-pointer"
                    title="Remove saved filter"
                  >
                    <TrashIcon />
                  </button>
                </span>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
