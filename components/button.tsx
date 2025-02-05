import { clsx } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = ({ className, variant = "default", size = "md", children, ...props }: ButtonProps) => {
  const sizeClasses = {
    sm: "text-sm px-2 py-1 rounded-md",
    md: "text-base px-4 py-2 rounded-md",
    lg: "text-lg px-6 py-3 rounded-lg",
  }

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
  }

  return (
    <button
      className={clsx(
        className,
        sizeClasses[size],
        variantClasses[variant],
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...props}
    >
      {children}
    </button>
  )
}

