import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/core/utils/utils";

type SeenTicksProps = {
  seen: boolean;
  className?: string;
};

export const SeenTicks = ({ seen, className }: SeenTicksProps) => {
  if (seen) {
    return <CheckCheck className={cn("size-3.5 text-primary", className)} />;
  }

  return <Check className={cn("size-3.5 text-muted-foreground", className)} />;
};
