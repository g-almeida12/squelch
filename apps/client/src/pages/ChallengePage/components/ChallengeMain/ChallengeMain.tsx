import ReactMarkdown from "react-markdown";
import type { QueryResultDTO, SubmissionValidationDTO } from "@squelch/shared";
import { Button, MonacoEditor, QueryResult } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";
import { useGetChallenge } from "../../../../features/challenge/hooks/challenges.queries";
import {
  useRunQuery,
  useValidateQuery,
} from "../../../../features/submission/hooks/submission.mutations";
import { useEffect, useRef, useState } from "react";
import { AvaliableTables } from "../AvaliableTables";

type SubmissionResult = {
  success: boolean;
  errorMessages: SubmissionValidationDTO["errorMessages"];
} | null;

interface ChallengeMainProps {
  challengeId: number;
}

export function ChallengeMain({ challengeId }: ChallengeMainProps) {
  const resultSectionRef = useRef<HTMLElement>(null);
  const [userQueryResult, setUserQueryResult] = useState<QueryResultDTO>([]);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult>(null);
  const {
    data: challenge,
    isFetching,
    isError,
  } = useGetChallenge(Number(challengeId));
  const runQueryMutation = useRunQuery();
  const validateQueryMutation = useValidateQuery();

  useEffect(() => {
    runQueryMutation.reset();
    validateQueryMutation.reset();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  useEffect(() => {
    if (!submissionResult) return;

    if (resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView();
    }
  }, [submissionResult]);

  if (!challenge) {
    return <ChallengeMainSkeleton />;
  }

  const handleRunQuery = async (submittedQuery: string) => {
    if (!submittedQuery) return;

    runQueryMutation.mutate(
      { id: challengeId, submittedQuery },
      {
        onSuccess: (queryResult) => setUserQueryResult(queryResult),
      },
    );
  };

  const handleValidateQuery = async (submittedQuery: string) => {
    if (!submittedQuery) return;

    const date = new Date();
    validateQueryMutation.mutate(
      { id: challengeId, submission: { submittedQuery, date } },
      {
        onSuccess: (validation) => {
          setUserQueryResult(validation.submission.userQueryResult);
          setSubmissionResult({
            success: validation.submission.success,
            errorMessages: validation.errorMessages,
          });
        },
      },
    );
  };

  return (
    <>
      <section>
        {/* Fallback logic */}
        {(() => {
          if (isFetching) {
            return <ChallengeMainSkeleton />;
          }

          if (isError) {
            return (
              <>
                <Button to={APP_ROUTES.HOME} variant="ghost-primary">
                  Página principal
                </Button>
                <p className="mt-10 text-tx-overlay">
                  Não foi possível caregar o desafio.
                </p>
              </>
            );
          }

          return (
            <>
              {/* Challenge description */}
              <Button to={APP_ROUTES.HOME} variant="ghost-primary">
                Página principal
              </Button>
              <h2 className="mt-10 text-2xl font-semibold font-heading tracking-wider">
                {challenge.groupTitle} - {challenge.title}
              </h2>
              <div className="prose prose-invert text-[17px] max-w-5xl my-2">
                <ReactMarkdown>{challenge.markdown}</ReactMarkdown>
              </div>

              <AvaliableTables
                challengeId={challengeId ? challengeId : undefined}
              />

              {/* User's query editor */}
              <div className="relative w-full flex flex-col gap-y-4 mt-10 lg:grid lg:grid-cols-2 lg:gap-x-1">
                {(runQueryMutation.isError ||
                  validateQueryMutation.isError) && (
                  <p className="col-span-2 text-red-400">
                    {runQueryMutation.error?.body.message ||
                      validateQueryMutation.error?.body.message}
                  </p>
                )}
                <div className="flex-1">
                  <MonacoEditor
                    forSubmission
                    onTestClick={handleRunQuery}
                    onValidateClick={handleValidateQuery}
                  />
                </div>
                <div className="flex-1">
                  <QueryResult
                    userQueryResult={userQueryResult}
                    isPending={runQueryMutation.isPending}
                    isError={runQueryMutation.isError}
                    height="h-80"
                  />
                </div>
              </div>
            </>
          );
        })()}
      </section>

      {/* Submission result feedback */}
      <section aria-live="polite" aria-atomic="true" ref={resultSectionRef}>
        {submissionResult?.success === true ? (
          <div className="mt-8">
            <h2 className="p-2 rounded-1 bg-green-600 text-2xl font-heading font-semibold">
              Resposta Correta!
            </h2>
            <p className="pl-2 mt-2 text-lg text-tx-overlay">
              Mandou bem! Desafio concluído com sucesso.
            </p>

            <hr className="my-4 text-subtle" />
          </div>
        ) : (
          submissionResult?.success === false && (
            <div className="mt-8">
              <h2 className="p-2 rounded-1 bg-red-600 text-2xl font-heading font-semibold">
                Resposta Errada.
              </h2>
              {submissionResult!.errorMessages!.map((err, idx) => (
                <p className="pl-2 mt-2 text-lg text-tx-overlay" key={idx}>
                  {err}
                </p>
              ))}
            </div>
          )
        )}
      </section>
    </>
  );
}

function ChallengeMainSkeleton() {
  return (
    <>
      <Button to={APP_ROUTES.HOME} variant="ghost-primary">
        Página principal
      </Button>

      {/* Challenge description */}
      <div className="h-10 w-xl mt-10 mb-3 rounded-1 bg-surface animate-pulse"></div>
      <div className="h-28 w-5xl mb-2 rounded-1 bg-surface animate-pulse"></div>
      <div className="h-7 w-sm rounded-1 bg-surface animate-pulse"></div>

      {/* Avaliable tables */}
      <div className="h-10 w-full rounded-1 mt-10 bg-surface animate-pulse"></div>

      {/* User's query editor */}
      <div className="w-full grid grid-cols-2 gap-4 mt-4">
        <div className="h-80 w-full rounded-1 bg-surface animate-pulse"></div>
        <div className="h-80 w-full rounded-1 bg-surface animate-pulse"></div>
      </div>
    </>
  );
}
