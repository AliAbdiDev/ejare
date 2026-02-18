"use client";

import { useCallback, useMemo, useState } from "react";
import { DEFAULT_CHAT_STORE } from "@/core/features/chat/model/default-chat-store";
import {
  ChatMessage,
  ChatStore,
  ChatSummary,
  SendMessagePayload,
} from "@/core/features/chat/model/types";

const CHAT_STORE_KEY = "my-app-chat-store-v1";

const cloneDefaultStore = (): ChatStore => {
  if (typeof structuredClone === "function") {
    return structuredClone(DEFAULT_CHAT_STORE);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CHAT_STORE));
};

const formatPreview = (message: ChatMessage | undefined): string => {
  if (!message) return "No messages yet";
  if (message.text.trim().length > 0) return message.text;
  if (message.attachments.length === 1) return "Sent a file";
  if (message.attachments.length > 1) return `Sent ${message.attachments.length} files`;
  return "No content";
};

const createId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};

const readStoreFromSession = (): ChatStore => {
  if (typeof window === "undefined") return cloneDefaultStore();

  try {
    const raw = sessionStorage.getItem(CHAT_STORE_KEY);
    if (!raw) return cloneDefaultStore();

    const parsed = JSON.parse(raw) as Partial<ChatStore>;
    if (!parsed || !Array.isArray(parsed.chats) || !parsed.messages) {
      return cloneDefaultStore();
    }

    return parsed as ChatStore;
  } catch {
    return cloneDefaultStore();
  }
};

const writeStoreToSession = (store: ChatStore): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CHAT_STORE_KEY, JSON.stringify(store));
};

type StoreUpdater = (prev: ChatStore) => ChatStore;

export const useChatStore = () => {
  const [store, setStore] = useState<ChatStore>(() => readStoreFromSession());

  const updateStore = useCallback((updater: StoreUpdater) => {
    setStore((prev) => {
      const next = updater(prev);
      writeStoreToSession(next);
      return next;
    });
  }, []);

  const chats = useMemo<ChatSummary[]>(() => {
    return store.chats
      .map((chat) => {
        const chatMessages = store.messages[chat.id] ?? [];
        const lastMessage = chatMessages.at(-1);
        const lastOutgoing = [...chatMessages]
          .reverse()
          .find((message) => message.sender === "me");

        return {
          ...chat,
          lastMessagePreview: formatPreview(lastMessage),
          lastMessageAt: lastMessage?.createdAt ?? null,
          lastOutgoingSeen: lastOutgoing ? lastOutgoing.seenByRecipient : null,
        };
      })
      .sort((a, b) => {
        const aDate = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
        const bDate = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
        return bDate - aDate;
      });
  }, [store]);

  const getChatById = useCallback(
    (chatId: string) => store.chats.find((chat) => chat.id === chatId),
    [store.chats]
  );

  const getMessagesByChatId = useCallback(
    (chatId: string) => store.messages[chatId] ?? [],
    [store.messages]
  );

  const sendMessage = useCallback(
    (chatId: string, payload: SendMessagePayload): string | null => {
      if (!payload.text.trim() && payload.attachments.length === 0) return null;
      if (!store.chats.some((chat) => chat.id === chatId)) return null;

      const messageId = createId();
      const message: ChatMessage = {
        id: messageId,
        chatId,
        sender: "me",
        text: payload.text.trim(),
        attachments: payload.attachments,
        createdAt: new Date().toISOString(),
        seenByRecipient: false,
        reported: false,
      };

      updateStore((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [chatId]: [...(prev.messages[chatId] ?? []), message],
        },
      }));

      return messageId;
    },
    [store.chats, updateStore]
  );

  const markMessageSeen = useCallback(
    (chatId: string, messageId: string) => {
      updateStore((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [chatId]: (prev.messages[chatId] ?? []).map((message) =>
            message.id === messageId
              ? { ...message, seenByRecipient: true }
              : message
          ),
        },
      }));
    },
    [updateStore]
  );

  const reportChat = useCallback(
    (chatId: string) => {
      updateStore((prev) => ({
        ...prev,
        chats: prev.chats.map((chat) =>
          chat.id === chatId ? { ...chat, reported: true } : chat
        ),
      }));
    },
    [updateStore]
  );

  const reportMessage = useCallback(
    (chatId: string, messageId: string) => {
      updateStore((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [chatId]: (prev.messages[chatId] ?? []).map((message) =>
            message.id === messageId ? { ...message, reported: true } : message
          ),
        },
      }));
    },
    [updateStore]
  );

  const deleteChat = useCallback(
    (chatId: string) => {
      updateStore((prev) => {
        const nextMessages = { ...prev.messages };
        delete nextMessages[chatId];

        return {
          chats: prev.chats.filter((chat) => chat.id !== chatId),
          messages: nextMessages,
        };
      });
    },
    [updateStore]
  );

  return {
    ready: true,
    chats,
    getChatById,
    getMessagesByChatId,
    sendMessage,
    markMessageSeen,
    reportChat,
    reportMessage,
    deleteChat,
  };
};
