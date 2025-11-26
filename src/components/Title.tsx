import type { ComponentProps } from "react";
import clsx from "clsx";

export default function Title({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={clsx(
        "opacity-60 font-medium text-2xl leading-[19px]",
        className
      )}
      {...props}
    />
  );
}
