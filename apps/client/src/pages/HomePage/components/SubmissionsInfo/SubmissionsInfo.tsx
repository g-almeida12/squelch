import type { SubmissionDTO } from "@squelch/shared";

interface SubmissionsInfoProps {
  userSubmissions: SubmissionDTO[] | undefined;
  isFetching: boolean;
  isError: boolean;
}

export function SubmissionsInfo({
  userSubmissions,
  isFetching,
  isError,
}: SubmissionsInfoProps) {
  return (
    <section className="w-full mt-4">
      <div
        className={`w-full max-w-4xl py-2 rounded-1 bg-surface ${isFetching ? "animate-pulse" : ""}`}
      >
        {/* Fallback logic */}
        {(() => {
          if (isFetching) {
            return <SubmissionsInfoSkeleton />;
          }

          if (isError) {
            return (
              <p className="h-26 px-2 text-tx-overlay">
                Não foi possível carregar as informações das suas submissões.
              </p>
            );
          }

          const successQuant = userSubmissions?.filter((s) => s.success).length;
          const failureQuant = userSubmissions!.length - successQuant!;

          return (
            <>
              <p className="pl-4 text-tx-overlay sm:text-lg">
                Submissões totais: {userSubmissions!.length}
              </p>

              <div className="relative flex flex-col gap-3 items-center justify-between mt-4 sm:flex-row sm:gap-0">
                {/* Correct attempts */}
                <div className="flex flex-col gap-0.5 items-start justify-center flex-1 w-full h-15 px-4 sm:w-fit sm:gap-2">
                  <p className="text-xl">Envios corretos: {successQuant}</p>
                  <div className="relative w-full h-1.5 rounded-full bg-subtle">
                    <span
                      className={`absolute block left-0 top-0 bottom-0 rounded-full bg-green-500`}
                      style={{
                        width: `${Number(successQuant! / (userSubmissions!.length || 1)) * 100}%`,
                      }}
                    ></span>
                  </div>
                </div>

                <span className="hidden absolute left-1/2 translate-x-1/2 h-full w-px bg-subtle sm:block"></span>

                {/* Wrong attempts */}
                <div className="flex flex-col gap-0.5 items-start justify-center flex-1 w-full h-15 px-4 sm:w-fit sm:gap-2">
                  <p className="text-xl">Envios errados: {failureQuant}</p>
                  <div className="relative w-full h-1.5 rounded-full bg-subtle">
                    <span
                      className={`absolute block left-0 top-0 bottom-0 rounded-full bg-red-500`}
                      style={{
                        width: `${Number(failureQuant / (userSubmissions!.length || 1)) * 100}%`,
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <hr className="mt-5 text-subtle" />
    </section>
  );
}

function SubmissionsInfoSkeleton() {
  return (
    <div className="h-26 px-2">
      {/* Title */}
      <span className="block w-60 h-6 rounded-md bg-overlay animate-pulse"></span>
      <div>
        <div className="relative flex flex-row items-start justify-between mt-4">
          {/* Attempts */}
          <div className="flex flex-col justify-end flex-1 h-15 mr-8">
            <span className="block w-full max-w-70 h-7 mb-2 rounded-1 bg-overlay animate-pulse"></span>
            <div className="w-full h-1.5 rounded-full bg-overlay animate-pulse"></div>
          </div>

          <span className="absolute left-1/2 translate-x-1/2 h-full w-px bg-overlay"></span>

          {/* Attempts */}
          <div className="flex flex-col justify-end flex-1 h-15">
            <span className="block w-full max-w-70 h-7 mb-2 rounded-1 bg-overlay animate-pulse"></span>
            <div className="w-full h-1.5 rounded-full bg-overlay animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
