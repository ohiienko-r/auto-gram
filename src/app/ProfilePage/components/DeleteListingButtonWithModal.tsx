import { useState } from "react";
import { viewport } from "@tma.js/sdk-react";
import useDeleteListing from "../hooks/useDeleteListing";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

import { TrashIcon, LoaderCircle } from "lucide-react";

interface RemoveListingButtonWidthModalProps {
  id: number;
}

export default function DeleteListingButtonWidthModal({
  id,
}: RemoveListingButtonWidthModalProps) {
  const [open, setOpen] = useState(false);
  const { bottom } = viewport.safeAreaInsets();
  const { mutate, isPending } = useDeleteListing(() => setOpen(false));

  return (
    <Drawer modal dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer">
          Видалити <TrashIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent
        style={{ paddingBottom: bottom }}
        aria-describedby={undefined}
      >
        <DrawerHeader>
          <DrawerTitle>Видалити оголошення?</DrawerTitle>
        </DrawerHeader>

        <DrawerFooter>
          <Button
            variant={"outline"}
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Скасувати
          </Button>

          <Button
            variant={"destructive"}
            disabled={isPending}
            onClick={() => mutate(id)}
          >
            {isPending ? (
              <>
                Видаляємо... <LoaderCircle className="animate-spin" />
              </>
            ) : (
              "Видалити"
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
