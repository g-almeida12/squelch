import { Sidebar, TabSwitchView } from "../../components";
import { SubmissionsMain, StartMain } from "./components";

const HOMEPAGE_TABS = ["Início", "Submissões"];

export function HomePage() {
  return (
    <div className="flex flex-row min-h-dvh">
      <TabSwitchView
        tabs={HOMEPAGE_TABS}
        tabContent={[<StartMain />, <SubmissionsMain />]}
      />
      <Sidebar />
    </div>
  );
}
