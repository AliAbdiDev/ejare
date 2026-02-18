import { cn } from "@/core/utils/utils";

type AppHeaderProps = {
  title?: string;
  className?: string;
};

export default function AppHeader({ title, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "-mx-6 flex h-[65px] w-[calc(100%+3rem)] items-center border-b border-accent/20 bg-background px-6",
        className
      )}
    >
      {title ? <h1 className="text-base font-iransans-bold">{title}</h1> : null}
    </header>
  );
}
