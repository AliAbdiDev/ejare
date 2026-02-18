"use client";

import Link from "next/link";
import { EllipsisVertical, Flag, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/core/components/ui/avatar";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent } from "@/core/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { ChatSummary } from "@/core/features/chat/model/types";
import { SeenTicks } from "@/core/features/chat/components/SeenTicks";
import { formatChatTime, getInitials } from "@/core/features/chat/utils/formatters";

type ChatListItemProps = {
  chat: ChatSummary;
  onReport: (chatId: string, recipientName: string) => void;
  onDelete: (chatId: string, recipientName: string) => void;
};

export const ChatListItem = ({ chat, onReport, onDelete }: ChatListItemProps) => {
  return (
    <li>
      <Card className="py-3">
        <CardContent className="px-3">
          <div className="flex items-start gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="mt-1 shrink-0 rounded-full"
                  aria-label={`Actions for ${chat.recipientName}`}
                >
                  <EllipsisVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => onReport(chat.id, chat.recipientName)}
                  disabled={chat.reported}
                >
                  <Flag className="size-4" />
                  {chat.reported ? "Chat reported" : "Report chat"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(chat.id, chat.recipientName)}
                >
                  <Trash2 className="size-4" />
                  Delete chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/chat/${chat.id}`} className="block flex-1">
              <div className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-muted/20">
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
                    <span className="text-[11px] text-muted-foreground">
                      {chat.lastMessageAt ? formatChatTime(chat.lastMessageAt) : ""}
                    </span>
                  </div>

                  <p className="truncate text-[12px] text-muted-foreground">
                    {chat.recipientHandle}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {chat.lastOutgoingSeen !== null && (
                      <SeenTicks seen={chat.lastOutgoingSeen} />
                    )}
                    <span className="truncate">{chat.lastMessagePreview}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </li>
  );
};
