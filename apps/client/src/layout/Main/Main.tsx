import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface MainProps extends Omit<HTMLAttributes<HTMLElement>, "className"> {
  customClassName?: string;
  children: React.ReactNode;
}

export function Main({ customClassName = "", children, ...props }: MainProps) {
  return (
    <main className={twMerge("min-h-dvh p-8", customClassName)} {...props}>
      {children}
    </main>
  );
}
