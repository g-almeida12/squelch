import type { SubmissionDTO } from "@squelch/shared";
import { useState } from "react";
import { SubmissionCard } from "..";

interface SubmissionCardListProps {
  userSubmissions: SubmissionDTO[] | undefined;
  isFetching: boolean;
  isError: boolean;
}

export function SubmissionCardList({
  userSubmissions,
  isFetching,
  isError,
}: SubmissionCardListProps) {
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({});

  const toggleGroups = (id: number) => {
    if (!userSubmissions) {
      return;
    }

    const newValues: Record<number, boolean> = {};
    for (let i = 0; i < (userSubmissions ?? []).length; i++) {
      newValues[userSubmissions[i]["id"]] = false;
    }
    setOpenGroups((prev) => ({ ...newValues, [id]: !prev[id] }));
  };

  if (!userSubmissions) {
    return (
      <section className="mt-8">
        <SubmissionCardListSkeleton />
      </section>
    );
  }

  if (userSubmissions?.length === 0) {
    return (
      <section className="mt-8">
        <p className="text-tx-overlay">Está tão vazio aqui...</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2 mt-8">

      {/* Fallback logic */}
      {(() => {
        if (isFetching) {
          return <SubmissionCardListSkeleton />;
        }

        if (isError) {
          return (
            <p className="text-tx-overlay">
              Não foi possível carregar as submissões.
            </p>
          );
        }

        return userSubmissions.map((s) => (
          <SubmissionCard
            submission={s}
            isOpen={!!openGroups[s.id]}
            onToggle={() => toggleGroups(s.id)}
            key={s.id}
          />
        ));
      })()}
    </section>
  );
}

function SubmissionCardListSkeleton() {
  return Array.from({ length: 4 }).map((_, idx) => (
    <div
      className="relative w-full h-28 rounded-1 p-2 bg-surface animate-pulse"
      key={idx}
    >
      <span className="block w-70 h-7 rounded-1 bg-overlay animate-pulse"></span>
      <span className="block w-90 h-5 mt-2 rounded-md bg-overlay animate-pulse"></span>
      <span className="absolute bottom-2 block w-60 h-5 rounded-md bg-overlay animate-pulse"></span>
    </div>
  ));
}
