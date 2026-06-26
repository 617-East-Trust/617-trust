import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "dark";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variants: Record<Variant, string> = {
  // Primary — Warm brass, premium tactility, trustworthy
  primary:
    "bg-[var(--color-brass)] text-[var(--color-void)] hover:bg-[var(--color-brass-glow)] hover:shadow-[var(--shadow-brass)] hover:brightness-105 active:brightness-95",

  // Ghost — Tech / drafting blue accent
  ghost:
    "bg-transparent text-[var(--color-drafting-blue)] border border-[var(--color-drafting-blue)] hover:bg-[var(--color-drafting-blue)] hover:text-[var(--color-chalk)] hover:shadow-[var(--shadow-md)]",

  // Dark — Strong contrast with brass border on hover
  dark:
    "bg-[var(--color-ink)] text-[var(--color-chalk)] border border-[var(--semantic-border-strong)] hover:bg-[var(--color-graphite)] hover:border-[var(--color-brass)]",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-[var(--radius-pill)] transition-all duration-[var(--transition-base)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

/** Link styled as a button */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-[var(--radius-pill)] transition-all duration-[var(--transition-base)] cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </a>
  );
}
