import { useParams } from "react-router-dom";
import { Button, SubmissionCardList } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";
import { useGetChallengeSubmissions } from "../../../../features/submission/submission.queries";

export function HistoryMain() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { data: challengeSubmissions } = useGetChallengeSubmissions(
    Number(challengeId!),
  );

  return (
    <section>
      <Button to={APP_ROUTES.HOME} variant="ghost-primary">
        Página principal
      </Button>
      <h2 className="mt-10 text-2xl font-semibold font-heading tracking-wider">
        Últimas submissões
      </h2>

      <SubmissionCardList userSubmissions={challengeSubmissions} />
    </section>
  );
}
