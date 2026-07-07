import { Button } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";
import { useGetChallengeResume } from "../../../../features/challenge/hooks/challenges.queries";

export function ResumeChallenge() {
  const {
    data: challengeResume,
    isFetching,
    isError,
  } = useGetChallengeResume();

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-[21px] font-medium">Continue sua jornada</h2>

      {/* Fallback logic */}
      {(() => {
        if (isFetching) {
          return <ResumeChallengeSkeleton />;
        }

        if (isError) {
          return (
            <div className="flex flex-col w-full max-w-sm min-w-72 min-h-35 rounded-1 p-2 bg-dark select-none">
              <p className="text-tx-overlay text-sm">
                Não foi possível carregar seu último desafio pendente.
              </p>
            </div>
          );
        }

        if (challengeResume === null) {
          return (
            <div className="flex flex-col w-full max-w-sm min-w-72 min-h-35 rounded-1 p-2 bg-dark select-none">
              <h3>Nenhum desafio pendente encontrado.</h3>
              <p className="text-tx-overlay text-sm">
                Se ainda não terminou nossa lista, que tal começar um novo?
              </p>
            </div>
          );
        }

        return (
          <div className="flex flex-col w-full max-w-sm min-w-72 rounded-1 p-2 bg-dark select-none">
            <h3 className="truncate font-heading font-semibold [font-variant-caps:small-caps]">
              {challengeResume!.groupTitle} - {challengeResume!.title}
            </h3>
            <p className="text-tx-overlay text-sm">
              Última vez:{" "}
              {new Date(challengeResume!.lastSubmissionDate).toLocaleDateString(
                "pt-BR",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}{" "}
              às{" "}
              {new Date(challengeResume!.lastSubmissionDate).toLocaleTimeString(
                "pt-BR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </p>
            <p className="text-tx-overlay text-sm">
              {challengeResume!.totalSubmissions}{" "}
              {challengeResume!.totalSubmissions === 1
                ? "tentativa"
                : "tentativas"}
            </p>

            <Button
              to={APP_ROUTES.CHALLENGE(challengeResume!.id)}
              customClassName="mt-6  w-fit"
            >
              Retormar desafio
            </Button>
          </div>
        );
      })()}
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
