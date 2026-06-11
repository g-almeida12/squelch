import { Link } from "react-router-dom";

interface ButtonLinkProps {
  to: string;
  variant?: "primary" | "ghost-primary";
  customClassName?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  to,
  variant = "primary",
  customClassName,
  children,
}: ButtonLinkProps) {
  const variantStyles = {
    primary: "bg-accent-primary text-tx-contrast",
    "ghost-primary": "bg-transparent text-accent-primary",
  };

  return (
    <Link
      to={to}
      className={`hover:brightness-90 select-none p-3 pbe-1 pbs-1 rounded-1 inline-block border-2 border-accent-primary font-medium ${variantStyles[variant]} ${customClassName}`}
    >
      {children}
    </Link>
  );
}
