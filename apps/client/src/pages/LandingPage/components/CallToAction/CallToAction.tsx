import { Button } from "../../../../components";
import { APP_ROUTES } from "../../../../config/constants";

export function CallToAction() {
  return (
    <section className="bg-surface pt-25 pb-50 text-center">
      <h2 className="text-4xl/[3rem] font-medium mb-1">
        Pronto para decifrar o próximo mistério?
      </h2>
      <p className="max-w-150 m-auto mb-25 text-tx-overlay">
        Use o poder do SELECT para cruzar dados, encontrar suspeitos e resolver
        enigmas que meras linhas de código comuns não conseguem explicar. Você,
        vai encarar o próximo caso?
      </p>
      <Button to={APP_ROUTES.REGISTER}>Registre-se agora</Button>
    </section>
  );
}
