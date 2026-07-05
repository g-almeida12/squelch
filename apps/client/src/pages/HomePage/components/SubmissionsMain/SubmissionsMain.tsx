import { useGetUserSubmissions } from "../../../../features/submission/submission.queries";
import { SubmissionCardList } from "../../../../components/SubmissionCardList";
import { SubmissionsInfo } from "../SubmissionsInfo";

export function SubmissionsMain() {
  const {
    data: userSubmissions,
    isFetching,
    isError,
  } = useGetUserSubmissions();

  return (
    <>
      <h1 className="mt-4 text-[25px] font-heading font-semibold tracking-wide">
        Seus dados das submissões
      </h1>

      <SubmissionsInfo
        userSubmissions={userSubmissions}
        isFetching={isFetching}
        isError={isError}
      />

      <SubmissionCardList
        userSubmissions={userSubmissions}
        isFetching={isFetching}
        isError={isError}
      />
    </>
  );
}
