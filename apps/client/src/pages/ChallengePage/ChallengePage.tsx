import { Sidebar, TabSwitchView } from "../../components";
import { ChallengeMain } from "./components";

const CHALLENGE_TABS = ["Desafio", "Histórico"];

export function ChallengePage() {
  return (
    <div className="flex flex-row min-h-dvh">
      <TabSwitchView tabs={CHALLENGE_TABS} tabContent={[<ChallengeMain />]} />
      <Sidebar />
    </div>
  );
}
