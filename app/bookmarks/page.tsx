import { PostCardList, TPostCardList } from "@/core/components/custom/block/post-card";
import { Button } from "@/core/components/ui/button";
import { LucideShare2, Trash } from "lucide-react";

const BookmarkCardFooter = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <Button type="button" variant="outline" size="sm" className="h-8">
     <Trash/> حذف 
      </Button>
      <Button type="button" variant="outline" size="sm" className="h-8">
        <LucideShare2/> اشتراک گذاری
      </Button>
    </div>
  );
};

const bookmarkedPosts: TPostCardList = [
  {
    id: "bookmark-1",
    hrefLink: "#",
    inActiveLink: true,
    title:
      " درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم",
    price: 32000,
    location: "امامت",
    image: {
      src: "/common/fake.webp",
      alt: "product",
    },
    footerContent: <BookmarkCardFooter />,
  },
  {
    id: "bookmark-2",
    hrefLink: "#",
    inActiveLink: true,
    title:
      " درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم",
    price: 54000,
    location: "امامت",
    image: {
      src: "/common/fake.webp",
      alt: "product",
    },
    footerContent: <BookmarkCardFooter />,
  },
  {
    id: "bookmark-2",
    hrefLink: "#",
    inActiveLink: true,
    title:
      " درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم",
    price: 54000,
    location: "امامت",
    image: {
      src: "/common/fake.webp",
      alt: "product",
    },
    footerContent: <BookmarkCardFooter />,
  },
  {
    id: "bookmark-2",
    hrefLink: "#",
    inActiveLink: true,
    title:
      " درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم",
    price: 54000,
    location: "امامت",
    image: {
      src: "/common/fake.webp",
      alt: "product",
    },
    footerContent: <BookmarkCardFooter />,
  },
  {
    id: "bookmark-2",
    hrefLink: "#",
    inActiveLink: true,
    title:
      " درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم",
    price: 54000,
    location: "امامت",
    image: {
      src: "/common/fake.webp",
      alt: "product",
    },
    footerContent: <BookmarkCardFooter />,
  },
];

export default function BookmarksPage() {
  return <PostCardList cardItems={bookmarkedPosts} />;
}
