import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface ListingPhotosCarouselProps {
  data?: string[];
}

export default function ListingPhotosCarousel({
  data,
}: ListingPhotosCarouselProps) {
  return (
    <div className="relative rounded-2xl w-full overflow-hidden">
      <Carousel className="h-full">
        <CarouselContent>
          {data?.map((photoUrl) => (
            <CarouselItem
              key={photoUrl}
              className="rounded-2xl h-[220px] overflow-hidden select-none"
            >
              <img
                src={photoUrl}
                alt=""
                className="bg-primary/10 rounded-2xl size-full object-cover"
              />
            </CarouselItem>
          ))}
          {(data?.length === 0 || !data) && (
            <CarouselItem className="rounded-2xl h-[220px] overflow-hidden select-none">
              <img
                src="https://placehold.co/375x200?text=?"
                alt=""
                className="bg-primary/10 rounded-2xl size-full object-cover"
              />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
