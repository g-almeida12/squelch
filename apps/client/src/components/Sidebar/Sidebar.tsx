import { FocusScope } from "@radix-ui/react-focus-scope";
import { FaCaretUp } from "react-icons/fa";
import { RiMenuFold2Fill } from "react-icons/ri";
import { GROUP_ICONS } from "./group-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../config/constants";
import { useGetChallengeList } from "../../features/challenge/hooks/challenges.queries";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const { data: challengeList } = useGetChallengeList();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isOpen]);

  if (!challengeList) {
    return <SidebarSkeleton />;
  }

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

          {/* Challenges groups */}
          <nav aria-label="Navegação de desafios">
            <ul className="flex flex-col gap-4">
              {Object.entries(challengeList).map(([groupTitle, challenges]) => {
                const Icon = GROUP_ICONS[groupTitle];

                return (
                  <li
                    className="group"
                    key={groupTitle}
                    id={groupTitle}
                    data-open={openGroups[groupTitle] ? "true" : "false"}
                  >
                    {/* Group title */}
                    <div className="relative z-1 flex flex-row items-center p-1 select-none justify-start">
                      <div className="flex flex-row gap-1 items-center">
                        <Icon
                          size={28}
                          aria-hidden="true"
                          className="min-w-7 text-accent-primary pl-1"
                        />
                        <strong
                          aria-hidden={!isOpen}
                          className={`text-accent-primary font-medium text-base line-clamp-1 text-ellipsis ${isOpen ? "" : "hidden"}`}
                        >
                          {groupTitle}
                        </strong>
                      </div>

                      <button
                        onClick={() =>
                          setOpenGroups((prev) => ({
                            ...prev,
                            [groupTitle]: !prev[groupTitle],
                          }))
                        }
                        className="ml-auto pl-2 cursor-pointer"
                        aria-label={`${openGroups[groupTitle] ? "Fechar" : "Abrir"} grupo ${groupTitle}`}
                        aria-expanded={openGroups[groupTitle]}
                        aria-controls={`list-${groupTitle}`}
                        disabled={!isOpen}
                      >
                        <FaCaretUp
                          className={`text-accent-primary ${isOpen ? "" : "hidden"} rotate-180 group-data-[open=true]:rotate-0`}
                          size={20}
                          aria-hidden={true}
                        />
                      </button>
                      <div className="absolute top-0 right-0 bottom-0 left-0 opacity-20 -z-1 bg-accent-primary"></div>
                    </div>

                    {/* Challenges */}
                    <ul
                      className="hidden flex-col items-start gap-0.5 mt-2 select-none group-data-[open=true]:flex"
                      id={`list-${groupTitle}`}
                    >
                      {challenges.map((c) => {
                        return (
                          <li
                            className="flex flex-row gap-2 w-full h-7.5"
                            data-id={c.id}
                            key={c.id}
                          >
                            <div className="h-full w-9 min-w-9 shrink-0"></div>
                            <Link
                              to={APP_ROUTES["CHALLENGE"](c.id)}
                              className="w-full block truncate text-tx-overlay text-[15px] line-clamp-1 text-left cursor-pointer"
                            >
                              {c.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </FocusScope>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed z-100 left-0 right-0 bottom-0 top-0 bg-[#00000054] ${isOpen ? "block" : "hidden"}`}
      ></div>
    </>
  );
}

function SidebarSkeleton() {
  return <div></div>;
}
