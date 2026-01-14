export interface IconProps {
  className?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface PaginatedResponse<T> {
  mode: "recommendations" | "search";
  count: number;
  limit: number;
  offset: number;
  results: T[];
}

export interface CarListing {
  id: number;
  brand: string;
  model: string;
  price: number;
  bargaining: boolean;
  mileage: number;
  drive_type: string;
  salon_material: string;
  engine_capacity_l: string;
  year: number;
  region: string;
  settlement: string;
  type_of_car: string;
  condition: string;
  fuel_type: string;
  gearbox: string;
  body_type: string;
  files: string[];
  created_at: string;
  is_liked: boolean;
}

export interface MyCarListing {
  id: number;
  status: string;
  title: string;
  price: number;
  price_uah: number;
  created_at: string;
  created_ago: string;
  cover: string;
  views: {
    last_24h: number;
    last_7d: number;
    all_time: number;
  };
}
