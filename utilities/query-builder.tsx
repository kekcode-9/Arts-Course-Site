import { FilterTypes } from "./types";

export default function buildQueriesArray(filters: FilterTypes) {
    return Object.entries(filters).map(
        ([key, value]) => {
          return {
            field: `${key}`,
            operator: key !== "rating" ? "==" : ">=",
            value: key !== "rating" ? value : Number(value),
          };
        }
      );
}