import { AppStepsCard } from "./AppStepsCard";

export function AppSteps() {
  return (
    <section className="flex flex-col gap-4 mb-50 sm:gap-14 sm:mb-25">
      <AppStepsCard title="1° Passo: Escolha o seu caso" imgSrc="" imgAlt="">
        <p>
          Explore nosso arquivo de enigmas interativos. De pequenos mistérios
          cotidianos a conspirações complexas ocultas em linhas de tabelas,
          selecione por onde quer começar sua investigação.
        </p>
      </AppStepsCard>
      <AppStepsCard
        title="2° Passo: Interrogue o Banco de Dados"
        imgSrc=""
        imgAlt=""
        variant="reversed"
      >
        <p>
          Utilize nosso editor profissional para construir suas queries. Filtre
          suspeitos, cruze informações de tabelas secretas e use o poder do
          SELECT para extrair apenas a verdade que os dados tentam esconder.
        </p>
      </AppStepsCard>
      <AppStepsCard title="3° Passo: Revele o segredo" imgSrc="" imgAlt="">
        <p>
          Execute sua query contra o banco de dados e veja o resultado na hora.
          Se a sua lógica estiver certa, o enigma é resolvido, a pista é
          validada e você pode avançar para o próximo nível da história.
        </p>
      </AppStepsCard>
    </section>
  );
}
