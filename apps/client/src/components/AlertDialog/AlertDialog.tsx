import { useEffect } from "react";
import { Button } from "../";

interface AlertDialogProps {
  title: string;
  message: string;
  cancelButtonMsg?: string;
  confirmButtonMsg: string;
  onClick: (action: "cancel" | "confirm") => unknown;
  variant?: "default" | "danger";
}

export function AlertDialog({
  title,
  message,
  cancelButtonMsg = "Cancelar",
  confirmButtonMsg,
  onClick,
  variant = "default",
}: AlertDialogProps) {
  useEffect(() => {
    const modal = document.getElementById(
      `modal - ${title}`,
    ) as HTMLDialogElement | null;
    if (!modal) return;

    modal.showModal();
    document.documentElement.style.overflowY = "hidden";

    return () => {
      modal.close();
      document.documentElement.style.overflowY = "auto";
    };
  }, [title, onClick]);

  const handleClick = (result: "cancel" | "confirm") => {
    const modal = document.getElementById(
      `modal - ${title}`,
    ) as HTMLDialogElement | null;
    if (!modal) return;

    modal.close();
    onClick(result);
  };

  return (
    <dialog
      id={`modal - ${title}`}
      className="fixed top-1/2 left-1/2 -translate-1/2 w-full max-w-100 p-2 rounded-1 bg-overlay text-tx-main text-center backdrop:bg-[#00000099]"
    >
      <h2 className="mb-1 font-semibold text-xl">{title}</h2>
      <hr />
      <p className="mt-2 text-tx-surface">{message}</p>

      <div className="flex flex-col gap-2 mt-8">
        <Button onClick={() => handleClick("cancel")} variant="ghost-primary">
          {cancelButtonMsg}
        </Button>
        <Button
          onClick={() => handleClick("confirm")}
          variant={variant === "default" ? "primary" : "danger"}
        >
          {confirmButtonMsg}
        </Button>
      </div>
    </dialog>
  );
}
