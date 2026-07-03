import { MonacoEditor } from "../../../../components";

export function EditorPreview() {
  const defaultValue = `-- Clique aqui e tente modificar essa query!\nSELECT nome, habilidade \nFROM usuarios \nWHERE nivel = 'avançado'\nAND curiosidade = 'alta';`;

  return (
    <section className="flex items-center justify-center min-h-150">
      <div className="max-w-6xl m-auto flex flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-3xl/[3rem] font-medium mb-3 ">
            Seu primeiro{" "}
            <span className="bg-dark px-2 rounded-md text-pink-500">
              SELECT
            </span>{" "}
            começa aqui.
          </h2>
          <p className="text-[18px] max-w-[90%]">
            Experimente a interface do nosso editor ao lado e teste a sintaxe.
            Este é o painel onde suas queries serão estruturadas para cruzar
            dados e extrair as respostas ocultas de cada caso.
          </p>
        </div>

        <div className="flex-1 h-full">
          <MonacoEditor value={defaultValue} />
        </div>
      </div>
    </section>
  );
}
