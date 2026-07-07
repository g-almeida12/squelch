import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type UserRegister, UserRegisterSchema } from "@squelch/shared";
import { Button } from "../../components";
import { APP_ROUTES } from "../../config/constants";
import { useRegisterUser } from "../../features/auth/hooks/auth.mutations";
import { userQueryKeys } from "../../features/user/hooks/user.query-keys";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { RegisterForm } from "./RegisterForm";

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
        queryClient.setQueryData(userQueryKeys.profile(), registeredUser);
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
    <main className="min-h-dvh flex flex-row w-full p-0 bg-dark">
      {/* Text content */}
      <div className="w-full pb-8 pt-25 px-4 bg-main md:w-5/8 md:rounded-r-3xl md:pt-15">
        <div className="text-center">
          <h1 className="text-3xl">Crie sua conta</h1>
          <p className="max-w-md m-auto mb-4 text-tx-overlay">
            Venha resolver diversos enigmas que vão despertar seu lado
            investigador.
          </p>

          <RegisterForm
            register={register}
            errors={errors}
            handleFormSubmit={handleSubmit(handleRegisterSubmittion)}
          />

          <div className="mt-8">
            <p className="mb-2 text-tx-overlay">
              Já está registrado no Squelch?
            </p>
            <Button to={APP_ROUTES.LOGIN}>Acesse sua conta</Button>
          </div>
        </div>
      </div>

      {/* Visual content */}
      <div className="flex-1 absolute md:static md:bg-dark">
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
