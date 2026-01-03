import type { Option } from "./app";

export interface FilterLookup {
  id: number;
  name: string;
}

export interface GenericFilters {
  [key: string]: FilterLookup[];
}

export interface RangeFilter {
  min: number;
  max: number;
}

export interface CommonFilters {
  body_type: FilterLookup[];
  condition: FilterLookup[];
  drive_type: Option[];
  fuel_type: FilterLookup[];
  gearbox: FilterLookup[];
  ranges: {
    engine_capacity_l: { unit: string } & RangeFilter;
    milage: { unit: string } & RangeFilter;
    price: { currency: string } & RangeFilter;
    year: RangeFilter;
  };
  salon_material: Option[];
  type_of_car: FilterLookup[];
}
