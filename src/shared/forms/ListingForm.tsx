import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { viewport } from "@tma.js/sdk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ListingFormSchema,
  type ListingFormValues,
} from "../validation/validation";

import {
  TYPEOF_TRANSPORT,
  TRANSPORT_OPTIONS,
  CAR_BRANDS_OPTIONS,
  CAR_CONDITION,
  CAR_CONDITION_OPTIONS,
  CAR_ACCIDENT,
  CAR_ACCIDENT_OPTIONS,
  FUEL_TYPE,
  FUEL_TYPE_OPTIONS,
  TRANSMISSION_TYPE,
  TRANSMISSION_TYPE_OPTIONS,
  REGIONS_OPTIONS,
  BODY_TYPE,
  BODY_TYPE_OPTIONS,
  SUSPENSION_TYPE,
  SUSPENSION_TYPE_OPTIONS,
  DRIVE_TYPE,
  DRIVE_TYPE_OPTIONS,
  CAR_COUNTRIES_OPTIONS,
} from "@/constants/transport";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/Card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ListingPhotosCarouselWithFileUpload from "@/components/ListingPhotosCarouselWithFileUpload";
import Select from "@/components/Select";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import CheckMarkIcon from "@/icons/CheckMarkIcon";

export default function ListingForm() {
  const { bottom } = viewport.safeAreaInsets();
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(ListingFormSchema),
    defaultValues: {
      photos: [],
      priceUsd: "0",
      priceUah: "0",
      possibleBargain: false,
      typeofTransport: TYPEOF_TRANSPORT.PASSENGER,
      kilometrage: "0",
      noKilometrage: false,
      carAccident: CAR_ACCIDENT.NO,
      fuelType: FUEL_TYPE.PETROL,
      transmission: TRANSMISSION_TYPE.MANUAL,
      bodyType: BODY_TYPE.SEDAN,
      suspension: SUSPENSION_TYPE.FULL,
      driveType: DRIVE_TYPE.FWD,
    },
  });
  const navigate = useNavigate();

  const { control, watch, setValue } = form;

  const noKilometrage = watch("noKilometrage");

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "photos",
    keyName: "id",
  });

  const handleAddPhoto = (photo: File) => [
    append({ id: window.crypto.randomUUID(), photo }),
  ];

  return (
    <Card style={{ paddingBottom: (bottom || 20) + 90 }}>
      <Form {...form}>
        <form id="listing-form" className="flex flex-col gap-8">
          <ListingPhotosCarouselWithFileUpload
            data={fields}
            onPhotoAdd={handleAddPhoto}
            onPhotoRemove={remove}
          />

          <CardContent className="pt-0">
            <FormField
              control={control}
              name="carBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Марка*</FormLabel>

                  <Select
                    listTitle="Марка"
                    options={CAR_BRANDS_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="carModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Модель*</FormLabel>

                  <Select
                    listTitle="Модель"
                    options={CAR_BRANDS_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3">
              <div className="gap-3 grid grid-cols-2">
                <FormField
                  control={control}
                  name="priceUsd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ціна $</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Ціна USD"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="priceUah"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ціна ₴</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Ціна UAH"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="possibleBargain"
                render={({ field }) => (
                  <FormItem className="justify-items-start">
                    <FormControl>
                      <Toggle
                        pressed={field.value}
                        onPressedChange={field.onChange}
                      >
                        Можливен торг
                      </Toggle>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="typeofTransport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип траспорта*</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {TRANSPORT_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Стан*</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {CAR_CONDITION_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="items-end gap-3 grid grid-cols-2">
              <FormField
                control={control}
                name="kilometrage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пробіг*</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        disabled={noKilometrage}
                        placeholder="тис. км."
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="noKilometrage"
                render={({ field }) => (
                  <FormItem className="justify-items-start">
                    <FormControl>
                      <Toggle
                        pressed={field.value}
                        onPressedChange={(val) => {
                          field.onChange(val);

                          if (val) {
                            setValue("kilometrage", "0");
                          }
                        }}
                      >
                        Без пробігу
                      </Toggle>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регіон*</FormLabel>

                  <Select
                    listTitle="Регіон"
                    options={REGIONS_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="carAccident"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Участь в ДТП</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {CAR_ACCIDENT_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Паливо*</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {FUEL_TYPE_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Коробка передач</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {TRANSMISSION_TYPE_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bodyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип кузова</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {BODY_TYPE_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="suspension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Підвіска</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {SUSPENSION_TYPE_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="driveType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Привод</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {DRIVE_TYPE_OPTIONS.map((option) => (
                        <ToggleGroupItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="carCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Країна виробник</FormLabel>

                  <Select
                    listTitle="Країна"
                    options={CAR_COUNTRIES_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </CardContent>

          <div
            className="bottom-0 left-0 fixed items-center gap-3 grid grid-cols-2 bg-white px-8.5 pt-5 border-grey border-t rounded-t-2xl w-full"
            style={{ paddingBottom: bottom || "20px" }}
          >
            <Button
              type="button"
              variant={"secondary"}
              className="bg-grey hover:bg-grey/90"
              onClick={() => navigate(-1)}
            >
              Скасувати
            </Button>

            <Button>
              Зберегти <CheckMarkIcon />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
