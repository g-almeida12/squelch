import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { type UserLogin, UserLoginSchema } from "@squelch/shared";
import { Button } from "../../components";
import { APP_ROUTES } from "../../config/constants";
import { useLoginUser } from "../../features/auth/hooks/auth.mutations";
import { userQueryKeys } from "../../features/user/hooks/user.query-keys";
import { LoginForm } from "./LoginForm";

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
    queryClient.clear();
  }, [queryClient]);

  const handleLoginSubmittion = (user: UserLogin) => {
    loginMutation.mutate(user, {
      onSuccess: (loggedUser) => {
        queryClient.setQueryData(userQueryKeys.USER, loggedUser);
        navigate(APP_ROUTES.HOME);
      },
      onError: (err) => {
        if (err.statusCode === 422) {
          setError("root", { message: "Email ou senha incorretos." });
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
    <main className="min-h-dvh flex flex-row w-full p-0 bg-dark">
      {/* Text content */}
      <div className="w-5/8 pb-8 pt-15 rounded-r-3xl bg-main">
        <div className="text-center">
          <h1 className="text-3xl">Conecte-se agora</h1>
          <p className="max-w-90 m-auto text-tx-overlay">
            Continue sua aventura para descobrir os mistérios por trás das
            consultas.
          </p>

          <LoginForm
            register={register}
            handleSubmit={handleSubmit(handleLoginSubmittion)}
            errors={errors}
          />

          <div className="mt-8">
            <p className="mb-2 text-tx-overlay">
              Ainda não está registrado no Squelch?
            </p>
            <Button to={APP_ROUTES.REGISTER}>Crie sua conta agora</Button>
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
    </main>
  );
}
