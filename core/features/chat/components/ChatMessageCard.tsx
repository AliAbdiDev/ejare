"use client";

import { EllipsisVertical, Flag, Paperclip } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { SeenTicks } from "@/core/features/chat/components/SeenTicks";
import { ChatMessage } from "@/core/features/chat/model/types";
import { formatChatTime, formatFileSize } from "@/core/features/chat/utils/formatters";
import { cn } from "@/core/utils/utils";

type ChatMessageCardProps = {
  message: ChatMessage;
  onReportMessage: (messageId: string) => void;
};

export const ChatMessageCard = ({
  message,
  onReportMessage,
}: ChatMessageCardProps) => {
  const isMine = message.sender === "me";

  return (
    <div className={cn("flex", isMine ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-3 py-2.5",
          isMine
            ? "bg-primary/15 text-foreground"
            : "bg-muted/30 text-muted-foreground"
        )}
      >
        <div className="mb-1 flex items-start justify-between gap-2">
          <p className="text-[11px] font-iransans-bold">
            {isMine ? "You" : "Recipient"}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-7 rounded-full"
                aria-label="Message actions"
              >
                <EllipsisVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => onReportMessage(message.id)}
                disabled={message.reported}
              >
                <Flag className="size-4" />
                {message.reported ? "Message reported" : "Report message"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {message.text && <p className="text-sm">{message.text}</p>}

        {message.attachments.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {message.attachments.map((attachment) => (
              <li
                key={attachment.id}
                className="flex items-center justify-between gap-2 rounded-lg border bg-background/60 px-2 py-1 text-xs"
              >
                <span className="flex min-w-0 items-center gap-1">
                  <Paperclip className="size-3.5 shrink-0" />
                  <span className="truncate">{attachment.name}</span>
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {formatFileSize(attachment.size)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
          {isMine && <SeenTicks seen={message.seenByRecipient} />}
          <span>{formatChatTime(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
