import type { IconType } from "react-icons";
import { MdNightsStay } from "react-icons/md";

export type ChallengeLink = {
  title: string;
  id: number;
};

export type SidebarGroup = {
  Icon: IconType;
  title: string;
  slug: string;
  challenges: ChallengeLink[];
};

export const SIDEBAR_GROUP_LINKS: SidebarGroup[] = [
  {
    Icon: MdNightsStay,
    title: "Furto Noturno",
    slug: "furto-noturno",
    challenges: [
      {
        title: "Quem é o Culpado?",
        id: 1,
      },
      {
        title: "O Cúmplice da Fuga",
        id: 2,
      },
      {
        title: "O Funcionário Corrupto",
        id: 3,
      },
    ],
  },
];
