interface ButtonLinkProps {
  onClick: () => void;
  variant?: "primary" | "ghost-primary";
  customClassName?: string;
  children: React.ReactNode;
}

export function Button({
  onClick,
  variant = "primary",
  customClassName,
  children,
}: ButtonLinkProps) {
  const variantStyles = {
    primary: "bg-accent-primary text-tx-contrast",
    "ghost-primary": "bg-transparent text-accent-primary",
  };

  return (
    <button
      className={`hover:brightness-90 select-none p-3 pbe-1 pbs-1 rounded-1 inline-block border-2 border-accent-primary font-medium hover:cursor-pointer ${variantStyles[variant]} ${customClassName}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
