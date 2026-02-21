import AppHeader from "@/core/components/custom/layout/AppHeader";
import { ChatListView } from "@/core/features/chat/components/ChatListView";
import Navbar from "@/core/features/home/components/Navbar";

export default function ChatPage() {
  return (
    <>
      <AppHeader title="چت و تماس" />
      <main className="h-full overflow-y-auto pt-22.25 pb-6">
        <ChatListView />
        <Navbar />
      </main>
    </>
  );
}
