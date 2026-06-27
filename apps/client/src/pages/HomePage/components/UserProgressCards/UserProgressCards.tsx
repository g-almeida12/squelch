import type { IconType } from "react-icons";
import { IoMdTrophy } from "react-icons/io";
import { MdLibraryAddCheck, MdUpload } from "react-icons/md";
import { useGetUserProgress } from "../../../../features/user/hooks/queries.hooks";

// ! Criar uma rota para a API retornar esses dados
const CHALLENGES_INFO = {
  groups: 1,
  challenges: 3,
} as const;

export function UserProgressCards() {
  const { data: userProgress } = useGetUserProgress();

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4 w-full max-w-7xl mt-4 mr-auto">
        <ProgressCard
          Icon={MdLibraryAddCheck}
          title="Tarefas Concluídas"
          progress={userProgress?.completedChallengeIds.length}
          finalProgress={CHALLENGES_INFO.challenges}
          hasProgressCircle
        />
        <ProgressCard
          Icon={IoMdTrophy}
          title="Níveis Concluídos"
          progress={userProgress?.completedGroupSlugs.length}
          finalProgress={CHALLENGES_INFO.groups}
          hasProgressCircle
        />
        <ProgressCard
          Icon={MdUpload}
          title="Submissões Feitas"
          progress={userProgress?.totalSubmissions}
        />
      </div>

      <hr className="my-5 text-subtle" />
    </>
  );
}

interface ProgressCardProps {
  Icon: IconType;
  title: string;
  progress: number | undefined;
  finalProgress?: number;
  hasProgressCircle?: boolean;
}

export function ProgressCard({
  Icon,
  title,
  progress,
  finalProgress,
  hasProgressCircle,
}: ProgressCardProps) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full max-w-sm min-w-72 rounded-1 p-2 bg-surface">
      <p
        className="flex flex-row items-center justify-start gap-2 text-tx-overlay text-[17px]"
        id={`info-${title}`}
      >
        <Icon size={20} /> {title}
      </p>

      <div
        className={`relative flex items-center justify-center size-13`}
      >
        {hasProgressCircle && (
          <svg
            className="absolute top-0 left-0 size-full -rotate-90"
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r={18}
              className="stroke-subtle"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r={18}
              className="stroke-accent-primary transition-all duration-300 ease-in-out"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={
                2 * Math.PI * 18 -
                Math.min(progress! / finalProgress!, 1) * (2 * Math.PI * 18)
              }
              strokeLinecap="round"
            />
          </svg>
        )}
        <span
          className="translate-y-0.75 text-2xl font-semibold font-alternate leading-none"
          aria-labelledby={`info-${title}`}
        >
          {progress}
        </span>
      </div>
    </div>
  );
}
