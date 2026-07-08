import { IoMdTrophy } from "react-icons/io";
import { MdLibraryAddCheck, MdUpload } from "react-icons/md";
import { ProgressCard } from "../../../../components";
import type { UserProgressDTO } from "@squelch/shared";

interface ProgressCardsProps {
  userProgress: UserProgressDTO | undefined;
  isFetching: boolean;
  isError: boolean;
}

export function ProgressCards({
  userProgress,
  isFetching,
  isError,
}: ProgressCardsProps) {
  return (
    <section className="w-full max-w-7xl mt-4">
      <div className="flex flex-col items-center justify-between gap-1.5 w-full max-w-3xl m-auto sm:grid sm:grid-cols-4 lg:flex lg:flex-row lg:gap-4 lg:max-w-fit">
        {/* Fallback logic */}
        {(() => {
          if (isFetching) {
            return (
              <>
                <div className="w-full max-w-sm min-w-68 flex-1 min-h-[113.5px] rounded-1 p-2 bg-surface animate-pulse sm:col-start-1 sm:col-end-3"></div>
                <div className="w-full max-w-sm min-w-68 flex-1 min-h-[113.5px] rounded-1 p-2 bg-surface animate-pulse sm:col-start-3 sm:col-end-5"></div>
                <div className="w-full max-w-sm min-w-68 flex-1 min-h-[113.5px] rounded-1 p-2 bg-surface animate-pulse sm:col-start-2 sm:col-end-4"></div>
              </>
            );
          }

          if (isError) {
            return (
              <p className="h-[113.5px]  w-full text-tx-overlay">
                Não foi possível carregar seu progresso.
              </p>
            );
          }

          return (
            <>
              <div className="w-full max-w-sm min-w-68 flex-1 sm:col-start-1 sm:col-end-3">
                <ProgressCard
                  Icon={MdLibraryAddCheck}
                  title="Tarefas Concluídas"
                  progress={userProgress?.completedChallengeIds.length}
                  finalProgress={userProgress?.totalChallenges}
                  hasProgressCircle
                />
              </div>
              <div className="w-full max-w-sm min-w-68 flex-1 sm:col-start-3 sm:col-end-5">
                <ProgressCard
                  Icon={IoMdTrophy}
                  title="Níveis Concluídos"
                  progress={userProgress?.completedGroupSlugs.length}
                  finalProgress={userProgress?.totalGroups}
                  hasProgressCircle
                />
              </div>
              <div className="w-full max-w-sm min-w-68 flex-1 sm:col-start-2 sm:col-end-4">
                <ProgressCard
                  Icon={MdUpload}
                  title="Submissões Feitas"
                  progress={userProgress?.totalSubmissions}
                />
              </div>
            </>
          );
        })()}
      </div>

      <hr className="mt-5 text-subtle" />
    </section>
  );
}
