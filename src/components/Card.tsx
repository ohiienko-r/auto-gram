import type { ComponentProps } from "react";
import clsx from "clsx";

function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx("bg-white rounded-2xl", className)} {...props} />;
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx("flex flex-col gap-4 p-4", className)} {...props} />
  );
}

export { Card, CardContent };
