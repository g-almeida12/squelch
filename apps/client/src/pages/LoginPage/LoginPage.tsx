import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { type UserLogin, UserLoginSchema } from "@squelch/shared";
import { Button } from "../../components/Button";
import { ButtonLink, Input } from "../../components";
import { APP_ROUTES } from "../../config/constants";
import { Main } from "../../layout";
import { useLoginUser } from "../../services/auth/hooks/mutations.hook";
import { userQueryKeys } from "../../services/user/hooks/query-keys.user";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function LoginPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loginMutation = useLoginUser();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  useEffect(() => {
    document.title = "Squelch - Registre-se";
  }, []);

  const handleLoginSubmittion = (user: UserLogin) => {
    loginMutation.mutate(user, {
      onSuccess: (loggedUser) => {
        queryClient.setQueryData(userQueryKeys.USER, loggedUser);
        navigate(APP_ROUTES.HOME);
      },
      onError: (err) => {
        if (err.statusCode === 409) {
          setError("root", { message: "Email já cadastrado." });
          return;
        }

        setError("root", {
          message:
            "Ah, não! Não conseguimos te cadastrar. Que tal tentar novamente?",
        });
      },
    });
  };

  return (
    <Main customClassName="flex flex-row w-full p-0 bg-dark">
      {/* Text content */}
      <div className="w-5/8 pb-8 pt-15 rounded-r-3xl bg-main">
        <div className="text-center">
          <h1 className="text-3xl">Conecte-se agora</h1>
          <p className="max-w-90 m-auto text-tx-overlay">
            Continue sua aventura para descobrir os mistérios por trás das consultas.
          </p>

          <form
            action="POST"
            onSubmit={handleSubmit(handleLoginSubmittion)}
            className="flex flex-col gap-2 items-center max-w-lg m-auto mt-8"
            aria-describedby="error-root"
          >
            {errors.root?.message && (
              <p
                className="w-full max-w-md m-auto p-1 pl-2 rounded-md bg-dark text-left text-red-500 text-sm :"
                id="error-root"
              >
                {errors.root.message}
              </p>
            )}

            <Input
              {...register("email")}
              id="email"
              label="Email"
              type="email"
              Icon={MdEmail}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("password")}
              id="password"
              label="Senha"
              type="password"
              Icon={PiPasswordFill}
              errorMessage={errors.password?.message}
            />
            <Button type="submit" customClassName="mt-2">
              Volte a resolver mistérios
            </Button>
          </form>

          <div className="mt-8">
            <p className="mb-2 text-tx-overlay">
              Ainda não está registrado no Squelch?
            </p>
            <ButtonLink to={APP_ROUTES.REGISTER}>
              Crie sua conta agora
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Visual content */}
      <div className="bg-dark flex-1">
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
      </div>
    </Main>
  );
}
