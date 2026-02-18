"use client";

import { toast } from "sonner";
import { Card, CardContent } from "@/core/components/ui/card";
import { ChatListItem } from "@/core/features/chat/components/ChatListItem";
import { useChatStore } from "@/core/features/chat/hooks/useChatStore";

export const ChatListView = () => {
  const { ready, chats, reportChat, deleteChat } = useChatStore();

  const handleReport = (chatId: string, recipientName: string) => {
    reportChat(chatId);
    toast.success(`Chat with ${recipientName} has been reported.`);
  };

  const handleDelete = (chatId: string, recipientName: string) => {
    const confirmed = window.confirm(
      `Delete chat with ${recipientName}? This action cannot be undone.`
    );

    if (!confirmed) return;

    deleteChat(chatId);
    toast.success(`Chat with ${recipientName} was deleted.`);
  };

  return (
    <section className="space-y-4" dir="rtl">
      <div className="space-y-1">
        <h1 className="text-lg font-iransans-bold">Chats</h1>
        <p className="text-sm text-muted-foreground font-iransans-light">
          Mobile chat list. Tap a chat to open messages.
        </p>
      </div>

      {!ready ? (
        <Card className="py-4">
          <CardContent className="px-4 text-sm text-muted-foreground">
            Loading chats...
          </CardContent>
        </Card>
      ) : chats.length === 0 ? (
        <Card className="py-4">
          <CardContent className="px-4 text-sm text-muted-foreground">
            No chats available.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onReport={handleReport}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <p className="text-[11px] text-muted-foreground">
        Messages can be reported, but only chats can be deleted.
      </p>
    </section>
  );
};
