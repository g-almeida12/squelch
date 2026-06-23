import type { ButtonHTMLAttributes } from "react";
import { Link, type LinkProps, type Path } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface BaseButtonProps {
  customClassName?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost-primary" | "danger";
  disabled?: boolean;
}

type ButtonProps =
  | (BaseButtonProps &
      Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "disabled"
      > & {
        to?: never;
      })
  | (BaseButtonProps &
      Omit<LinkProps, "className"> & { to: string | Partial<Path> });

export function Button({
  customClassName,
  variant = "primary",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "select-none p-3 pbe-1 pbs-1 rounded-1 inline-block border-2 border-accent-primary font-medium";
  const variantStyles = {
    primary: "bg-accent-primary text-tx-contrast",
    "ghost-primary": "bg-transparent text-accent-primary",
    danger: "bg-red-600 text-tx-main border-red-600",
  };
  const className = twMerge(
    baseStyles,
    variantStyles[variant],
    !disabled && "hover:brightness-90 hover:cursor-pointer",
    disabled &&
      "opacity-60 brightness-90 cursor-not-allowed pointer-events-none",
    customClassName,
  );

  if ("to" in props) {
    return (
      <Link {...(props as LinkProps)} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
