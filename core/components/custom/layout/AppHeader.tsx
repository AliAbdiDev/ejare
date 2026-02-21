import { cn } from "@/core/utils/utils";

type AppHeaderProps = {
  title?: string;
  className?: string;
};

export default function AppHeader({ title, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-20 flex h-[65px] max-w-md mx-auto items-center border-b border-accent/20 bg-background px-4",
        className
      )}
    >
      {title ? <h1 className="text-base font-iransans-bold">{title}</h1> : null}
    </header>
  );
}
