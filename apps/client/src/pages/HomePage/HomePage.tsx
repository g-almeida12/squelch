import { Sidebar } from "../../components";
import { GridLayout } from "../../layout";

export function HomePage() {
  return <GridLayout
    sidebar={Sidebar()}
    navbar={'NAVBAR'}
    main={'MAIN'}
  />
}
