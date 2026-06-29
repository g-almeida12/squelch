import type { SubmissionDTO } from "@squelch/shared";
import { useGetUserSubmissions } from "../../../../features/submission/submission.queries";

export function UserSubmissionCards() {
  const { data: userSubmissions } = useGetUserSubmissions();

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-[21px] font-medium">Suas últimas submissões</h2>
      <div className="grid grid-cols-3 gap-2 w-full max-w-7xl m-auto">
        {userSubmissions === undefined ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SubmissionCard key={index} />
          ))
        ) : userSubmissions.length === 0 ? (
          <p>Você ainda não fez submissões.</p>
        ) : (
          userSubmissions.map((s) => <SubmissionCard key={s.id} {...s} />)
        )}
      </div>
    </section>
  );
}

function SubmissionCard(submission: Partial<SubmissionDTO>) {
  return (
    <div
      className={`flex flex-col w-full max-w-md min-w-72 rounded-1 p-2 select-none ${submission.success ? "bg-[#0e5c0f]" : "bg-[#7a0a0a]"}`}
    >
      <h3 className="text-[17px] font-medium">
        {submission.challengeGroupTitle} - {submission.challengeTitle}
      </h3>
      <hr className="mb-3" />

      <p className="-mb-1">Status: {submission.success ? "sucesso" : "falha"}</p>
      <p>
        Horário:{" "}
        {new Date(submission.date!).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
