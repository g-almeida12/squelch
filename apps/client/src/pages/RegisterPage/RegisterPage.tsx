import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { MdEmail, MdAccountCircle } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { type UserRegister, UserRegisterSchema } from "@squelch/shared";
import { Button } from "../../components/Button";
import { ButtonLink, Input } from "../../components";
import { APP_ROUTES } from "../../config/constants";
import { Main } from "../../layout";
import { useRegisterUser } from "../../features/auth/hooks/mutations.hooks";
import { userQueryKeys } from "../../features/user/hooks/query-keys.user";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const ExtendedUserRegisterSchema = UserRegisterSchema.extend({
  confirmPassword: UserRegisterSchema.shape.password,
}).superRefine((data, ctx) => {
  if (!data) return;

  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "As senhas inseridas não são iguais.",
    });
  }
});
type ExtendedUserRegister = z.infer<typeof ExtendedUserRegisterSchema>;

export function RegisterPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<ExtendedUserRegister>({
    resolver: zodResolver(ExtendedUserRegisterSchema),
  });

  useEffect(() => {
    document.title = "Squelch - Registre-se";
  }, []);

  const handleRegisterSubmittion = (newUser: UserRegister) => {
    registerMutation.mutate(newUser, {
      onSuccess: (registeredUser) => {
        queryClient.setQueryData(userQueryKeys.USER, registeredUser);
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
          <h1 className="text-3xl">Crie sua conta</h1>
          <p className="max-w-md m-auto mb-4 text-tx-overlay">
            Venha resolver diversos enigmas que vão despertar seu lado
            investigador.
          </p>

          <form
            action="POST"
            onSubmit={handleSubmit(handleRegisterSubmittion)}
            className="flex flex-col gap-2 items-center max-w-lg m-auto"
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
              {...register("name")}
              id="name"
              label="Nome"
              type="text"
              Icon={MdAccountCircle}
              errorMessage={errors.name?.message}
            />
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
            <Input
              {...register("confirmPassword")}
              id="confirm-password"
              label="Confirme sua senha"
              type="password"
              Icon={PiPasswordFill}
              errorMessage={errors.confirmPassword?.message}
            />
            <Button type="submit" customClassName="mt-2">
              Vamos desvendar mistérios
            </Button>
          </form>

          <div className="mt-8">
            <p className="mb-2 text-tx-overlay">
              Já está registrado no Squelch?
            </p>
            <ButtonLink to={APP_ROUTES.LOGIN}>Acesse sua conta</ButtonLink>
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
