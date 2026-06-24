import { FocusScope } from "@radix-ui/react-focus-scope";
import { useGetUser } from "../../features/user/hooks/queries.hooks";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdEmail, MdAccountCircle } from "react-icons/md";
import { useUpdateUser } from "../../features/user/hooks/mutations.hooks";
import { useForm } from "react-hook-form";
import { UserUpdateSchema, type UserUpdate } from "@squelch/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "../../features/user/hooks/query-keys.user";

interface ProfileUpdateProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function ProfileUpdate({ handleClose, isOpen }: ProfileUpdateProps) {
  const queryClient = useQueryClient();
  const { data: user, isFetching } = useGetUser();
  const updateMutation = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<UserUpdate>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: { name: undefined, email: undefined, password: undefined },
  });

  useEffect(() => {
    let timeoutId: number | undefined;
    if (isOpen) {
      timeoutId = setTimeout(() =>
        document.getElementById("user-profile-update-close-btn")?.focus(),
      );
    }
    if (isOpen && user) {
      reset({ name: user.name, email: user.email });
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, user, reset]);

  const handleFormSubmit = (user: UserUpdate) => {
    updateMutation.mutate(user, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: userQueryKeys.USER });
        handleClose();
      },
      onError: (err) => {
        if (err.statusCode === 409) {
          setError('root', { message: "Email já cadastrado." });
          return; 
        }
        
        setError("root", { message: "Erro ao tentar atualizar informações." });
      },
    });
  };

  return (
    <FocusScope trapped={isOpen} loop={isOpen} asChild>
      <div
        className={`transition-all w-80 p-2 fixed z-101 top-0 bottom-0 bg-surface ${isOpen ? "right-0" : "-right-80"}`}
        aria-hidden={!isOpen}
      >
        <button
          onClick={handleClose}
          className="cursor-pointer -ml-2"
          aria-label="Voltar para configurações do usuário"
          disabled={!isOpen}
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
            disabled={!isOpen || isFetching}
          >
            Atualizar informações
          </Button>
        </form>
      </div>
    </FocusScope>
  );
}
