import { FocusScope } from "@radix-ui/react-focus-scope";
import { IoIosClose } from "react-icons/io";
import { AlertDialog, Button } from "../";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../config/constants";
import { useLogoutUser } from "../../features/auth/hooks/mutations.hooks";
import { useDeleteUser } from "../../features/user/hooks/mutations.hooks";
import { useEffect, useState } from "react";
import type { UserDTO } from "@squelch/shared";
import { ProfileUpdate } from "./ProfileUpdate";

interface UserConfigProps {
  user: UserDTO | undefined;
  isFetching: boolean;
  onClose: () => void;
}

export function UserConfig({ user, isFetching, onClose }: UserConfigProps) {
  const navigate = useNavigate();
  const logoutMutation = useLogoutUser();
  const deleteMutation = useDeleteUser();
  const [isProfileUpdateOpen, setIsProfileUpdateOpen] =
    useState<boolean>(false);
  const [alertDialogInfo, setAlertDialogInfo] = useState<{
    title: string;
    message: string;
    confirmButtonMsg: string;
    variant: "default" | "danger";
    onClick: (result: "cancel" | "confirm") => unknown;
  } | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (!isProfileUpdateOpen) {
      timeoutId = setTimeout(
        () => document.getElementById("user-profile-close-btn")?.focus(),
        50,
      );
    }
    return () => clearTimeout(timeoutId);
  }, [isProfileUpdateOpen]);

  const handleLogoutClick = async (action: "cancel" | "confirm") => {
    if (action === "cancel") {
      setAlertDialogInfo(null);
      return;
    }
    logoutMutation.mutate(null, {
      onSuccess: () => navigate(APP_ROUTES.LOGIN, { replace: true }),
    });
  };

  const handleDeleteClick = async (action: "cancel" | "confirm") => {
    if (action === "cancel") {
      setAlertDialogInfo(null);
      return;
    }
    deleteMutation.mutate(null, {
      onSuccess: () => navigate(APP_ROUTES.REGISTER, { replace: true }),
    });
  };

  return (
    <>
      <FocusScope
        trapped={!isProfileUpdateOpen}
        loop={!isProfileUpdateOpen}
        asChild
      >
        <aside
          className={`flex flex-col items-start justify-start transition-all duration-300 ease-in-out fixed z-201 top-0 right-0 bottom-0 bg-surface w-80 p-2`}
          id="user-profile"
          aria-label="Configurações do usuário"
        >
          {alertDialogInfo && <AlertDialog {...alertDialogInfo} />}

          <button
            onClick={onClose}
            className="-ml-2 cursor-pointer"
            aria-label="Fechar configurações do usuário"
            aria-controls="user-profile"
            id="user-profile-close-btn"
          >
            <IoIosClose size={40} className="text-tx-main" aria-hidden={true} />
          </button>

          <div className="flex flex-row gap-2 items-center w-full mt-2">
            <div className="size-13 shrink-0 rounded-full bg-subtle"></div>
            <div className="flex flex-col items-start justify-center">
              <strong className="text-xl font-medium">
                {user ? user.name : ""}
              </strong>
              <p className="italic text-tx-overlay max-w-58.25 truncate">
                {user ? user.email : ""}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsProfileUpdateOpen(true)}
            customClassName="w-full max-w-full mt-5"
            id="user-profile-update-btn"
          >
            Atualizar informações
          </Button>

          {isProfileUpdateOpen && (
            <ProfileUpdate
              user={user}
              isFetching={isFetching}
              onClose={() => setIsProfileUpdateOpen(false)}
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-2">
            <Button
              onClick={() =>
                setAlertDialogInfo({
                  title: "Desconectar da sua conta?",
                  message:
                    "Você deseja desconectar da sua conta? Poderá voltar a hora que quiser.",
                  confirmButtonMsg: "Desconectar",
                  variant: "default",
                  onClick: handleLogoutClick,
                })
              }
              variant="ghost-primary"
              customClassName="w-full max-w-full"
            >
              Desconectar
            </Button>
            <Button
              onClick={() =>
                setAlertDialogInfo({
                  title: "Deletar a sua conta?",
                  message:
                    "Você realmente deseja deletar a sua conta? A ação não pode ser desfeita.",
                  confirmButtonMsg: "Deletar conta",
                  variant: "danger",
                  onClick: handleDeleteClick,
                })
              }
              variant="danger"
              customClassName="w-full max-w-full"
            >
              Deletar conta
            </Button>
          </div>
        </aside>
      </FocusScope>

      <div
        onClick={onClose}
        className={`fixed z-200 left-0 right-0 bottom-0 top-0 bg-[#00000054]`}
      />
    </>
  );
}
