import type { SubmissionDTO } from "@squelch/shared";
import { useState } from "react";
import { SubmissionCard } from "..";

interface SubmissionCardListProps {
  userSubmissions: SubmissionDTO[] | undefined;
}

export function SubmissionCardList({
  userSubmissions,
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
      {userSubmissions.map((s) => (
        <SubmissionCard
          submission={s}
          isOpen={!!openGroups[s.id]}
          onToggle={() => toggleGroups(s.id)}
          key={s.id}
        />
      ))}
    </section>
  );
}

function SubmissionCardListSkeleton() {
  return <div></div>;
}
