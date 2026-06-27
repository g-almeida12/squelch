import { Navbar } from "../";
import { Main } from "../../layout";
import { useState } from "react";

interface TabSwitchViewProps {
  tabs: string[];
  tabContent: React.ReactNode[];
}

export function TabSwitchView({ tabs, tabContent }: TabSwitchViewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="flex flex-col w-full max-w-[calc(100%-52px)] min-h-dvh ml-13">
      <Navbar
        tabs={tabs}
        activeTab={activeTab}
        handleActiveTabChange={setActiveTab}
      />
      <Main customClassName="">{tabContent[activeTab]}</Main>
    </div>
  );
}
