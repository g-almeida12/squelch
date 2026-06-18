import { forwardRef, type InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  Icon?: IconType | null;
  errorMessage?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, Icon, errorMessage, ...props }, ref) => {
    const handleDivClick = () => {
      const input = document.getElementById(id);
      if (!input) return;

      input.focus();
    };

    return (
      <div>
        <div
          className={`group flex flex-col gap-1/2 w-full max-w-md rounded-1 border-2 border-surface pl-2 p-1 bg-surface text-left cursor-pointer hover:border-overlay focus-within:border-overlay focus-within:bg-overlay ${errorMessage ? " rounded-1 rounded-b-none" : "rounded-1"}`}
          onClick={handleDivClick}
        >
          <div className="flex flex-row items-center justify-start gap-1 text-tx-overlay group-focus-within:text-white group-focus-within:group-hover:text-white">
            {Icon && <Icon size={24} />}
            <label htmlFor={id} className="w-full cursor-pointer text-sm">
              {label}
            </label>
          </div>

          <input
            id={id}
            {...props}
            className="outline-none group-focus-within:text-white"
            ref={ref}
            aria-describedby={`error-${id}`}
          />
        </div>
        {errorMessage && (
          <div className="relative">
            <div
              className="absolute -top-2.5 w-0 h-0 border-l-10 border-l-solid border-l-dark border-b-10 border-b-solid border-b-transparent rotate-270"
              aria-hidden="true"
            ></div>
            <p
              className="w-full max-w-md m-auto p-1 rounded-md rounded-t-none bg-dark text-left text-red-600 text-sm :"
              id={`error-${id}`}
            >
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    );
  },
);
