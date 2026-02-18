import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Link from "next/link";
import React from "react";

export interface IPostCard {
  title: string;
  price: number;
  location: string;
  image: {
    src: string;
    alt: string;
  };
  footerContent?: React.ReactNode;
}

export function PostCard({
  title = " درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم",
  price = 32000,
  location = "امامت",
  image = {
    src: "/common/fake.webp",
    alt: "product",
  },
  footerContent,
}: IPostCard) {
  return (
    <Card className="py-4">
      <CardContent className="flex items-start justify-between gap-2 px-4">
        <div className="flex flex-col items-start justify-between min-h-[136px]">
          <CardTitle className="text-pretty leading-7 truncate overflow-hidden text-ellipsis text-sm font-iransans-bold">
            {title?.length >= 40 ? `${title?.slice(0, 40)} ...` : title}
          </CardTitle>

          <CardDescription className="flex flex-col items-start justify-end ">
            <p>{price} تومان</p>
            <p>در {location}</p>
          </CardDescription>
        </div>

        <div className="relative size-[136px] overflow-hidden rounded-md shrink-0">
          <CardHeader>
            <Image alt={image.alt} src={image.src} fill className="size-full" />
          </CardHeader>
        </div>
      </CardContent>
      {footerContent && <CardFooter className="">{footerContent}</CardFooter>}
    </Card>
  );
}

export type TPostCardList = Array<
  IPostCard & { id?: string; hrefLink: string; inActiveLink?: boolean }
>;

export function PostCardList({ cardItems }: { cardItems: TPostCardList }) {
  return (
    <div className="space-y-4">
      {cardItems?.map((item, index) => (
        <React.Fragment key={item.id ?? index}>
          {!item?.inActiveLink ? (
            <Link href={item?.hrefLink || "#"} className="block">
              <PostCard {...item} />
            </Link>
          ) : (
            <PostCard {...item} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
