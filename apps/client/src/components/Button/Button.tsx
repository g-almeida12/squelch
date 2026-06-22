import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonLinkProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  onClick?: () => void;
  variant?: "primary" | "ghost-primary" | "danger";
  customClassName?: string;
  children: React.ReactNode;
}

export function Button({
  onClick,
  variant = "primary",
  customClassName,
  children,
  ...props
}: ButtonLinkProps) {
  const variantStyles = {
    primary: "bg-accent-primary text-tx-contrast",
    "ghost-primary": "bg-transparent text-accent-primary",
    danger: "bg-red-600 text-tx-main border-red-600"
  };

  return (
    <button
      className={twMerge(
        "hover:brightness-90 select-none p-3 pbe-1 pbs-1 rounded-1 inline-block border-2 border-accent-primary font-medium hover:cursor-pointer",
        variantStyles[variant],
        customClassName,
      )}
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
