interface AppStepsCardProps {
  title: string;
  imgSrc: string;
  imgAlt: string;
  variant?: "reversed" | "normal";
  children: React.ReactNode;
}

export function AppStepsCard({
  title,
  imgSrc,
  imgAlt,
  variant = "normal",
  children,
}: AppStepsCardProps) {
  return (
    <div
      className={`flex gap-4 items-start justify-between min-w-5xl max-w-6xl m-auto mt-15 ${variant === "reversed" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex-1">
        <h3
          className={`text-accent-primary text-[24px] font-medium mb-4 border-b-2 ${variant === "reversed" ? "ml-8" : "mr-8"}`}
        >
          {title}
        </h3>
        <div
          className={`text-[17px] ${variant === "reversed" ? "ml-8" : "mr-8"} text-base/[1.7rem]`}
        >
          {children}
        </div>
      </div>

      <div className="bg-tx-overlay flex-1 w-full aspect-video">
        <img src={imgSrc} alt={imgAlt} loading="lazy" />
      </div>
    </div>
  );
}
