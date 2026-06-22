import { Sidebar, TabSwitchView } from "../../components";

export function HomePage() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <TabSwitchView />
    </div>
  );
}
