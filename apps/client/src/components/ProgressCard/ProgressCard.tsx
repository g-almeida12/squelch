import type { IconType } from "react-icons";

interface ProgressCardProps {
  Icon: IconType;
  title: string;
  progress: number | undefined;
  finalProgress?: number;
  hasProgressCircle?: boolean;
}

export function ProgressCard({
  Icon,
  title,
  progress,
  finalProgress,
  hasProgressCircle,
}: ProgressCardProps) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full max-w-sm min-w-68 rounded-1 p-2 bg-surface select-none">
      <p
        className="flex flex-row items-center justify-start gap-2 text-tx-overlay font-heading font-semibold text-[17px] [font-variant-caps:small-caps]"
        id={`info-${title}`}
      >
        <Icon size={20} /> {title}
      </p>

      <div className="relative flex items-center justify-center size-13 rounded-full">
        {hasProgressCircle && (
          <svg
            className="absolute top-0 left-0 size-full -rotate-90"
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r={18}
              className="stroke-subtle"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r={18}
              className="stroke-accent-primary transition-all duration-300 ease-in-out"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={
                2 * Math.PI * 18 -
                Math.min((progress || 0) / (finalProgress || 1), 1) *
                  (2 * Math.PI * 18)
              }
              strokeLinecap="round"
            />
          </svg>
        )}

        <span
          className="relative translate-y-0.75 text-2xl font-semibold font-alternate leading-none"
          aria-labelledby={`info-${title}`}
        >
          {progress}
        </span>
      </div>
    </div>
  );
}
