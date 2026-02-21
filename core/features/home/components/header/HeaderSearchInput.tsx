import { Input } from "@/core/components/ui/input";
import { cn } from "@/core/utils/utils";
import { KeyboardEvent } from "react";
import { Search } from "lucide-react";

type HeaderSearchInputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onActivate: () => void;
  onSubmit: () => void;
};

export const HeaderSearchInput = ({
  className,
  value,
  onChange,
  onActivate,
  onSubmit,
}: HeaderSearchInputProps) => {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        placeholder="جستجو..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onActivate}
        onClick={onActivate}
        onKeyDown={onKeyDown}
        className="peer h-10 pl-9"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/50 peer-focus-within:text-muted duration-200">
        <Search className="size-4.25" />
      </span>
    </div>
  );
};
