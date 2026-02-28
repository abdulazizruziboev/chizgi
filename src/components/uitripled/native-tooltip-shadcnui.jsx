"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

const NativeTooltipProvider = ({
  delayDuration = 100,
  ...props
}) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
);

const NativeTooltipRoot = TooltipPrimitive.Root;

const NativeTooltipTrigger = TooltipPrimitive.Trigger;

const NativeTooltipContent = React.forwardRef((
  { className, sideOffset = 8, children, animation = "blur", ...props },
  ref
) => {
  const animations = {
    blur: {
      initial: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0
      },
    },
    scale: {
      initial: { opacity: 0, scale: 0.5, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.4
      },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("z-50 overflow-visible bg-transparent", className)}
        {...props}>
        <motion.div
          initial={selectedAnimation.initial}
          animate={selectedAnimation.animate}
          transition={selectedAnimation.transition}
          className="rounded-md border border-white/10 bg-black/80 dark:bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white dark:text-black shadow-lg">
          {children}
        </motion.div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
NativeTooltipContent.displayName = TooltipPrimitive.Content.displayName;

const NativeTooltip = ({
  content,
  children,
  animation,
  ...props
}) => {
  if (content) {
    return (
      <NativeTooltipRoot {...props}>
        <NativeTooltipTrigger asChild>{children}</NativeTooltipTrigger>
        <NativeTooltipContent animation={animation}>
          {content}
        </NativeTooltipContent>
      </NativeTooltipRoot>
    );
  }

  return <NativeTooltipRoot {...props}>{children}</NativeTooltipRoot>;
};

export {
  NativeTooltip,
  NativeTooltipContent,
  NativeTooltipProvider,
  NativeTooltipTrigger,
};
