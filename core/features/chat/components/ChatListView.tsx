"use client";

import { toast } from "sonner";
import { Card, CardContent } from "@/core/components/ui/card";
import { ChatListItem } from "@/core/features/chat/components/ChatListItem";
import { useChatStore } from "@/core/features/chat/hooks/useChatStore";

export const ChatListView = () => {
  const { ready, chats, reportChat, blockChat, deleteChat } = useChatStore();

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

  const handleBlock = (chatId: string, recipientName: string) => {
    blockChat(chatId);
    toast.success(`Chat with ${recipientName} was blocked.`);
  };

  return (
    <section className="space-y-4" dir="rtl">
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
              onBlock={handleBlock}
              onReport={handleReport}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
