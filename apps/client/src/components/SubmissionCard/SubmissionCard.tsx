import { FaCaretUp } from "react-icons/fa";
import { MonacoEditor, QueryResult } from "..";
import type { SubmissionDTO } from "@squelch/shared";

interface SubmissionCardProps {
  submission: SubmissionDTO;
  isOpen: boolean;
  onToggle: () => void;
}

export function SubmissionCard({
  submission,
  isOpen,
  onToggle,
}: SubmissionCardProps) {
  return (
    <div className="overflow-hidden rounded-1">
      <div
        className={`flex flex-row items-start justify-between p-2 ${submission.success ? "bg-green-800" : "bg-red-700"}`}
      >
        <div>
          <p className="text-2xl font-semibold font-heading  [font-variant-caps:small-caps] tracking-wide">
            RESPOSTA {submission.success ? "CORRETA" : "ERRADA"}
          </p>
          <p className="font-heading font-semibold [font-variant-caps:small-caps]">
            Caso: {submission.challengeGroupTitle} - {submission.challengeTitle}
          </p>
        </div>

        <button
          onClick={onToggle}
          className="ml-auto pl-2 cursor-pointer"
          aria-label={`${isOpen ? "Fechar" : "Abrir"} submissão`}
          aria-expanded={isOpen}
          aria-controls={`list-${submission.id}`}
        >
          <FaCaretUp
            className={`${isOpen ? "rotate-0" : "rotate-180"}`}
            size={20}
            aria-hidden={true}
          />
        </button>
      </div>

      <div className="p-2 bg-dark">
        <p className="text-tx-overlay">
          Enviada em:{" "}
          {new Date(submission.date).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          às{" "}
          {new Date(submission.date).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {isOpen && (
          <div className="mt-8" id={`list-${submission.id}`}>
            <div className="flex flex-col gap-4 items-center justify-between sm:flex-row">
              <div className="flex-1 w-full">
                <p className="mb-2 text-xl">Sua query:</p>
                <MonacoEditor
                  readOnly
                  value={submission.submittedQuery}
                  height="h-60"
                />
              </div>
              <div className="flex-1 w-full">
                <p className="mb-2 text-xl">Sua resposta:</p>
                <QueryResult userQueryResult={submission.userQueryResult} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
