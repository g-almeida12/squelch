import type { ChallengeList } from "@squelch/shared";
import { FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../config/constants";
import { GROUP_ICONS } from "../group-icons";
import { useState } from "react";

interface ChallengeNavbarProps {
  challengeList: ChallengeList;
  isSidebarOpen: boolean;
}

export function ChallengeNavbar({ challengeList, isSidebarOpen }: ChallengeNavbarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  
  return (
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
                    aria-hidden={!isSidebarOpen}
                    className={`text-accent-primary font-medium text-base line-clamp-1 text-ellipsis ${isSidebarOpen ? "" : "hidden"}`}
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
                  disabled={!isSidebarOpen}
                >
                  <FaCaretUp
                    className={`text-accent-primary ${isSidebarOpen ? "" : "hidden"} rotate-180 group-data-[open=true]:rotate-0`}
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
  );
}
