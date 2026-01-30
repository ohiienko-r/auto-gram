import { useEffect, useState } from "react";

import type { UseFormReset } from "react-hook-form";
import type { EditListingFormValues } from "../validation/validation";
import type { Option } from "@/types/app";
import type { GetEditListingDetailsResponse } from "@/types/listing";
import type { CommonFilters, FilterLookup } from "@/types/filters";

interface UseResetEditListingFormProps {
  details?: GetEditListingDetailsResponse;
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
        reset({
          brand: details.values.brand,
          model: details.values.model,
          price: String(details.values.price),
          bargaining: details.values.bargaining,
          type_of_car: details.values.type_of_car,
          condition: details.values.condition,
          mileage: String(details.values.mileage),
          region: details.values.region,
          settlement: details.values.settlement,
          engine_capacity_l: details.values.engine_capacity_l,
          fuel_type: details.values.fuel_type,
          gearbox: details.values.gearbox,
          body_type: details.values.body_type,
          drive_type: details.values.drive_type,
          year: details.values.year,
          vin_number: details.values.vin_number,
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
