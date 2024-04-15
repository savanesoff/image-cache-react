import { cn } from "@demo/utils";
import { HTMLAttributes } from "react";

export type StatusBadgeProps = HTMLAttributes<HTMLDivElement> & {
  status: "on" | "error" | "warn" | "off";
  text?: string;
};
export const StatusBadge = ({
  status,
  text,
  className,
  ...props
}: StatusBadgeProps) => {
  return (
    <div
      className={cn(
        "rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-400",
        status === "on" && "bg-green-700  text-green-200",
        status === "error" && "bg-red-700 text-red-100",
        status === "warn" && "bg-yellow-700 text-orange-100",
        className,
      )}
      {...props}
    >
      {text || "..."}
    </div>
  );
};
