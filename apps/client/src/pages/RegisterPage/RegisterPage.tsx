import { useEffect } from "react";
import { MdEmail, MdAccountCircle } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { Button } from "../../components/Button";
import { ButtonLink, Input } from "../../components";
import { APP_ROUTES } from "../../config/constants";
import { Main } from "../../layout/Main/Main";

export function RegisterPage() {
  useEffect(() => {
    document.title = "Squelch - Registre-se";
  }, []);

  return (
    <Main customClassName="flex flex-row w-full p-0">
      {/* Text content */}
      <div className="w-5/8">
        <div className="flex flex-row gap-1 items-center justify-start p-4">
          <div
            className="size-11 rounded-full bg-accent-primary flex justify-center items-center  select-none"
            aria-label="Voltar para página inicial"
          >
            <div
              className="text-tx-contrast relative -top-px h-4 flex justify-center items-center font-bold font-heading"
              aria-hidden="true"
            >
              SQL
            </div>
          </div>

          <span className="font-heading font-medium text-xl text-accent-primary select-none">
            Squelch
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-3xl">Crie sua conta</h1>
          <p className="max-w-md m-auto mb-4 text-tx-overlay">
            Venha resolver diversos enigmas que vão despertar seu lado investigador.
          </p>

          <form action="" className="flex flex-col gap-2 items-center max-w-lg m-auto">
            <Input id="name" label="Nome" type="text" Icon={MdAccountCircle} />
            <Input id="email" label="Email" type="email" Icon={MdEmail} />
            <Input
              id="password"
              label="Senha"
              type="password"
              Icon={PiPasswordFill}
            />
            <Input
              id="confirm-password"
              label="Confirme sua senha"
              type="password"
              Icon={PiPasswordFill}
            />
            <Button onClick={() => {}} customClassName="mt-2">Vamos desvendar mistérios</Button>
          </form>

          <div className="mt-8">
            <p className="mb-2 text-tx-overlay">Já está registrado no Squelch?</p>
            <ButtonLink to={APP_ROUTES.LOGIN}>Acesse sua conta</ButtonLink>
          </div>
        </div>
      </div>

      {/* Visual content */}
      <div className="bg-accent-primary flex-1"></div>
    </Main>
  );
}
