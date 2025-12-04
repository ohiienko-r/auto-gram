import { useState, useMemo } from "react";
import { viewport } from "@tma.js/sdk-react";
import clsx from "clsx";

import type { Option } from "@/types/app";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { Toggle } from "./ui/toggle";

import CheckMarkIcon from "@/icons/CheckMarkIcon";
import SearchIcon from "@/icons/SearchIcon";
import XIcon from "@/icons/XIcon";

interface MultiselectListProps {
  listTitle?: string;
  triggerTitle?: string;
  options?: Option[];
  value: string[];
  onChange: (val: string[]) => void;
}

export default function Multiselect({
  listTitle = "Обрати",
  triggerTitle = "Обрати",
  options,
  value,
  onChange,
}: MultiselectListProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const { bottom } = viewport.safeAreaInsets();

  const currentOptions = useMemo(() => {
    if (!options) return [];
    const searchTerm = filter.toLowerCase().trim();
    if (!searchTerm) return options;

    return options.filter((option) =>
      option.label?.toLowerCase().includes(searchTerm)
    );
  }, [filter, options]);

  const handleOnChange = (val: string) => {
    const result = value.includes(val)
      ? value.filter((item) => item !== val)
      : [...value, val];

    onChange(result);
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Toggle pressed={false} className="w-fit" onClick={() => setOpen(true)}>
        {triggerTitle}
      </Toggle>

      {value?.map((item) => (
        <div
          key={item}
          className="flex items-center cursor-pointer"
          onClick={() => handleOnChange(item)}
        >
          <Toggle pressed className="pointer-events-none">
            {options?.find((option) => option.value === item)?.label}
          </Toggle>

          <XIcon className="text-primary" />
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="size-full"
          style={{ paddingBottom: bottom }}
        >
          <DialogHeader>
            <DialogTitle>{listTitle}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col flex-1 justify-start bg-white pb-4 rounded-b-2xl max-h-[calc(100%-76px)] overflow-hidden">
            <div className="relative">
              {!filter && (
                <div className="top-0 left-4 absolute flex items-center gap-2.5 h-full">
                  <span className="font-medium text-black text-base">
                    Пошук
                  </span>

                  <SearchIcon className="text-primary/60" />
                </div>
              )}

              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="py-2 pr-10 pl-4 border border-t-primary/60 border-b-primary/60 outline-none w-full placeholder:font-light font-medium placeholder:text-black/60 text-base caret-black/60"
                placeholder="Пошук"
                autoFocus={false}
              />

              <button
                className="top-1/2 right-4 absolute flex justify-center items-center h-full size-fit text-[#161617] -translate-y-1/2 cursor-pointer"
                onClick={() => setFilter("")}
              >
                <XIcon />
              </button>
            </div>

            <ul className="flex flex-col justify-start gap-3 px-4 overflow-y-auto">
              <Separator className="bg-transparent" />

              {currentOptions.map((option) => (
                <li key={option.value} className="flex flex-col gap-3">
                  <button
                    className={clsx(
                      "flex justify-start items-center gap-2 font-medium",
                      value?.includes(option.value) && "text-primary"
                    )}
                    onClick={() => handleOnChange(option.value)}
                  >
                    {option.label}

                    {value?.includes(option.value) && <CheckMarkIcon />}
                  </button>

                  <Separator />
                </li>
              ))}

              {(!options || !options?.length) && (
                <li className="font-medium text-grey text-center">
                  Нема результаів
                </li>
              )}
            </ul>
          </div>

          <DialogFooter className="items-center">
            <DialogClose asChild>
              <Button className="w-fit">
                Зберегти <CheckMarkIcon />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
