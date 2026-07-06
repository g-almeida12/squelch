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
      className={`flex flex-col-reverse gap-2 items-start justify-between max-w-6xl m-auto mt-8 text-center sm:mt-15 sm:min-w-5xl sm:flex-row sm:gap-4 ${variant === "reversed" ? "sm:flex-row-reverse" : "sm:flex-row"}`}
    >
      <div className="flex-1">
        <h3
          className={`text-accent-primary text-[24px] font-medium mb-4 border-b-2 ${variant === "reversed" ? "sm:ml-8" : "sm:*:mr-8"}`}
        >
          {title}
        </h3>
        <div
          className={`text-[17px] ${variant === "reversed" ? "sm:ml-8" : "sm:mr-8"} text-base/[1.7rem]`}
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
