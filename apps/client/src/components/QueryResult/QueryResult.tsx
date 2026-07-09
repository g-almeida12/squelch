import type { QueryResultDTO } from "@squelch/shared";

interface QueryResultProps {
  userQueryResult: QueryResultDTO;
  isPending?: boolean;
  isError?: boolean;
  height?: string;
}

export function QueryResult({
  userQueryResult,
  isPending=false,
  isError=false,
  height = "h-60",
}: QueryResultProps) {
  const rows = userQueryResult ?? [];
  const headers = Object.keys(rows[0] ?? {}).toSorted();
  const hasRows = rows.length > 0;

  return (
    <div
      className={`rounded-1 overflow-hidden flex flex-col bg-[#03070A] ${height}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Toolbar */}
      <div className="h-8 shrink-0 bg-gray-800 flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-4 bg-red-700 rounded-full"></span>
          <span className="size-4 bg-yellow-500 rounded-full"></span>
          <span className="size-4 bg-green-700 rounded-full"></span>
        </div>
        <span className="text-[12px] font-mono text-tx-overlay">
          {hasRows
            ? `${rows.length} linha${rows.length === 1 ? "" : "s"}`
            : isPending
              ? "Carregando..."
              : "0 linhas"}
        </span>
      </div>

      {/* Scrollable table area */}
      <div className="flex-1 overflow-scroll">
        {/* Fallback logic */}
        {(() => {
          if (isPending) {
            return (
              <div className="h-full flex items-center justify-center">
                <span className="p-1 text-center text-xs font-mono text-gray-500">
                  Executando query. Aguarde...
                </span>
              </div>
            );
          }

          if (isError) {
            return (
              <div className="h-full flex items-center justify-center">
                <span className="p-2 text-center text-xs font-mono text-gray-500">
                  Não foi possível extrair os dados.
                </span>
              </div>
            );
          }

          if (!hasRows) {
            return (
              <div className="h-full flex items-center justify-center">
                <span className="p-2 text-center text-xs font-mono text-gray-500">
                  Parece que sua query não encontrou nada...
                </span>
              </div>
            );
          }

          return (
            <table className="w-full border-separate border-spacing-0 text-left text-xs font-mono">
              <thead className="sticky top-0 bg-[#0A1014] z-10">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 border-b border-accent-primary font-semibold uppercase tracking-wide text-[11px] text-accent-primary whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-white/2" : "bg-transparent"
                    } hover:bg-emerald-400/6 transition-colors`}
                  >
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="px-4 py-1.5 text-gray-300 whitespace-nowrap border-b border-white/5"
                      >
                        {formatCell(row[header])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })()}
      </div>
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
