import { APP_ROUTES } from "../../../../config/constants";
import { Button } from "../../../../components";

export function Navbar() {
  return (
    <nav className="flex flex-row w-full justify-between items-center p-8 h-14">
      <div
        className="size-11 rounded-full bg-accent-primary flex justify-center items-center cursor-pointer select-none"
        aria-label="Voltar para página inicial"
      >
        <div
          className="text-tx-contrast relative -top-px h-4 flex justify-center items-center font-bold font-heading"
          aria-hidden="true"
        >
          SQL
        </div>
      </div>

      <ul className="flex flex-row gap-4">
        <li>
          <Button to={APP_ROUTES.REGISTER} customClassName="text-[14px]">
            Registre-se agora
          </Button>
        </li>
        <li>
          <Button
            to={APP_ROUTES.LOGIN}
            variant="ghost-primary"
            customClassName="text-[14px]"
          >
            Acesse o site
          </Button>
        </li>
      </ul>
    </nav>
  );
}
