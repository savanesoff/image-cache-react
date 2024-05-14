import { useContext, useEffect } from "react";
import { ControllerContext, ControllerContextType } from "./Controller";
import { ControllerEvent } from "@/lib";

type UseControllerProps = {
  /** Event handler for RAM overflow */
  onRamOverflow?: (event: ControllerEvent<"ram-overflow">) => void;
  /** Event handler for video memory overflow */
  onVideoOverflow?: (event: ControllerEvent<"video-overflow">) => void;
  /** Event handler for image added */
  onImageAdded?: (event: ControllerEvent<"image-added">) => void;
  /** Event handler for image removed */
  onImageRemoved?: (event: ControllerEvent<"image-removed">) => void;
  /** Event handler for cache update */
  onUpdate?: (event: ControllerEvent<"update">) => void;
};
/**
 * The useController hook provides a way to access the `Controller` instance from the `ControllerProvider`.
 */
export const useController = ({
  onRamOverflow,
  onVideoOverflow,
  onImageAdded,
  onImageRemoved,
  onUpdate,
}: UseControllerProps = {}): ControllerContextType => {
  const context = useContext(ControllerContext);
  if (!context) {
    throw new Error("useController must be used within a ControllerProvider");
  }

  const controller = context.controller;
  useEffect(() => {
    onRamOverflow && controller.on("ram-overflow", onRamOverflow);
    onVideoOverflow && controller.on("video-overflow", onVideoOverflow);
    onImageAdded && controller.on("image-added", onImageAdded);
    onImageRemoved && controller.on("image-removed", onImageRemoved);
    onUpdate && controller.on("update", onUpdate);

    return () => {
      onRamOverflow && controller.off("ram-overflow", onRamOverflow);
      onVideoOverflow && controller.off("video-overflow", onVideoOverflow);
      onImageAdded && controller.off("image-added", onImageAdded);
      onImageRemoved && controller.off("image-removed", onImageRemoved);
      onUpdate && controller.off("update", onUpdate);
    };
  }, [
    controller,
    onImageAdded,
    onImageRemoved,
    onRamOverflow,
    onUpdate,
    onVideoOverflow,
  ]);

  return context;
};
