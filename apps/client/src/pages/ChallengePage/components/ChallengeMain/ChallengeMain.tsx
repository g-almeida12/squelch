import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { QueryResultDTO, SubmissionValidationDTO } from "@squelch/shared";
import { Button, MonacoEditor, QueryResult } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";
import { useGetChallenge } from "../../../../features/challenge/hooks/challenges.queries";
import {
  useRunQuery,
  useValidateQuery,
} from "../../../../features/submission/submission.mutations";
import { useState } from "react";

type SubmissionResult = {
  success: boolean;
  errorMessages: SubmissionValidationDTO["errorMessages"];
} | null;

export function ChallengeMain() {
  const [userQueryResult, setUserQueryResult] = useState<QueryResultDTO>([]);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult>(null);
  const { challengeId } = useParams<Record<string, string>>();
  const { data: challenge } = useGetChallenge(Number(challengeId));
  const runQueryMutation = useRunQuery();
  const validateQueryMutation = useValidateQuery();

  if (!challenge) {
    return <ChallengeMainSkeleton />;
  }

  const handleRunQuery = async (submittedQuery: string) => {
    if (!submittedQuery) return;

    runQueryMutation.mutate(
      { id: Number(challengeId!), submittedQuery },
      {
        onSuccess: (queryResult) => setUserQueryResult(queryResult),
      },
    );
  };

  const handleValidateQuery = async (submittedQuery: string) => {
    if (!submittedQuery) return;

    const date = new Date();
    validateQueryMutation.mutate(
      { id: Number(challengeId!), submission: { submittedQuery, date } },
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
      <Button to={APP_ROUTES.HOME} variant="ghost-primary">
        Página principal
      </Button>
      <p className="mt-10 text-2xl font-semibold font-heading tracking-wider">
        {challenge.groupTitle} - {challenge.title}
      </p>
      <div className="prose prose-invert text-[17px] max-w-5xl mt-2">
        <ReactMarkdown>{challenge.markdown}</ReactMarkdown>
      </div>
      <div className="w-full grid grid-cols-2 gap-4 mt-4">
        <div className="flex-1">
          <MonacoEditor
            forSubmission
            onTestClick={handleRunQuery}
            onValidateClick={handleValidateQuery}
          />
        </div>
        <div className="flex-1">
          <QueryResult userQueryResult={userQueryResult} height="h-80" />
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {submissionResult?.success === true ? (
          <div className="mt-8">
            <h2 className="p-2 rounded-1 bg-green-600 text-2xl font-heading font-semibold">
              Resposta Correta!
            </h2>
            <p className="pl-2 mt-2 text-lg text-tx-overlay">
              Parabéns! Você está cada vez mais próximo de desvendar o mistério.
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
      </div>
    </>
  );
}

function ChallengeMainSkeleton() {
  return <div></div>;
}
