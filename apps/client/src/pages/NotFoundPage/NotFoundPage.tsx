import { useEffect } from "react";
import { Button } from "../../components";
import { APP_ROUTES } from "../../config/constants";
import { useLocation } from "react-router-dom";

export function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Squelch - Erro 404";
  }, []);

  return (
    <main className="w-full min-h-dvh flex items-center justify-center p-10">
      <div className="w-full max-w-5xl flex flex-row items-stretch gap-20 mb-30">
        {/* Text content */}
        <div className="max-w-xl">
          <h1
            className="text-5xl font-bold tracking-wide font-features-['smcp'] font-heading"
            aria-describedby="h1-desc"
          >
            ERRO 404
          </h1>
          <p
            className="text-3xl font-medium font-features-['smcp'] font-heading mb-10"
            id="h1-desc"
          >
            Página não encontrada
          </p>

          <p className="w-full text-lg/[1.5rem] text-tx-surface">
            Parece que a sua query não encontrou nada nos nossos banco de dados.
            Talvez alguma letra errada?
          </p>

          <Button to={APP_ROUTES.HOME} customClassName="mt-5">
            Voltar para o início
          </Button>
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
              <p>
                <span className="font-bold text-[#F6339A]">SELECT</span> titulo,
                conteudo <span className="font-bold text-[#F6339A]">FROM</span>{" "}
                pagina
              </p>
              <p>
                <span className="font-bold text-[#F6339A]">WHERE</span>{" "}
                codigo_status{" "}
                <span className="font-bold text-[#F6339A]">=</span>{" "}
                <span className="font-bold text-[#419AFA]">200</span>
              </p>
              <p>
                <span className="font-bold text-[#F6339A]">AND</span>{" "}
                caminho_url{" "}
                <span className="font-bold text-[#F6339A]">=</span>{" "}
                <span className="font-bold text-[#0DD124]">
                  '{location.pathname}'
                </span>
                ;
              </p>
              <br />
              <p className="text-[#6272A4]">
                -- Sua query não retornou nenhum dado.
                <br />
                -- Era realmente esse seu objetivo?
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
