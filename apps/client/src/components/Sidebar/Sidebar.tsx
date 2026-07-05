import { FocusScope } from "@radix-ui/react-focus-scope";
import { RiMenuFold2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useGetChallengeList } from "../../features/challenge/hooks/challenges.queries";
import { ChallengeNavbar } from "./components";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: challengeList, isFetching, isError } = useGetChallengeList();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <FocusScope trapped={isOpen} loop={isOpen} asChild>
        <aside
          className={`transition-all fixed z-101 top-0 bottom-0 flex flex-col gap-4 overflow-x-hidden overflow-y-auto w-13 p-2 bg-surface ${isOpen ? "w-65" : "w-13"}`}
          id="sidebar"
          aria-label="Menu lateral de desafios"
        >
          {/* Toggle button */}
          <div className="absolute bottom-0 left-2 right-2 flex items-center justify-end border-t border-solid p-1 border-subtle">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-1 cursor-pointer"
              aria-label={isOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
              aria-controls="sidebar"
              aria-expanded={isOpen}
            >
              <RiMenuFold2Fill
                size={24}
                className={`text-tx-overlay ${isOpen ? "rotate-180" : ""} min-w-6`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Logo */}
          <div
            className="flex flex-row items-center justify-start gap-2 border-b border-solid pb-2 border-subtle"
            aria-hidden="true"
          >
            <div className="size-9 min-w-9 rounded-full bg-accent-primary flex justify-center items-center select-none">
              <div className="relative -top-px h-4 flex justify-center items-center font-bold font-heading text-tx-contrast text-sm">
                SQL
              </div>
            </div>

            <span className="font-heading text-base text-accent-primary font-medium select-none">
              Squelch
            </span>
          </div>

          {/* Fallback logic */}
          {(() => {
            if (isFetching) {
              return <div></div>;
            }

            if (isError) {
              if (isOpen) {
                return <p className="text-tx-overlay">Não foi possível carregar os desafios.</p>;
              } else {
                return <div></div>;
              }
            }

            return (
              <ChallengeNavbar
                challengeList={challengeList!}
                isSidebarOpen={isOpen}
              />
            );
          })()}
        </aside>
      </FocusScope>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed z-100 left-0 right-0 bottom-0 top-0 bg-[#00000054] ${isOpen ? "block" : "hidden"}`}
      ></div>
    </>
  );
}
