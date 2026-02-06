import { ButtonHTMLAttributes, forwardRef, memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

const variantClasses = {
  primary: "bg-primary-800 text-white hover:bg-primary-900",
  secondary: "bg-accent-500 text-white hover:bg-accent-600",
  outline: "border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white",
  ghost: "text-primary-700 hover:bg-primary-50",
};

const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, external, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
      variantClasses[variant],
      {
        "px-4 py-2 text-sm": size === "sm",
        "px-6 py-3 text-base": size === "md",
        "px-8 py-4 text-lg": size === "lg",
      },
      className
    );

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
));

Button.displayName = "Button";

export { Button };
