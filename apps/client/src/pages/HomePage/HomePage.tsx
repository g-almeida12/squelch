import { Sidebar, TabSwitchView } from "../../components";
import { StartMain } from "./components";

const HOMEPAGE_TABS = ["Início", "Histórico"];

export function HomePage() {
  return (
    <div className="flex flex-row min-h-dvh">
      <TabSwitchView
        tabs={HOMEPAGE_TABS}
        tabContent={[
          <StartMain />,
          <div>
            <h1>Histórico</h1>
          </div>,
        ]}
      />
      <Sidebar />
    </div>
  );
}
