"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto flex h-[58px] w-max items-end gap-2 rounded-2xl border bg-background/60 p-2 backdrop-blur-md"
);

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

interface DockContextValue {
  mouseX: MotionValue<number>;
  iconSize: number;
  iconMagnification: number;
  iconDistance: number;
}

const DockContext = React.createContext<DockContextValue | null>(null);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "bottom",
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <DockContext.Provider value={{ mouseX, iconSize, iconMagnification, iconDistance }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(dockVariants({ className }), {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          })}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  }
);
Dock.displayName = "Dock";

export interface DockIconProps {
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const ctx = React.useContext(DockContext);
  const fallbackMouseX = useMotionValue(Infinity);

  const mouseX = ctx?.mouseX ?? fallbackMouseX;
  const iconSize = ctx?.iconSize ?? DEFAULT_SIZE;
  const iconMagnification = ctx?.iconMagnification ?? DEFAULT_MAGNIFICATION;
  const iconDistance = ctx?.iconDistance ?? DEFAULT_DISTANCE;
  const padding = Math.max(6, iconSize * 0.2);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-iconDistance, 0, iconDistance],
    [iconSize, iconMagnification, iconSize]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-background",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
