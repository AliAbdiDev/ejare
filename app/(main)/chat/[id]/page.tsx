import { ChatConversationView } from "@/core/features/chat/components/ChatConversationView";

export default async function ChatDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChatConversationView chatId={id} />;
}
