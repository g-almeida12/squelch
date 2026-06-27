import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface MainProps extends Omit<HTMLAttributes<HTMLElement>, "className"> {
  customClassName?: string;
  children: React.ReactNode;
}

export function Main({ customClassName = "", children, ...props }: MainProps) {
  return (
    <main className={twMerge("min-h-[calc(100dvh-53px)] mt-13.25 p-4", customClassName)} {...props}>
      {children}
    </main>
  );
}
