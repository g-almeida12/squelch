import heroImg from "../../../../assets/hero-img.png";
import { ButtonLink } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";
import { HeroCard } from "../HeroCard/HeroCard";
import { Navbar } from "../Navbar/Navbar";
import { HiWindow } from "react-icons/hi2";
import { BsFillMortarboardFill } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";

export function Hero() {
  return (
    <section className="mb-50">
      <Navbar />

      {/* Text content and image container */}
      <div className="flex flex-row items-center justify-between max-w-5xl m-auto mt-16">
        <div className="max-w-md">
          <h1 className="font-semibold tracking-wide text-4xl/[3rem]">
            Squelch: Resolva mistérios usando SQL
          </h1>
          <p className="text-tx-overlay mt-2">
            A plataforma interativa para praticar SQL de um jeito inovador e
            direto no seu navegador.
          </p>
          <ButtonLink to={APP_ROUTES.REGISTER} customClassName="mt-12">
            Registre-se agora
          </ButtonLink>
        </div>

        <div className="flex items-center justify-end">
          <img
            src={heroImg}
            alt="Representação de uma estrutura de banco de dados"
            className="w-[80%]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Cards container */}
      <div className="flex flex-row gap-4 justify-center max-w-6xl m-auto mt-30 ">
        <HeroCard Icon={HiWindow} title="Editor Integrado">
          <p>
            Escreva suas queries no mesmo editor usado pelos profissionais. Aqui
            você não fica só na teoria: executa o código, vê a tabela de
            resultados e valida seu conhecimento na hora.
          </p>
        </HeroCard>
        <HeroCard Icon={BsFillMortarboardFill} title="Aprenda facilmente">
          <p>
            Comece do SELECT * até as queries mais complexas. Resolva desafios
            através de exercícios criados para fixar a sintaxe e a lógica de
            forma instintiva.
          </p>
        </HeroCard>
        <HeroCard Icon={BsGraphUpArrow} title="Evolua suas técnicas">
          <p>
            Um ambiente seguro para testar qualquer comando. Nossa validação
            inteligente ajuda você a encontrar o erro e entender como chegar na
            solução ideal de forma descontraída.
          </p>
        </HeroCard>
      </div>
    </section>
  );
}
