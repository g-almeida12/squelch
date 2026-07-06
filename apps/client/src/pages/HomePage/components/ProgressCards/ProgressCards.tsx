import { IoMdTrophy } from "react-icons/io";
import { MdLibraryAddCheck, MdUpload } from "react-icons/md";
import { useGetUserProgress } from "../../../../features/user/hooks/user.queries";
import { ProgressCard } from "../../../../components";

export function ProgressCards() {
  const { data: userProgress, isFetching, isError } = useGetUserProgress();

  return (
    <section className="w-full max-w-7xl mt-4">
      <div className="flex flex-col items-center justify-between gap-1.5 w-full m-auto sm:flex-row sm:gap-4">
        {/* Fallback logic */}
        {(() => {
          if (isFetching) {
            return Array.from({ length: 3 }).map((_, idx) => (
              <div
                className="w-full max-w-sm min-w-72 h-[113.5px] rounded-1 p-2 bg-surface animate-pulse"
                key={idx}
              ></div>
            ));
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
              <ProgressCard
                Icon={MdLibraryAddCheck}
                title="Tarefas Concluídas"
                progress={userProgress?.completedChallengeIds.length}
                finalProgress={userProgress?.totalChallenges}
                hasProgressCircle
              />
              <ProgressCard
                Icon={IoMdTrophy}
                title="Níveis Concluídos"
                progress={userProgress?.completedGroupSlugs.length}
                finalProgress={userProgress?.totalGroups}
                hasProgressCircle
              />
              <ProgressCard
                Icon={MdUpload}
                title="Submissões Feitas"
                progress={userProgress?.totalSubmissions}
              />
            </>
          );
        })()}
      </div>

      <hr className="mt-5 text-subtle" />
    </section>
  );
}
