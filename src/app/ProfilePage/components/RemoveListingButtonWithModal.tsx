import { useState } from "react";
import { viewport } from "@tma.js/sdk-react";
import useRemoveListing from "../hooks/useRemoveListing";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

import { Undo2, LoaderCircle } from "lucide-react";

interface RemoveListingButtonWidthModalProps {
  id: number;
}

export default function RemoveListingButtonWidthModal({
  id,
}: RemoveListingButtonWidthModalProps) {
  const [open, setOpen] = useState(false);
  const { bottom } = viewport.safeAreaInsets();
  const { mutate, isPending } = useRemoveListing(() => setOpen(false));

  return (
    <Drawer modal dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 active:text-primary/80 text-base transition-colors cursor-pointer">
          Зняти <Undo2 />
        </button>
      </DrawerTrigger>

      <DrawerContent
        style={{ paddingBottom: bottom }}
        aria-describedby={undefined}
      >
        <DrawerHeader>
          <DrawerTitle>Зняти авто з продажу?</DrawerTitle>
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
                Знімаємо... <LoaderCircle className="animate-spin" />
              </>
            ) : (
              "Зняти"
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
