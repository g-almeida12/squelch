import heroImg from "../../../../assets/images/hero-img.webp";
import { Button } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";
import { HeroCard } from "./HeroCard";
import { Navbar } from "../Navbar";
import { HiWindow } from "react-icons/hi2";
import { MdExtension, MdOfflineBolt } from "react-icons/md";

export function Hero() {
  return (
    <section className="mb-50">
      <Navbar />

      {/* Text content and image container */}
      <div className="flex flex-col items-center justify-between max-w-5xl m-auto mt-16 lg:flex-row">
        <div className="max-w-md text-center">
          <h1 className="font-semibold tracking-wide text-4xl/[3rem]">
            Squelch: Resolva mistérios usando SQL
          </h1>
          <p className="text-tx-overlay mt-2">
            A plataforma interativa para praticar SQL de um jeito inovador e
            direto no seu navegador.
          </p>
          <div className="flex flex-col gap-2 w-fit m-auto mt-12">
            <Button to={APP_ROUTES.REGISTER}>Registre-se agora</Button>
            <Button
              to={APP_ROUTES.REGISTER}
              variant="ghost-primary"
              customClassName="sm:hidden"
            >
              Acesse nosso site
            </Button>
          </div>
        </div>

        <div className="items-center justify-end mt-12 hidden lg:flex lg:mt-0">
          <img
            src={heroImg}
            alt="Representação de uma estrutura de banco de dados"
            className="w-[80%]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Cards container */}
      <div className="flex flex-col gap-2 justify-center items-center max-w-6xl m-auto mt-30 md:flex-row md:gap-4 md:items-stretch">
        <HeroCard Icon={HiWindow} title="Editor Integrado">
          <p>
            Escreva suas queries no mesmo editor usado pelos profissionais. Aqui
            você não fica só na teoria: executa o código, vê a tabela de
            resultados e valida seu conhecimento na hora.
          </p>
        </HeroCard>
        <HeroCard Icon={MdExtension} title="Desvende mistérios">
          <p>
            Comece do SELECT * até as queries mais complexas. Resolva desafios
            através de exercícios criados para fixar a sintaxe e a lógica de
            forma instintiva.
          </p>
        </HeroCard>
        <HeroCard Icon={MdOfflineBolt} title="Iniciante ao avançado">
          <p>
            Cansou do básico? Nosso site começa do fácil até os níveis mais
            difíceis. Problemas complexos feitos sob medida para quem adora
            achar a solução pelo puro prazer de ver o código rodar.
          </p>
        </HeroCard>
      </div>
    </section>
  );
}
