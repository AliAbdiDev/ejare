"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  EllipsisVertical,
  Flag,
  Paperclip,
  SendHorizontal,
  Trash2,
  X,
} from "lucide-react";
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
import { Input } from "@/core/components/ui/input";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { ChatMessageCard } from "@/core/features/chat/components/ChatMessageCard";
import { useChatStore } from "@/core/features/chat/hooks/useChatStore";
import { ChatAttachment } from "@/core/features/chat/model/types";
import { formatFileSize, getInitials } from "@/core/features/chat/utils/formatters";

type ChatConversationViewProps = {
  chatId: string;
};

const createAttachmentId = (): string =>
  `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

export const ChatConversationView = ({ chatId }: ChatConversationViewProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [pendingFiles, setPendingFiles] = useState<ChatAttachment[]>([]);
  const {
    ready,
    getChatById,
    getMessagesByChatId,
    sendMessage,
    markMessageSeen,
    reportChat,
    reportMessage,
    deleteChat,
  } = useChatStore();

  const chat = getChatById(chatId);
  const messages = getMessagesByChatId(chatId);

  useEffect(() => {
    bottomAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []).map((file) => ({
      id: createAttachmentId(),
      name: file.name,
      size: file.size,
      mimeType: file.type || "application/octet-stream",
    }));

    if (selectedFiles.length > 0) {
      setPendingFiles((prev) => [...prev, ...selectedFiles]);
      toast.success(`${selectedFiles.length} file(s) attached.`);
    }

    event.target.value = "";
  };

  const handleRemovePendingFile = (attachmentId: string) => {
    setPendingFiles((prev) =>
      prev.filter((attachment) => attachment.id !== attachmentId)
    );
  };

  const handleSend = () => {
    if (!chatId) return;

    const messageId = sendMessage(chatId, {
      text,
      attachments: pendingFiles,
    });

    if (!messageId) {
      toast.error("Write a message or attach at least one file.");
      return;
    }

    setText("");
    setPendingFiles([]);
    toast.success("Message sent.");

    window.setTimeout(() => {
      markMessageSeen(chatId, messageId);
    }, 1500);
  };

  const handleReportChat = () => {
    if (!chat) return;
    reportChat(chat.id);
    toast.success(`Chat with ${chat.recipientName} has been reported.`);
  };

  const handleReportMessage = (messageId: string) => {
    if (!chatId) return;
    reportMessage(chatId, messageId);
    toast.success("Message has been reported.");
  };

  const handleDeleteChat = () => {
    if (!chat) return;

    const confirmed = window.confirm(
      `Delete chat with ${chat.recipientName}? This action cannot be undone.`
    );
    if (!confirmed) return;

    deleteChat(chat.id);
    toast.success(`Chat with ${chat.recipientName} was deleted.`);
    router.push("/chat");
  };

  if (!ready) {
    return (
      <Card className="py-4">
        <CardContent className="px-4 text-sm text-muted-foreground">
          Loading conversation...
        </CardContent>
      </Card>
    );
  }

  if (!chat) {
    return (
      <Card className="py-4">
        <CardContent className="space-y-3 px-4 text-sm text-muted-foreground">
          <p>Chat not found or already deleted.</p>
          <Button variant="outline" onClick={() => router.push("/chat")}>
            Back to chat list
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section dir="rtl">
      <Card className="overflow-hidden py-0">
        <CardContent className="px-0">
          <div className="flex items-center justify-between gap-2 border-b px-3 py-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full"
                onClick={() => router.push("/chat")}
                aria-label="Back to chat list"
              >
                <ArrowRight className="size-4" />
              </Button>

              <Avatar className="size-10">
                <AvatarFallback className="text-xs">
                  {getInitials(chat.recipientName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-iransans-bold">
                  {chat.recipientName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {chat.recipientHandle}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full"
                  aria-label="Chat actions"
                >
                  <EllipsisVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={handleReportChat}
                  disabled={chat.reported}
                >
                  <Flag className="size-4" />
                  {chat.reported ? "Chat reported" : "Report chat"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleDeleteChat}
                >
                  <Trash2 className="size-4" />
                  Delete chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="px-3 py-3">
            <ScrollArea className="h-[54vh] rounded-xl border border-border/60 p-2">
              <div className="space-y-2.5">
                {messages.map((message) => (
                  <ChatMessageCard
                    key={message.id}
                    message={message}
                    onReportMessage={handleReportMessage}
                  />
                ))}
                <div ref={bottomAnchorRef} />
              </div>
            </ScrollArea>
          </div>

          {pendingFiles.length > 0 && (
            <div className="border-t px-3 py-2.5">
              <ul className="space-y-1.5">
                {pendingFiles.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="flex items-center justify-between gap-2 rounded-lg border px-2 py-1 text-xs"
                  >
                    <span className="truncate">{attachment.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {formatFileSize(attachment.size)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-7 rounded-full"
                        onClick={() => handleRemovePendingFile(attachment.id)}
                        aria-label={`Remove ${attachment.name}`}
                      >
                        <X className="size-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t px-3 py-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelection}
            />

            <div className="flex items-center gap-2">
              <Input
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Write a message..."
                className="h-10 flex-1"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
              />

              <Button
                variant="outline"
                size="icon-sm"
                className="h-10 w-10 rounded-lg"
                onClick={() => fileInputRef.current?.click()}
                type="button"
                aria-label="Upload files"
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                size="icon-sm"
                className="h-10 w-10 rounded-lg"
                onClick={handleSend}
                type="button"
                disabled={!text.trim() && pendingFiles.length === 0}
                aria-label="Send message"
              >
                <SendHorizontal className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
