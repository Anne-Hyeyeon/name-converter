import updatesData from "../data/updates.json";
import { Update } from "../types";

export function getAllUpdateData(): Update[] {
 return updatesData
  .map((update) => ({
   ...update,
   names: update.names.match(/[A-Z][a-z]+/g) || [],
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
