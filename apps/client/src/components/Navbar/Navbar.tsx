import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { AlertDialog, Button } from "../";
import { useGetUser } from "../../features/user/hooks/queries.hooks";
import { useLogoutUser } from "../../features/auth/hooks/mutations.hooks";
import { useDeleteUser } from "../../features/user/hooks/mutations.hooks";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../config/constants";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { ProfileUpdate } from "./ProfileUpdate";

interface NavbarProps {
  tabs: readonly string[];
  activeTab: number;
  handleActiveTabChange: (index: number) => void;
}

export function Navbar({
  tabs,
  activeTab,
  handleActiveTabChange,
}: NavbarProps) {
  const { data: user } = useGetUser();
  const navigate = useNavigate();
  const logoutMutation = useLogoutUser();
  const deleteMutation = useDeleteUser();
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
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
    if (isNavbarOpen) {
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isNavbarOpen]);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (isNavbarOpen && !isProfileUpdateOpen) {
      timeoutId = setTimeout(() =>
        document.getElementById("user-profile-close-btn")?.focus(),
      );
    }

    return () => clearTimeout(timeoutId);
  }, [isNavbarOpen, isProfileUpdateOpen]);

  const handleLogoutClick = async (action: "cancel" | "confirm") => {
    if (action === "cancel") {
      setAlertDialogInfo(null);
      return;
    }

    logoutMutation.mutate(null, {
      onSuccess: () => {
        navigate(APP_ROUTES.LOGIN, { replace: true });
      },
    });
  };

  const handleDeleteClick = async (action: "cancel" | "confirm") => {
    if (action === "cancel") {
      setAlertDialogInfo(null);
      return;
    }

    deleteMutation.mutate(null, {
      onSuccess: () => {
        navigate(APP_ROUTES.REGISTER, { replace: true });
      },
    });
  };

  return (
    <>
      {alertDialogInfo && <AlertDialog {...alertDialogInfo} />}
      <header className="fixed flex flex-row h-13.25 w-full max-w-full shrink-0 border-b border-solid border-subtle bg-main">
        <nav
          className="flex flex-row h-13.25 w-full max-w-[calc(100%-52px)] shrink-0 border-b border-solid border-subtle bg-main"
          aria-label="Navegação principal do site"
        >
          {/* Tabs container */}
          <ul
            className="flex flex-1 flex-row items-center justify-start"
            role="tablist"
            aria-label="Abas de navegação de tela"
          >
            {tabs.map((title, index) => (
              <li className="h-full">
                <button
                  onClick={() => handleActiveTabChange(index)}
                  className={`flex items-center justify-center h-full px-4 font-semibold text-tx-overlay [font-variant-caps:small-caps] font-heading cursor-pointer data-[active=true]:bg-overlay data-[active=true]:text-tx-main ${index === 0 ? "rounded-tr-xl" : "rounded-t-xl"}`}
                  key={title}
                  data-active={index === activeTab}
                  type="button"
                  role="tab"
                  aria-selected={index === activeTab}
                  aria-controls={`view-${index}`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsNavbarOpen(true)}
            className="p-2 mr-2 cursor-pointer"
            aria-label="Abrir configurações do usuário"
            aria-expanded={isNavbarOpen}
            aria-controls="user-profile"
          >
            <MdAccountCircle
              size={32}
              className="text-tx-main"
              aria-hidden={true}
            />
          </button>
        </nav>

        {/* Profile */}
        {isNavbarOpen && (
          <FocusScope
            trapped={isNavbarOpen && !isProfileUpdateOpen}
            loop={isNavbarOpen && !isProfileUpdateOpen}
            asChild
          >
            <aside
              className={`flex flex-col items-start justify-start transition-all fixed z-101 top-0 bottom-0 w-80 p-2 bg-surface ${isNavbarOpen ? "right-0" : "-right-80"}`}
              id="user-profile"
              aria-label="Configurações do usuário"
            >
              <button
                onClick={() => setIsNavbarOpen(false)}
                className="cursor-pointer"
                aria-label="Fechar configurações do usuário"
                aria-controls="user-profile"
                disabled={!isNavbarOpen}
                id="user-profile-close-btn"
              >
                <IoIosClose
                  size={40}
                  className="text-tx-main"
                  aria-hidden={true}
                />
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
                disabled={!isNavbarOpen}
                id="user-profile-update-btn"
              >
                Atualizar informações
              </Button>

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
                  disabled={!isNavbarOpen}
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
                  disabled={!isNavbarOpen}
                >
                  Deletar conta
                </Button>
              </div>
            </aside>
          </FocusScope>
        )}

        {/* Profile update */}
        {isProfileUpdateOpen && (
          <ProfileUpdate
            handleClose={() => setIsProfileUpdateOpen(false)}
            isOpen={isProfileUpdateOpen}
          />
        )}

        {/* Overlay */}
        <div
          onClick={() => {
            if (isProfileUpdateOpen) {
              setIsProfileUpdateOpen(false);
            } else {
              setIsNavbarOpen(false);
            }
          }}
          className={`fixed z-100 left-0 right-0 bottom-0 top-0 bg-[#00000054] ${isNavbarOpen ? "block" : "hidden"}`}
        ></div>
      </header>
    </>
  );
}
