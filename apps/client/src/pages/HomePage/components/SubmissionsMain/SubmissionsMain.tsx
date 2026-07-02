import { useGetUserSubmissions } from "../../../../features/submission/submission.queries";
import { SubmissionCards } from "../SubmissionCards";
import { SubmissionsInfo } from "../SubmissionsInfo";

export function SubmissionsMain() {
  const { data: userSubmissions } = useGetUserSubmissions();

  return (
    <>
      <h1 className="mt-4 text-[25px] font-heading font-semibold tracking-wide">
        Seus dados das submissões
      </h1>

      <SubmissionsInfo userSubmissions={userSubmissions} />

      <SubmissionCards userSubmissions={userSubmissions} />
    </>
  );
}
