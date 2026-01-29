import { useEffect, useState } from "react";

import type { UseFormReset } from "react-hook-form";
import type { EditListingFormValues } from "../validation/validation";
import type { CarListing, Option } from "@/types/app";
import type { CommonFilters, FilterLookup } from "@/types/filters";

interface UseResetEditListingFormProps {
  details?: CarListing;
  brands: Option[] | null;
  carBrandModels: { label: string; value: string }[];
  commonFilters: CommonFilters | null;
  regions: Option[] | null;
  settlements?: FilterLookup[];
  reset: UseFormReset<EditListingFormValues>;
}

export default function useResetEditListingForm({
  details,
  brands,
  carBrandModels,
  commonFilters,
  regions,
  settlements,
  reset,
}: UseResetEditListingFormProps) {
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const handleResetEditListingForm = () => {
      setResetting(true);

      if (details) {
        const carBrand = brands?.find((brand) => brand.label === details.brand);
        const carModel = carBrandModels?.find(
          (model) => model.label === details.model,
        );
        const typeOfCar = commonFilters?.type_of_car?.find(
          (type) => type.name === details.type_of_car,
        );
        const carCondition = commonFilters?.condition.find(
          (condition) => condition.name === details.condition,
        );
        const carRegion = regions?.find(
          (region) => region.label === details?.region,
        );
        const carSettlement = settlements?.find(
          (settlement) => settlement.name === details?.settlement,
        );
        const carFuelType = commonFilters?.fuel_type?.find(
          (fuelType) => fuelType.name === details?.fuel_type,
        );
        const carGearbox = commonFilters?.gearbox?.find(
          (gearbox) => gearbox.name === details?.gearbox,
        );
        const carBodyType = commonFilters?.body_type?.find(
          (body) => body.name === details?.body_type,
        );
        const carDriveType = commonFilters?.drive_type?.find(
          (driveType) => driveType?.value === details?.drive_type,
        );

        reset({
          brand: Number(carBrand?.value) || null,
          model: Number(carModel?.value) || null,
          price: String(details?.price),
          bargaining: details?.bargaining,
          type_of_car: typeOfCar?.id,
          condition: carCondition?.id,
          mileage: String(details?.mileage),
          region: Number(carRegion?.value) || null,
          settlement: carSettlement?.id,
          engine_capacity_l: details?.engine_capacity_l,
          fuel_type: carFuelType?.id,
          gearbox: carGearbox?.id,
          body_type: carBodyType?.id,
          drive_type: carDriveType?.value,
          year: details?.year,
          vin_number: details?.vin_number || "",
        });
      }

      setResetting(false);
    };

    handleResetEditListingForm();
  }, [
    details,
    reset,
    brands,
    carBrandModels,
    commonFilters,
    regions,
    settlements,
  ]);

  return resetting;
}
