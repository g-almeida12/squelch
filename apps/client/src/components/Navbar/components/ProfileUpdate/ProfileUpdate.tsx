import { FocusScope } from "@radix-ui/react-focus-scope";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdEmail, MdAccountCircle } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  UserUpdateSchema,
  type UserDTO,
  type UserUpdate,
} from "@squelch/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input, Button } from "../../..";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../../../../features/user/hooks/user.mutations";
import { userQueryKeys } from "../../../../features/user/hooks/user.query-keys";

interface ProfileUpdateProps {
  user: UserDTO | undefined;
  isFetching: boolean;
  onClose: () => void;
}

export function ProfileUpdate({
  user,
  isFetching,
  onClose,
}: ProfileUpdateProps) {
  const queryClient = useQueryClient();
  const updateMutation = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserUpdate>({
    resolver: zodResolver(UserUpdateSchema),
    values: user,
    resetOptions: { keepDirtyValues: true },
  });

  useEffect(() => {
    const timeoutId = setTimeout(
      () => document.getElementById("user-profile-update-close-btn")?.focus(),
      100,
    );

    return () => clearTimeout(timeoutId);
  }, []);

  const handleFormSubmit = (user: UserUpdate) => {
    updateMutation.mutate(user, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: userQueryKeys.USER });
        onClose();
      },
      onError: (err) => {
        if (err.statusCode === 409) {
          setError("root", { message: "Email já cadastrado." });
          return;
        }

        setError("root", { message: "Erro ao tentar atualizar informações." });
      },
    });
  };

  return (
    <>
      <FocusScope trapped={true} loop={true} asChild>
        <div
          className={`transition-all w-80 p-2 fixed z-301 top-0 bottom-0 bg-surface right-0 `}
        >
          <button
            onClick={onClose}
            className="cursor-pointer -ml-2"
            aria-label="Voltar para configurações do usuário"
            id="user-profile-update-close-btn"
          >
            <IoIosArrowRoundBack
              size={40}
              className="text-tx-main"
              aria-hidden={true}
            />
          </button>

          <h2 className="text-xl mt-8">Atualizar informações de usuário</h2>
          <hr className="mb-4 mt-2" />

          <form
            method="PATCH"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-2 items-center w-full"
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
              label="Novo nome"
              type="text"
              Icon={MdAccountCircle}
              errorMessage={errors.name?.message}
              disabled={isFetching}
            />

            <Input
              {...register("email")}
              id="email"
              label="Novo email"
              type="email"
              Icon={MdEmail}
              errorMessage={errors.email?.message}
              disabled={isFetching}
            />

            <Button
              type="submit"
              customClassName="w-full max-w-full mt-5"
              disabled={isFetching}
            >
              Atualizar informações
            </Button>
          </form>
        </div>
      </FocusScope>
      <div
        onClick={onClose}
        className="fixed z-300 left-0 right-0 bottom-0 top-0"
      ></div>
    </>
  );
}
