import type { SubmissionDTO } from "@squelch/shared";

interface SubmissionsInfoProps {
  userSubmissions: SubmissionDTO[] | undefined;
}

export function SubmissionsInfo({ userSubmissions }: SubmissionsInfoProps) {
  if (!userSubmissions) {
    return <SubmissionsInfoSkeleton />;
  }

  const successQuant = userSubmissions?.filter((s) => s.success).length;
  const failureQuant = userSubmissions.length - successQuant;

  return (
    <section className="w-full mt-4">
      <div className="w-full max-w-4xl py-2 rounded-1 bg-surface">
        <p className="pl-4 text-lg text-tx-overlay">
          Submissões totais: {userSubmissions.length}
        </p>

        <div className="relative flex flex-row items-center justify-between mt-4">
          <div className="flex flex-col gap-2 items-start justify-center flex-1 h-15 px-4">
            <p className="text-xl">Envios corretas: {successQuant}</p>
            <div className="relative w-full h-1.5 rounded-full bg-subtle">
              <span
                className={`absolute block left-0 top-0 bottom-0 rounded-full bg-green-500`}
                style={{
                  width: `${Number(successQuant / (userSubmissions.length || 1)) * 100}%`,
                }}
              ></span>
            </div>
          </div>

          <span className="absolute left-1/2 translate-x-1/2 h-full w-px bg-subtle"></span>

          <div className="flex flex-col gap-2 items-start justify-center flex-1 h-15 px-4">
            <p className="text-xl">Envios errados: {failureQuant}</p>
            <div className="relative w-full h-1.5 rounded-full bg-subtle">
              <span
                className={`absolute block left-0 top-0 bottom-0 rounded-full bg-red-500`}
                style={{
                  width: `${Number(failureQuant / (userSubmissions.length || 1)) * 100}%`,
                }}
              ></span>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-5 text-subtle" />
    </section>
  );
}

function SubmissionsInfoSkeleton() {
  return <div></div>;
}
