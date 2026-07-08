import { useParams } from "react-router-dom";
import { Sidebar, TabSwitchView } from "../../components";
import { ChallengeMain, HistoryMain } from "./components";

const CHALLENGE_TABS = ["Desafio", "Histórico"];

export function ChallengePage() {
  return (
    <div className="flex flex-row min-h-dvh">
      <TabSwitchView
        tabs={CHALLENGE_TABS}
        tabContent={[<ChallengeMainWrapper />, <HistoryMain />]}
      />
      <Sidebar />
    </div>
  );
}

function ChallengeMainWrapper() {
  const { challengeId } = useParams<Record<string, string>>();
  return <ChallengeMain challengeId={Number(challengeId)} key={challengeId} />;
}
