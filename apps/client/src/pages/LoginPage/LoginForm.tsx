import type { UserLogin } from "@squelch/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { Input, Button } from "../../components";

interface LoginFormProps {
  register: UseFormRegister<UserLogin>;
  handleSubmit: () => Promise<void>
  errors: FieldErrors<UserLogin>;
}

export function LoginForm({ register, handleSubmit, errors }: LoginFormProps) {
  return (
    <form
      action="POST"
      onSubmit={handleSubmit}
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
  );
}
