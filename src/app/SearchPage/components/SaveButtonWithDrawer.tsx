import { useState } from "react";
import { useSearchStore } from "@/stores/search-store";
import useSaveSearch from "../hooks/useSaveSearch";
import useSavedSearches from "../hooks/useSavedSearches";

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
import { toast } from "sonner";

import { SAVED_SEARCHES_TABS } from "../constants/tabs";

import { SaveIcon } from "lucide-react";

export default function SaveButtonWithDrawer() {
  const [open, setOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const { formValues } = useSearchStore();
  const { data } = useSavedSearches();
  const { mutate } = useSaveSearch();

  const handleSaveSearch = () => {
    console.log(formValues);
    if (formValues === null) {
      setOpen(false);
      toast.warning("Неможливо зберегти порожній пошук");
      return;
    }

    if (searchName.length === 0) {
      toast.warning("Введіть назву пошуку!");
      return;
    }

    const saveSearchPayload = { name: searchName, ...formValues };

    mutate(saveSearchPayload);

    setOpen(false);
    setSearchName("");
  };

  return (
    <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type="button" className="rounded-full w-12 h-12">
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
              <TabsTrigger key={tab} value={tab} className="w-full">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={SAVED_SEARCHES_TABS.SAVE}>
            <div className="flex flex-col gap-2">
              <Label>Назва пошуку</Label>

              <Input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Назва пошуку"
              />

              <Button
                onClick={handleSaveSearch}
                disabled={searchName.length === 0}
              >
                Зберегти
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
