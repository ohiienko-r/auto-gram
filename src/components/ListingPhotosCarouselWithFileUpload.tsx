import { useState, useEffect, useRef, type ChangeEvent, useMemo } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

import ArrowUpIcon from "@/icons/ArrowUpIcon";
import OldSchoolCarIcon from "@/icons/OldSchoolCarIcon";
import TrashIcon from "@/icons/TrashIcon";

const MAX_PHOTOS_COUNT = 15;
const MAX_FILE_SIZE = 10000000;

interface ListingPhotosCarouselProps {
  data?: { id: string; photo: File | string }[];
  onPhotoAdd?: (photo: File) => void;
  onPhotoRemove?: (index: number) => void;
}

export default function ListingPhotosCarouselWithFileUpload({
  data = [],
  onPhotoAdd,
  onPhotoRemove,
}: ListingPhotosCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [fileTooLarge, setFileTooLarge] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleCarouselChange = () => {
      if (!api) return;

      setCurrentItem(api.selectedScrollSnap() + 1);
    };

    handleCarouselChange();
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const handleItemChange = () => {
      setCurrentItem(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleItemChange);

    return () => {
      api.off("select", handleItemChange);
    };
  }, [api, data]);

  const handleUploadFileClick = () => {
    setFileTooLarge(false);
    fileInputRef?.current?.click();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhoto = e.target.files ? e.target.files[0] : null;

    if (!newPhoto) return;

    if (newPhoto.size > MAX_FILE_SIZE) {
      setFileTooLarge(true);
      return;
    }

    onPhotoAdd?.(newPhoto);

    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOnPhotoRemove = () => {
    onPhotoRemove?.(currentItem - 1);

    api?.scrollTo(0, true);
  };

  const unifiedItems = useMemo(() => {
    if (!data?.length) return [];

    return data.map((item) => ({
      ...item,
      photo:
        typeof item.photo === "string"
          ? item.photo
          : URL.createObjectURL(item.photo),
    }));
  }, [data]);

  useEffect(() => {
    return () => {
      unifiedItems.forEach((item) => {
        if (typeof item.photo === "string") return;
        URL.revokeObjectURL(item.photo);
      });
    };
  }, [unifiedItems]);

  return (
    <div className="relative rounded-2xl w-full overflow-hidden">
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent>
          {unifiedItems?.map((item) => (
            <CarouselItem
              key={item.id}
              className="rounded-2xl h-[220px] overflow-hidden select-none"
            >
              <img
                src={item.photo}
                className="bg-primary/10 rounded-2xl size-full object-cover"
              />
            </CarouselItem>
          ))}

          {/* Upload file trigger button slide */}
          {data?.length <= MAX_PHOTOS_COUNT && (
            <CarouselItem className="h-[220px] select-none">
              <button
                type="button"
                onClick={handleUploadFileClick}
                className="relative flex flex-col justify-center items-center gap-3 bg-primary/20 rounded-2xl size-full text-center cursor-pointer"
              >
                <span className="flex justify-center items-center bg-white rounded-[12px] size-11 shrink-0">
                  <ArrowUpIcon className="text-primary" />
                </span>

                <p className="max-w-54 font-medium text-base">
                  Завантажте фото максимальний розмір 10мб
                </p>

                {fileTooLarge && (
                  <p className="font-medium text-red-600">
                    Файл занадто великий
                  </p>
                )}

                <OldSchoolCarIcon className="right-0 bottom-0 -z-1 absolute opacity-20" />
              </button>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      {/* Floating items count with current item & remove item button*/}
      {data?.length > 0 && (
        <div className="bottom-2.5 left-2.5 absolute flex items-center gap-2">
          <div className="flex justify-center items-center bg-white px-3 rounded-[12px] h-[35px] font-medium text-base">
            {currentItem <= data?.length - 1 ? currentItem : data?.length ?? 0}/
            {data?.length ?? 0}
          </div>

          {currentItem <= data?.length && (
            <button
              type="button"
              onClick={handleOnPhotoRemove}
              className="flex justify-center items-center bg-white rounded-[12px] size-[35px] text-primary"
            >
              <TrashIcon />
            </button>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleOnChange}
      />
    </div>
  );
}
