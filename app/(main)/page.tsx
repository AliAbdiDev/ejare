import { PostCardList, TPostCardList } from "@/core/components/custom/block/post-card";

const cardData: TPostCardList = [

  {
    hrefLink: '',
    title: ' درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم',
    price: 32000,
    location: "امامت",
    image: {
      src: '/common/fake.webp',
      alt: 'product'
    }
  },
  {
    hrefLink: '#',
    title: ' درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم',
    price: 32000,
    location: "امامت",
    image: {
      src: '/common/fake.webp',
      alt: 'product'
    }
  },
  {
    hrefLink: '#',
    title: ' درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم',
    price: 32000,
    location: "امامت",
    image: {
      src: '/common/fake.webp',
      alt: 'product'
    }
  },
  {
    hrefLink: '#',
    title: ' درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم',
    price: 32000,
    location: "امامت",
    image: {
      src: '/common/fake.webp',
      alt: 'product'
    }
  },
  {
    hrefLink: '#',
    title: ' درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم',
    price: 32000,
    location: "امامت",
    image: {
      src: '/common/fake.webp',
      alt: 'product'
    }
  },

]
export default function Home() {
  return (
    <div className="">
      <PostCardList cardItems={cardData} />
    </div>
  );
}
