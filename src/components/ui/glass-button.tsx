import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "default" | "sm" | "lg";
}

const sizeClasses = {
  sm: "glass-btn--sm",
  default: "glass-btn--default",
  lg: "glass-btn--lg",
} as const;

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "glass-btn",
          variant === "outline" && "glass-btn--outline",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <span className="glass-btn__content">{children}</span>
      </button>
    );
  },
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
