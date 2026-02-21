import {
  TPostCardList,
} from "@/core/components/custom/block/post-card";
import AppHeader from "@/core/components/custom/layout/AppHeader";
import { BookmarkedPostsList } from "@/core/features/bookmarks/components/BookmarkedPostsList";
import Navbar from "@/core/features/home/components/Navbar";


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
  },
];

export default function BookmarksPage() {
  return (
    <>
      <AppHeader title="نشان شده ها" />
      <main className="pt-22.25 pb-6">
        <BookmarkedPostsList cardItems={bookmarkedPosts} />
      </main>
      <Navbar />
    </>
  );
}

