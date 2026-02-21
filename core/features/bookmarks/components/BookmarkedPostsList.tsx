"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LucideShare2, Trash } from "lucide-react";
import {
  PostCard,
  TPostCardList,
} from "@/core/components/custom/block/post-card";
import {
  ActionListDrawer,
  ActionListDrawerItem,
} from "@/core/components/custom/ui/ActionListDrawer";
import { Button } from "@/core/components/ui/button";
import { useLongPress } from "@/core/hooks/use-long-press";
import { useResponsive } from "@/core/hooks/use-responsive";

type BookmarkedPostsListProps = {
  cardItems: TPostCardList;
};

const LONG_PRESS_DURATION_MS = 300;
const LONG_PRESS_MOVE_CANCEL_THRESHOLD = 12;

const BookmarkDesktopActions = ({
  onDelete,
  onShare,
}: {
  onDelete: () => void;
  onShare: () => void;
}) => {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <Button type="button" variant="outline" size="sm" className="h-8" onClick={onDelete}>
        <Trash /> حذف
      </Button>
      <Button type="button" variant="outline" size="sm" className="h-8" onClick={onShare}>
        <LucideShare2 /> اشتراک گذاری
      </Button>
    </div>
  );
};

const BookmarkedPostItem = ({ item }: { item: TPostCardList[number] }) => {
  const [isActionsDrawerOpen, setIsActionsDrawerOpen] = useState(false);
  const responsive = useResponsive();
  const isTabletOrBelow = responsive.mobile || responsive.tablet;

  const handleDelete = () => {
    toast.success("آیتم از نشان‌شده‌ها حذف شد");
  };

  const handleShare = () => {
    toast.success("اشتراک گذاری انجام شد");
  };

  const longPress = useLongPress<HTMLDivElement>({
    onLongPress: () => setIsActionsDrawerOpen(true),
    durationMs: LONG_PRESS_DURATION_MS,
    moveCancelThreshold: LONG_PRESS_MOVE_CANCEL_THRESHOLD,
  });

  const actionItems: ActionListDrawerItem[] = [
    {
      id: "bookmark-delete",
      label: "حذف",
      icon: <Trash className="size-4" />,
      onSelect: handleDelete,
      destructive: true,
    },
    {
      id: "bookmark-share",
      label: "اشتراک گذاری",
      icon: <LucideShare2 className="size-4" />,
      onSelect: handleShare,
    },
  ];

  return (
    <>
      <div
        className="select-none"
        onPointerDown={(event) => {
          if (!isTabletOrBelow) return;
          longPress.onPointerDown(event);
        }}
        onPointerMove={(event) => {
          if (!isTabletOrBelow) return;
          longPress.onPointerMove(event);
        }}
        onPointerUp={() => {
          if (!isTabletOrBelow) return;
          longPress.onPointerUp();
        }}
        onPointerCancel={() => {
          if (!isTabletOrBelow) return;
          longPress.onPointerCancel();
        }}
        onPointerLeave={() => {
          if (!isTabletOrBelow) return;
          longPress.onPointerLeave();
        }}
      >
        <PostCard
          {...item}
          footerContent={
            isTabletOrBelow ? null : (
              <BookmarkDesktopActions onDelete={handleDelete} onShare={handleShare} />
            )
          }
        />
      </div>

      <ActionListDrawer
        open={isActionsDrawerOpen}
        onOpenChange={(open) => {
          setIsActionsDrawerOpen(open);
          if (!open) {
            longPress.reset();
          }
        }}
        title="گزینه های نشان شده"
        items={actionItems}
      />
    </>
  );
};

export const BookmarkedPostsList = ({ cardItems }: BookmarkedPostsListProps) => {
  return (
    <div className="space-y-4">
      {cardItems.map((item, index) => (
        <BookmarkedPostItem key={`${item.id ?? "bookmark"}-${index}`} item={item} />
      ))}
    </div>
  );
};
