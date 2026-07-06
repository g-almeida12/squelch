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
      className={`flex flex-col-reverse gap-2 items-start justify-between max-w-full m-auto mt-8 text-center md:gap-4 lg:mt-15 lg:min-w-5xl ${variant === "reversed" ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Text content */}
      <div
        className={`flex-1 mx-auto sm:w-[80%] md:text-left ${variant === "reversed" ? "md:ml-8" : "md:mr-8"}`}
      >
        <h3 className="text-accent-primary text-[24px] font-medium mb-4 border-b-2">
          {title}
        </h3>
        <div className="text-[17px] text-base/[1.7rem]">{children}</div>
      </div>

      {/* Image */}
      <div className="bg-tx-overlay flex-1 w-full m-auto aspect-video sm:w-[80%]">
        <img src={imgSrc} alt={imgAlt} loading="lazy" />
      </div>
    </div>
  );
}
