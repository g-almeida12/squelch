import { MonacoEditor } from "../../../../components";

export function EditorPreview() {
  const defaultValue = `-- Clique aqui e tente modificar essa query!\nSELECT nome, habilidade \nFROM usuarios \nWHERE nivel = 'avançado'\nAND curiosidade = 'alta';`;

  return (
    <section className="flex flex-row items-center justify-center min-h-150 mb-25 lg:mb-0">
      <div className="m-auto flex flex-col gap-4 max-w-2xl lg:max-w-6xl lg:flex-row">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl/[2.5rem] font-medium mb-3y">
            Seu primeiro{" "}
            <span className="bg-dark px-2 rounded-md text-pink-500">
              SELECT
            </span>{" "}
            começa aqui.
          </h2>
          <p className="text-[18px] max-w-[90%] mx-auto lg:max-w-full">
            Experimente a interface do nosso editor ao lado e teste a sintaxe.
            Este é o painel onde suas queries serão estruturadas para cruzar
            dados e extrair as respostas ocultas de cada caso.
          </p>
        </div>

        {/* Editor */}
        <div className="flex-1 h-full">
          <MonacoEditor value={defaultValue} />
        </div>
      </div>
    </section>
  );
}
