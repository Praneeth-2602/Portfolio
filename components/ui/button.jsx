"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-white transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent text-primary hover:bg-accent-hover focus:ring-2 focus:ring-accent focus:ring-opacity-50",
        primary: "bg-primary text-white hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-opacity-50",
        outline: "border border-accent bg-transparent text-accent hover:bg-accent hover:text-primary rounded-lg focus:ring-2 focus:ring-accent focus:ring-opacity-50",
      },
      size: {
        default: "h-[44px] px-6",
        md: "h-[48px] px-6",
        lg: "h-[56px] px-8 text-sm uppercase tracking-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : motion.button;
  return (
    <Comp
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.2, ease: "easeInOut" }, 
        borderRadius: "999px" 
        }}
      whileTap={{ scale: 0.95 }}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
