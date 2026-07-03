import { Sidebar, TabSwitchView } from "../../components";
import { ChallengeMain, HistoryMain } from "./components";

const CHALLENGE_TABS = ["Desafio", "Histórico"];

export function ChallengePage() {
  return (
    <div className="flex flex-row min-h-dvh">
      <TabSwitchView
        tabs={CHALLENGE_TABS}
        tabContent={[<ChallengeMain />, <HistoryMain />]}
      />
      <Sidebar />
    </div>
  );
}
