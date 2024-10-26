import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const spinnerVariants = cva("relative block opacity-[0.65]", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-10 h-10",
      "2xl": "w-12 h-12",
      "3xl": "w-16 h-16",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  loading?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
  defaultText?: string;
  fallback?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      size,
      loading = false,
      asChild = false,
      children,
      defaultText,
      fallback,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "span";

    const renderSpinnerIcon = () => (
      <Comp className={cn(spinnerVariants({ size }))} ref={ref} {...props}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 w-[12.5%] h-full animate-spinner-leaf-fade"
            style={{
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${-(7 - i) * 100}ms`,
            }}
          >
            <span
              className={cn("block w-full h-[30%] rounded-full", className)}
            ></span>
          </span>
        ))}
      </Comp>
    );

    if (loading) {
      if (fallback) {
        return (
          <span className="flex items-center gap-2">
            {renderSpinnerIcon()}
            <span>{fallback}</span>
          </span>
        );
      }
      return renderSpinnerIcon();
    }

    return (
      <span className="flex items-center gap-2">
        {defaultText && <span>{defaultText}</span>}
        {children}
      </span>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
