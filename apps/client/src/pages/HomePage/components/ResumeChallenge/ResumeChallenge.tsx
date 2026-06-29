import { Button } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";
import { useGetChallengeResume } from "../../../../features/challenge/hooks/challenges.queries";

export function ResumeChallenge() {
  const { data: challengeResume } = useGetChallengeResume();

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-[21px] font-medium">Continue sua jornada</h2>

      {challengeResume ? (
        <div className="flex flex-col w-full max-w-sm min-w-72 rounded-1 p-2 bg-dark select-none">
          <h3 className="truncate">
            {challengeResume.groupTitle} - {challengeResume.title}
          </h3>
          <p className="text-tx-overlay text-sm">
            Tentativas: {challengeResume.totalSubmissions}
          </p>
          <p className="text-tx-overlay text-sm">
            Última tentativa em:{" "}
            {new Date(challengeResume.lastSubmissionDate).toLocaleDateString(
              "pt-BR",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            )}
          </p>

          <Button
            to={APP_ROUTES.CHALLENGE(challengeResume.id)}
            customClassName="mt-6  w-fit"
          >
            Retormar desafio
          </Button>
        </div>
      ) : challengeResume === null ? (
        <div className="flex flex-col w-full max-w-sm min-w-72 min-h-35 rounded-1 p-2 bg-dark select-none">
          <h3>Ainda não começou seus mistérios?</h3>
          <p className="text-tx-overlay text-sm">
            Clique no botão abaixo para começar seu primeiro desafio no Squelch.
          </p>
          <Button to={APP_ROUTES.CHALLENGE(1)} customClassName="mt-auto  w-fit">
            Começar investigação
          </Button>
        </div>
      ) : (
        <ResumeChallengeSkeleton />
      )}
    </section>
  );
}

function ResumeChallengeSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-sm min-w-72 min-h-35 rounded-1 p-2 bg-dark select-none">
      <div className="h-6 w-full rounded-md bg-surface opacity-30 animate-pulse"></div>
      <div className="h-4 w-full max-w-30 mt-2 rounded-md bg-surface opacity-30 animate-pulse"></div>
      <div className="h-4 w-full max-w-75 mt-1 rounded-md bg-surface opacity-30 animate-pulse"></div>

      <div className="h-8 w-full max-w-50 mt-auto rounded-md bg-surface opacity-30 animate-pulse"></div>
    </div>
  );
}
