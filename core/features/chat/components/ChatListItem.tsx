"use client";

import { MouseEvent, PointerEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Ban, EllipsisVertical, Flag, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/core/components/ui/avatar";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent } from "@/core/components/ui/card";
import {
  ActionListDrawer,
  ActionListDrawerItem,
} from "@/core/components/custom/ui/ActionListDrawer";
import { ChatSummary } from "@/core/features/chat/model/types";
import { SeenTicks } from "@/core/features/chat/components/SeenTicks";
import {
  formatChatTime,
  getInitials,
} from "@/core/features/chat/utils/formatters";
import { useLongPress } from "@/core/hooks/use-long-press";
import { useResponsive } from "@/core/hooks/use-responsive";

type ChatListItemProps = {
  chat: ChatSummary;
  onReport: (chatId: string, recipientName: string) => void;
  onDelete: (chatId: string, recipientName: string) => void;
  onBlock: (chatId: string, recipientName: string) => void;
};

export const ChatListItem = ({
  chat,
  onReport,
  onDelete,
  onBlock,
}: ChatListItemProps) => {
  const [isActionsDrawerOpen, setIsActionsDrawerOpen] = useState(false);
  const responsive = useResponsive();
  const isTabletOrBelow = responsive.mobile || responsive.tablet;
  const longPress = useLongPress<HTMLAnchorElement>({
    onLongPress: () => setIsActionsDrawerOpen(true),
  });

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!isTabletOrBelow) return;
    longPress.onPointerDown(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!isTabletOrBelow) return;
    longPress.onPointerMove(event);
  };

  const cancelLongPress = () => {
    if (!isTabletOrBelow) return;
    longPress.onPointerUp();
  };

  const handleItemClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isTabletOrBelow) return;
    longPress.shouldSuppressClick(event);
  };

  const actionItems = useMemo<ActionListDrawerItem[]>(
    () => [
      {
        id: "delete-chat",
        label: "Delete chat",
        icon: <Trash2 className="size-4" />,
        onSelect: () => onDelete(chat.id, chat.recipientName),
        destructive: true,
      },
      {
        id: "block-chat",
        label: chat.blocked ? "Chat blocked" : "Block chat",
        icon: <Ban className="size-4" />,
        onSelect: () => onBlock(chat.id, chat.recipientName),
        disabled: chat.blocked,
        destructive: true,
      },
      {
        id: "report-chat",
        label: chat.reported ? "Chat reported" : "Report chat",
        icon: <Flag className="size-4" />,
        onSelect: () => onReport(chat.id, chat.recipientName),
        disabled: chat.reported,
      },
    ],
    [
      chat.blocked,
      chat.id,
      chat.recipientName,
      chat.reported,
      onBlock,
      onDelete,
      onReport,
    ],
  );

  return (
    <li>
      <Link
        href={`/chat/${chat.id}`}
        className="block relative"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={cancelLongPress}
        onPointerCancel={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onClick={handleItemClick}
      >
        <Card className="py-2 select-none">
          <CardContent className="px-3">
            <div className="flex items-start gap-3 rounded-xl p-2 transition-colors">
              <Avatar className="size-11 shrink-0">
                <AvatarFallback className="text-xs">
                  {getInitials(chat.recipientName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-iransans-bold">
                    {chat.recipientName}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="mt-1 shrink-0 rounded-full inline-flex size-5.5"
                    aria-label={`Actions for ${chat.recipientName}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActionsDrawerOpen(true);
                    }}
                  >
                    <EllipsisVertical className="size-4.5" />
                  </Button>
                </div>

                <p className="truncate text-[12px] text-muted-foreground">
                  {chat.recipientHandle}
                </p>

                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    {chat.lastOutgoingSeen !== null && (
                      <SeenTicks seen={chat.lastOutgoingSeen} />
                    )}
                    <span className="truncate max-w-36 sm:max-w-full">{chat.lastMessagePreview}</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {chat.lastMessageAt
                      ? formatChatTime(chat.lastMessageAt)
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <ActionListDrawer
        open={isActionsDrawerOpen}
        onOpenChange={(open) => {
          setIsActionsDrawerOpen(open);
          if (!open) {
            longPress.reset();
          }
        }}
        title="Chat actions"
        items={actionItems}
      />
    </li>
  );
};
