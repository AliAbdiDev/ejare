export type ChatSender = "me" | "recipient";

export type ChatAttachment = {
  id: string;
  name: string;
  size: number;
  mimeType: string;
};

export type ChatMessage = {
  id: string;
  chatId: string;
  sender: ChatSender;
  text: string;
  attachments: ChatAttachment[];
  createdAt: string;
  seenByRecipient: boolean;
  reported: boolean;
};

export type ChatThread = {
  id: string;
  recipientName: string;
  recipientHandle: string;
  reported: boolean;
};

export type ChatStore = {
  chats: ChatThread[];
  messages: Record<string, ChatMessage[]>;
};

export type SendMessagePayload = {
  text: string;
  attachments: ChatAttachment[];
};

export type ChatSummary = ChatThread & {
  lastMessagePreview: string;
  lastMessageAt: string | null;
  lastOutgoingSeen: boolean | null;
};
