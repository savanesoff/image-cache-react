import { HTMLAttributes } from "react";
import { useImage } from "@cache";
import { cn } from "@demo/utils";
import { PosterLoadStatus } from "./LoadStatus";
import { PosterRenderStatus } from "./RenderStatus";

export type PosterProps = HTMLAttributes<HTMLDivElement> & {
  show: boolean;
};

/**
 * Poster component to display the image.
 * Uses the useImage hook to load the image.
 */
export const Poster = ({ show, className, ...props }: PosterProps) => {
  const { image, request } = useImage();

  return (
    <div
      className={cn(
        "bg-slate-800",
        `max-w-[${request?.size.width}px]`,
        `w-[${request?.size.width}px]`,
        className,
      )}
      {...props}
    >
      <div className={cn("flex flex-col gap-1 p-1 text-[10px]", className)}>
        <PosterLoadStatus />
        <PosterRenderStatus />
      </div>
      <div
        className="transition-opacity duration-1000 ease-in-out"
        style={{
          width: request?.size.width,
          height: request?.size.height,
          minWidth: request?.size.width,
          minHeight: request?.size.height,
          maxWidth: request?.size.width,
          maxHeight: request?.size.height,
          position: "relative",
          backgroundImage: `url(${image?.url})`,
          backgroundSize: "cover",
          opacity: show ? 1 : 0,
        }}
      />
    </div>
  );
};