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

export function ChallengeNavbar({
  challengeList,
  isSidebarOpen,
}: ChallengeNavbarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  return (
    <nav aria-label="Navegação de desafios">
      <ul className="flex flex-col gap-1.5">
        {Object.entries(challengeList).map(([groupTitle, challenges]) => {
          const Icon = GROUP_ICONS[groupTitle];

          return (
            <li className="group" key={groupTitle} id={groupTitle}>
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
                    className={`text-accent-primary font-heading font-semibold text-base line-clamp-1 text-ellipsis ${isSidebarOpen ? "" : "hidden"}`}
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
                    className={`text-accent-primary ${isSidebarOpen ? "" : "hidden"} ${openGroups[groupTitle] ? "rotate-0" : "rotate-180"}`}
                    size={20}
                    aria-hidden={true}
                  />
                </button>
                <div className="absolute top-0 right-0 bottom-0 left-0 -z-1 bg-accent-primary/30"></div>
              </div>

              {/* Challenges */}
              <ul
                className={`flex-col items-start select-none ${openGroups[groupTitle] && isSidebarOpen ? `flex` : "hidden"}`}
                id={`list-${groupTitle}`}
              >
                {challenges.map((c, idx) => {
                  return (
                    <li
                      className={`flex flex-row items-center w-full h-7.5 border-l-2 font-heading ${
                        c.completedByUser
                          ? "border-accent-primary bg-accent-primary/10"
                          : "border-transparent bg-dark/60"
                      }`}
                      data-id={c.id}
                      key={c.id}
                    >
                      <div className="h-full w-9 min-w-9 shrink-0"></div>
                      <Link
                        to={APP_ROUTES["CHALLENGE"](c.id)}
                        className={`w-full block truncate text-[15px] line-clamp-1 text-left cursor-pointer ${
                          c.completedByUser
                            ? "text-tx-main font-semibold"
                            : "text-tx-overlay font-normal"
                        }`}
                      >
                        {idx + 1}. {c.title}
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
