"use client";

import { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/core/components/ui/drawer";
import { cn } from "@/core/utils/utils";

export type ActionListDrawerItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
  destructive?: boolean;
};

type ActionListDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ActionListDrawerItem[];
  title?: string;
  description?: string;
};

export const ActionListDrawer = ({
  open,
  onOpenChange,
  items,
  title,
  description,
}: ActionListDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} closeThreshold={0.3}>
      <DrawerContent className="max-w-md m-auto">
        {(title || description) && (
          <DrawerHeader className="border-b text-right">
            {title ? <DrawerTitle>{title}</DrawerTitle> : null}
            {description ? (
              <DrawerDescription>{description}</DrawerDescription>
            ) : null}
          </DrawerHeader>
        )}

        <ul className="space-y-2 p-4">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  item.onSelect();
                  onOpenChange(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border border-accent/20 bg-background px-3 py-3 text-sm transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  item.destructive
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-muted/30"
                )}
              >
                <span>{item.label}</span>
                {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};
