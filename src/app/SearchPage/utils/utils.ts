/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SearchFormValues } from "../validation/validation";
import type { SaveSearchPayload } from "@/types/search";

export function transformSearchPayload(
  name: string,
  formValues: Partial<SearchFormValues>,
) {
  const transformed: SaveSearchPayload = { name };

  Object.entries(formValues).forEach(([key, value]) => {
    const newKey = key.endsWith("_id") ? key.slice(0, -3) : key;
    (transformed as Record<string, any>)[newKey] = value;
  });

  return transformed;
}
