import type { SearchFormValues } from "@/app/SearchPage/validation/validation";

export interface SaveSearchPayload extends Partial<SearchFormValues> {
  name: string;
}
