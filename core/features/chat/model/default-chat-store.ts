import { ChatStore } from "@/core/features/chat/model/types";

const minutesAgo = (minutes: number): string =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

export const DEFAULT_CHAT_STORE: ChatStore = {
  chats: [
    {
      id: "chat-alex",
      recipientName: "Alex Morgan",
      recipientHandle: "@alex.m",
      reported: false,
    },
    {
      id: "chat-sam",
      recipientName: "Sam Lee",
      recipientHandle: "@sam.lee",
      reported: false,
    },
    {
      id: "chat-jordan",
      recipientName: "Jordan Kim",
      recipientHandle: "@jordan.k",
      reported: false,
    },
  ],
  messages: {
    "chat-alex": [
      {
        id: "m-alex-1",
        chatId: "chat-alex",
        sender: "recipient",
        text: "Hi, is this still available?",
        attachments: [],
        createdAt: minutesAgo(120),
        seenByRecipient: false,
        reported: false,
      },
      {
        id: "m-alex-2",
        chatId: "chat-alex",
        sender: "me",
        text: "Yes, it is available. You can pick it up today.",
        attachments: [],
        createdAt: minutesAgo(110),
        seenByRecipient: true,
        reported: false,
      },
      {
        id: "m-alex-3",
        chatId: "chat-alex",
        sender: "recipient",
        text: "Perfect, please share your location.",
        attachments: [],
        createdAt: minutesAgo(90),
        seenByRecipient: false,
        reported: false,
      },
    ],
    "chat-sam": [
      {
        id: "m-sam-1",
        chatId: "chat-sam",
        sender: "me",
        text: "Can you send more photos?",
        attachments: [],
        createdAt: minutesAgo(80),
        seenByRecipient: false,
        reported: false,
      },
      {
        id: "m-sam-2",
        chatId: "chat-sam",
        sender: "recipient",
        text: "Sure, I will send them in a minute.",
        attachments: [],
        createdAt: minutesAgo(70),
        seenByRecipient: false,
        reported: false,
      },
      {
        id: "m-sam-3",
        chatId: "chat-sam",
        sender: "me",
        text: "Thanks. I also attached the receipt.",
        attachments: [
          {
            id: "a-sam-1",
            name: "receipt.pdf",
            size: 248100,
            mimeType: "application/pdf",
          },
        ],
        createdAt: minutesAgo(55),
        seenByRecipient: false,
        reported: false,
      },
    ],
    "chat-jordan": [
      {
        id: "m-jordan-1",
        chatId: "chat-jordan",
        sender: "recipient",
        text: "Can we meet tomorrow at 10 AM?",
        attachments: [],
        createdAt: minutesAgo(45),
        seenByRecipient: false,
        reported: false,
      },
      {
        id: "m-jordan-2",
        chatId: "chat-jordan",
        sender: "me",
        text: "Yes, tomorrow at 10 AM works.",
        attachments: [],
        createdAt: minutesAgo(40),
        seenByRecipient: true,
        reported: false,
      },
    ],
  },
};
