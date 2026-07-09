import { useEffect, useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import { useRunQuery } from "../../../../features/submission/hooks/submission.mutations";

type AvaliableTables = {
  tableName: string;
  properties: Record<string, string>;
}[];

interface AvaliableTablesProps {
  challengeId: number | undefined;
}

export function AvaliableTables({ challengeId }: AvaliableTablesProps) {
  const { mutate: runQueryMutation } = useRunQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [avaliableTables, setAvaliableTables] = useState<AvaliableTables>([]);

  useEffect(() => {
    if (!challengeId) {
      return;
    }

    const query = `SELECT name, sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite%'`;
    runQueryMutation(
      { id: challengeId, submittedQuery: query },
      {
        onSuccess: (queryResult) => {
          setAvaliableTables(
            formatAvaliableTables(
              queryResult as unknown as { name: string; sql: string }[],
            ),
          );
        },
      },
    );
  }, [challengeId, runQueryMutation]);

  return (
    <div className="p-2 rounded-1 bg-surface">
      {/* Toggle button */}
      <div className="flex flex-row items-center justify-start gap-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer"
          aria-label={`${isOpen ? "Fechar" : "Abrir"} tabelas disponíveis`}
          aria-expanded={isOpen}
          aria-controls={`avaliable-tables`}
        >
          <FaCaretUp
            className={`text-tx-main ${isOpen ? "rotate-0" : "rotate-180"}`}
            size={24}
            aria-hidden={true}
          />
        </button>

        <p className="font-medium">Tabelas disponíveis</p>
      </div>

      {/* Avaliable tables */}
      {isOpen &&
        (avaliableTables.length === 0 ? (
          <TablesSkeleton />
        ) : (
          <div className="flex flex-col gap-2 mt-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {avaliableTables.map(({ tableName, properties }) => (
              <div
                className="overflow-hidden rounded-md bg-[#2c384a]"
                key={tableName}
              >
                <h4 className="px-2 py-1 text-lg font-semibold font-heading [font-variant-caps:small-caps]">
                  {tableName}
                </h4>
                <hr className="text-subtle" />
                <ul className="list-none text-tx-overlay">
                  {Object.entries(properties).map(([key, value], rowIndex) => (
                    <li
                      className={`px-2 py-1 ${rowIndex % 2 === 0 ? "bg-white/6" : "bg-transparent"}`}
                      key={rowIndex}
                    >
                      <span>{key}</span> <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

function TablesSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          className="h-50 w-full rounded-md bg-[#2c384a] animate-pulse"
          key={idx}
        ></div>
      ))}
    </div>
  );
}

const formatAvaliableTables = (
  queryResult: { name: string; sql: string }[],
): AvaliableTables => {
  const avaliableTables: AvaliableTables = [];

  for (const table of queryResult) {
    // Take only the properties of the sql query
    // Ex: "CREATE TABLE pessoas (id INTEGER, nome TEXT)" -> "id INTEGER, nome TEXT"
    const match = table.sql.match(/\(([\s\S]*)\)/);
    if (!match) continue;

    const rows = match[1].split(",");
    const properties: Record<string, string> = {};

    for (const row of rows) {
      const cleanRow = row.trim();

      if (
        !cleanRow ||
        cleanRow.toUpperCase().startsWith("FOREIGN KEY") ||
        cleanRow.toUpperCase().startsWith("PRIMARY KEY (") ||
        cleanRow.toUpperCase().startsWith("UNIQUE") ||
        cleanRow.toUpperCase().startsWith("CHECK")
      ) {
        continue;
      }

      // Get the property name and type
      const firstSpaceIdx = cleanRow.indexOf(" ");
      if (firstSpaceIdx === -1) {
        properties[cleanRow] = "ANY";
        continue;
      }
      const columnName = cleanRow.slice(0, firstSpaceIdx).trim();
      const columnType = cleanRow.slice(firstSpaceIdx + 1).trim();

      const sanitizedColumnName = columnName.replace(/[`"']/g, "");
      properties[sanitizedColumnName] = columnType;
    }

    avaliableTables.push({ tableName: table.name, properties });
  }

  return avaliableTables;
};
