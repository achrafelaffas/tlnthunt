import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  to: string;
  children: ReactNode;
  className?: string;
}

const defaultSytles = "hover:text-foreground whitespace-nowrap inline-flex";

export default function MenuLink({ children, to, className }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive
          ? cn(
              "text-foreground transition-colors border-primary",
              className,
              defaultSytles
            )
          : cn(
              "text-muted-foreground transition-colors",
              className,
              defaultSytles
            );
      }}
    >
      {children}
    </NavLink>
  );
}
