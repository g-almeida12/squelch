import { type UserRegister } from "@squelch/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { MdEmail, MdAccountCircle } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { Input, Button } from "../../components";

type ExtendedUserRegister = UserRegister & {
  confirmPassword: string;
};

interface RegisterFormProps {
  register: UseFormRegister<ExtendedUserRegister>;
  handleFormSubmit: () => Promise<void>;
  errors: FieldErrors<ExtendedUserRegister>;
}

export function RegisterForm({
  register,
  handleFormSubmit,
  errors,
}: RegisterFormProps) {
  return (
    <form
      action="POST"
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-2 items-center max-w-lg m-auto mt-8"
      aria-describedby="error-root"
    >
      {errors.root?.message && (
        <p
          className="w-full max-w-md m-auto p-1 pl-2 rounded-md bg-dark text-left text-red-500 text-sm :"
          id="error-root"
          aria-live="assertive"
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
  );
}
