import { useState, useMemo } from "react";
import { Separator } from "./ui/separator";
import clsx from "clsx";
import type { Option } from "@/types/app";

import CheckMarkIcon from "@/icons/CheckMarkIcon";

// TODO: Move the whole dialog here and make it multiselect
interface MultiselectListProps {
  options?: Option[];
  value?: string[];
  onChange?: (val: string[]) => void;
}

export default function MultiselectList({
  options,
  value,
  onChange,
}: MultiselectListProps) {
  const [filter, setFilter] = useState("");

  const currentOptions = useMemo(() => {
    if (!options) return [];
    const searchTerm = filter.toLowerCase().trim();
    if (!searchTerm) return options;

    return options.filter((option) =>
      option.label?.toLowerCase().includes(searchTerm)
    );
  }, [filter, options]);

  const handleOnChange = (val: string) => {
    if (!value || !onChange) return;

    const result = value.includes(val)
      ? value.filter((item) => item !== val)
      : [...value, val];

    onChange(result);
  };

  return (
    <div className="flex flex-col flex-1 justify-start bg-white rounded-b-2xl overflow-hidden">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-4 py-2 border border-t-primary/60 border-b-primary/60 outline-none w-full font-medium placeholder:text-black/60 text-base"
        placeholder="Пошук"
      />

      <ul className="flex flex-col justify-start gap-3 px-4 pb-5 h-full max-h-[500px] overflow-y-auto">
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
          <li className="font-medium text-grey text-center">Нема результаів</li>
        )}
      </ul>
    </div>
  );
}
