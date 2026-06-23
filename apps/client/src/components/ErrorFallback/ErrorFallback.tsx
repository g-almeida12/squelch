import { APP_ROUTES } from "../../config/constants";
import { Button } from "../";

interface ErrorFallbackProps {
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <main className="w-full min-h-dvh flex items-center justify-center p-10">
      <div className="w-full max-w-5xl flex flex-row items-stretch gap-20 mb-30">
        {/* Text content */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold tracking-wide font-features-['smcp'] font-heading" aria-describedby="h2-desc">
            ERRO 500
          </h2>
          <p className="text-3xl font-medium font-features-['smcp'] font-heading mb-5" id="h2-desc">
            Algo inesperado aconteceu.
          </p>

          <p className="w-full text-lg/[1.5rem] text-tx-surface">
            Ah, não! Parece que nossa query não foi tão bem estruturada assim.
            Que tal recarregar a página ou voltar para a página inicial?
          </p>

          <div className="flex flex-row gap-2 w-fit mt-5">
            <Button onClick={resetErrorBoundary}>Tentar novamente</Button>
            <Button to={APP_ROUTES.HOME} variant="ghost-primary">
              Voltar para o início
            </Button>
          </div>
        </div>

        {/* Editor content */}
        <div className="w-full max-w-md flex flex-col">
          <div className="w-full flex-1 rounded-1 overflow-hidden flex flex-col">
            <div className="h-8 bg-gray-800 flex items-center justify-start shrink-0 gap-2 px-4">
              <span className="size-4 bg-red-700 rounded-full"></span>
              <span className="size-4 bg-yellow-500 rounded-full"></span>
              <span className="size-4 bg-green-700 rounded-full"></span>
            </div>

            <div className="flex-1 bg-[#060C14] p-4 font-mono text-sm text-[#F8F8F2] w-full text-left select-none">
              <p className="text-red-400">-- ERRO: execução da query falhou</p>
              <br />
              <p>
                <span className="font-bold text-[#F6339A]">SELECT</span> titulo,
                conteudo <span className="font-bold text-[#F6339A]">FROM</span>{" "}
                pagina
              </p>
              <p>
                <span className="text-red-400">WERE</span> codigo_status{" "}
                <span className="font-bold text-[#F6339A]">=</span>{" "}
                <span className="font-bold text-[#419AFA]">200</span>;
              </p>
              <p className="text-zinc-500">^ você quis dizer WHERE?</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
