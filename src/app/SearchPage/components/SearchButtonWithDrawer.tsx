import { useSearchStore } from "@/stores/search-store";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import SearchForm from "@/app/SearchPage/forms/SearchForm";

import SearchIcon from "@/icons/SearchIcon";
import XIcon from "@/icons/XIcon";

export default function SearchButtonWithDrawer() {
  const { searchOpen, setSearchOpen } = useSearchStore();

  return (
    <Drawer
      direction="left"
      open={searchOpen}
      onOpenChange={setSearchOpen}
      dismissible={false}
    >
      <DrawerTrigger asChild>
        <Button size={"md"} variant={"secondary"}>
          Пошук <SearchIcon className="text-primary" />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        aria-describedby={undefined}
        className="data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:sm:max-w-full"
      >
        <div className="relative flex flex-col gap-4 bg-grey px-4 pt-5 overflow-y-scroll">
          <button
            className="top-3 right-3 z-40 absolute cursor-pointer"
            onClick={() => setSearchOpen(false)}
          >
            <XIcon />
          </button>

          <DrawerTitle className="opacity-60 font-medium text-2xl text-center leading-[19px]">
            Пошук
          </DrawerTitle>

          <SearchForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
