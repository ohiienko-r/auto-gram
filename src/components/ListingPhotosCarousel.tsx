import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

export default function ListingPhotosCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleCarouselChange = () => {
      if (!api) return;

      setCount(api.scrollSnapList().length);
      setCurrentItem(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrentItem(api.selectedScrollSnap() + 1);
      });
    };

    handleCarouselChange();
  }, [api]);

  return (
    <div className="relative bg-primary/20 rounded-2xl w-full overflow-hidden">
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-[220px] select-none">
              <div className="flex justify-center items-center p-6 size-full">
                <span className="font-semibold text-4xl">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="bottom-2.5 left-2.5 absolute flex justify-center items-center bg-white px-3 rounded-[12px] h-[35px] font-medium text-base">
        {currentItem}/{count}
      </div>
    </div>
  );
}
