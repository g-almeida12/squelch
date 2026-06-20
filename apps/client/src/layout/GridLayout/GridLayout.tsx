import type React from "react";
import { Main } from "../";

interface GridLayoutProps {
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
  main: React.ReactNode;
}

export function GridLayout({ sidebar, navbar, main }: GridLayoutProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <aside className="row-span-2">{sidebar}</aside>
      <nav className="grid-navbar">{navbar}</nav>
      <Main customClassName="grid-main overflow-y-auto">{main}</Main>
    </div>
  );
}
