import type { PropsWithChildren } from "react";
import useCommonFilters from "@/hooks/filters/useCommonFilters";
import useRegions from "@/hooks/filters/useRegions";
import useBrands from "@/hooks/filters/useBrands";

interface FiltersProviderProps extends PropsWithChildren {
  enabled: boolean;
}

export default function FiltersProvider({
  children,
  enabled,
}: FiltersProviderProps) {
  useCommonFilters({ enabled });
  useRegions({ enabled });
  useBrands({ enabled });
  return children;
}
