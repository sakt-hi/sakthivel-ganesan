import type { ComponentPropsWithoutRef, ElementType } from "react";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Card<T extends ElementType = "div">({ as, className, ...props }: CardProps<T>) {
  const Component = as ?? "div";
  const classes = ["ui-card", className].filter(Boolean).join(" ");
  return <Component className={classes} {...props} />;
}
