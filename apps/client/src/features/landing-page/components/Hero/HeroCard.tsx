import type { IconType } from "react-icons";

interface HeroCardProps {
  Icon: IconType;
  title: string;
  children: React.ReactNode;
}

export function HeroCard({ Icon, title, children }: HeroCardProps) {
  return (
    <div className="bg-surface p-2 rounded-1 min-w-25 max-w-125 flex-1 min-h-full">
      <div className="flex flex-row items-center gap-2 mb-2">
        <Icon className="size-7" />
        <h3 className="uppercase font-medium text-lg tracking-[0.02rem]">
          {title}
        </h3>
      </div>

      <div className="text-tx-overlay text-[14px]/[1.2rem]">{children}</div>
    </div>
  );
}
