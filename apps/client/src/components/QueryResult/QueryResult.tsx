import type { QueryResultDTO } from "@squelch/shared";

interface QueryResultProps {
  userQueryResult: QueryResultDTO;
}

export function QueryResult({ userQueryResult }: QueryResultProps) {
  const rows = userQueryResult ?? [];
  const headers = Object.keys(rows[0] ?? {}).toSorted();
  const hasRows = rows.length > 0;

  return (
    <div className="bg-[#03070A] rounded-1 overflow-hidden h-60 flex flex-col border border-white/5">
      {/* Toolbar */}
      <div className="h-8 shrink-0 bg-gray-800 flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-1.5">
          <span className="size-4 bg-red-700 rounded-full"></span>
          <span className="size-4 bg-yellow-500 rounded-full"></span>
          <span className="size-4 bg-green-700 rounded-full"></span>
        </div>
        <span className="text-[12px] font-mono text-gray-400">
          {hasRows
            ? `${rows.length} row${rows.length === 1 ? "" : "s"}`
            : "no rows"}
        </span>
      </div>

      {/* Scrollable table area */}
      <div className="flex-1 overflow-auto">
        {hasRows ? (
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
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs font-mono text-gray-500">
              Parece que sua query não encontrou nada...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
