import { FaCaretUp } from "react-icons/fa";
import { RiMenuFold2Fill } from "react-icons/ri";
import { SIDEBAR_GROUP_LINKS } from "./sidebar-challenges";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed z-101 top-0 bottom-0 w-13">
      <aside
        className={`transition-all fixed z-101 top-0 bottom-0 flex flex-col gap-4 overflow-x-hidden overflow-y-auto w-13 p-2 bg-surface ${isOpen ? "w-65" : "w-13"}`}
        id="sidebar"
      >
        {/* Logo */}
        <div className="flex flex-row items-center justify-start gap-2 border-b border-solid pb-2 border-subtle">
          <div
            className="size-9 min-w-9 rounded-full bg-accent-primary flex justify-center items-center select-none"
            aria-label="Voltar para página inicial"
          >
            <div
              className="relative -top-px h-4 flex justify-center items-center font-bold font-heading text-tx-contrast text-sm"
              aria-hidden="true"
            >
              SQL
            </div>
          </div>

          <span className="font-heading text-base text-accent-primary font-medium select-none">
            Squelch
          </span>
        </div>

        {/* Challenges groups */}
        {SIDEBAR_GROUP_LINKS.map(({ Icon, title, slug, challenges }) => (
          <div
            className="group"
            key={slug}
            id={slug}
            data-open="false"
            aria-hidden={!isOpen}
            tabIndex={isOpen ? 0 : -1}
          >
            {/* Group title */}
            <div
              data-slug={slug}
              className="relative z-1 flex flex-row items-center p-1 select-none justify-start"
            >
              <div className="flex flex-row gap-1 items-center">
                <Icon
                  size={28}
                  aria-hidden="true"
                  className="min-w-7 text-accent-primary pl-1"
                />
                <strong
                  className={`text-accent-primary font-medium text-base line-clamp-1 text-ellipsis ${isOpen ? "" : "hidden"}`}
                >
                  {title}
                </strong>
              </div>
              <button
                onClick={() => {
                  const group = document.getElementById(slug);
                  if (!group) return;

                  group.dataset["open"] =
                    group?.dataset["open"] === "true" ? "false" : "true";
                }}
                className="ml-auto pl-2 cursor-pointer"
                aria-label="Fechar grupo de desafios"
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
            <div className="hidden flex-col items-start gap-0.5 mt-2 select-none group-data-[open=true]:flex">
              {challenges.map((c) => (
                <div
                  className="flex flex-row gap-2 w-full h-7.5 cursor-pointer"
                  data-id={c.id}
                  key={c.id}
                >
                  <div className="h-full w-9 min-w-9 shrink-0"></div>
                  <span className="block truncate text-tx-overlay text-[15px] line-clamp-1">
                    {c.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Toggle button */}
        <div className="flex items-center justify-end border-t border-solid p-1 mt-auto border-subtle">
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
      </aside>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed z-100 left-0 right-0 bottom-0 top-0 bg-[#00000054] ${isOpen ? "block" : "hidden"}`}
      ></div>
    </div>
  );
}
