import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useGetUserProfile } from "../../features/user/hooks/user.queries";
import { UserConfig } from "./components";

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
  const { data: user, isFetching, isError } = useGetUserProfile();
  const [isUserConfigOpen, setIsUserConfigOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isUserConfigOpen) {
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isUserConfigOpen]);

  return (
    <>
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
              <li className="h-full" key={title}>
                <button
                  onClick={() => handleActiveTabChange(index)}
                  className={`flex items-center justify-center h-full px-4 font-semibold text-tx-overlay [font-variant-caps:small-caps] font-heading cursor-pointer data-[active=true]:bg-overlay data-[active=true]:text-tx-main ${index === 0 ? "rounded-tr-xl" : "rounded-t-xl"}`}
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
            onClick={() => {
              setIsUserConfigOpen(true);
            }}
            className="p-2 mr-2 cursor-pointer"
            aria-label="Abrir configurações do usuário"
            aria-expanded={isUserConfigOpen}
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
        {isUserConfigOpen && (
          <UserConfig
            user={user}
            isFetching={isFetching}
            isError={isError}
            onClose={() => setIsUserConfigOpen(false)}
          />
        )}
      </header>
    </>
  );
}
