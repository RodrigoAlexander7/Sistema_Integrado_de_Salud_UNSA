import { fetchPatients } from "@/utils/handleSearch";
import type { PatientSearchResult, SearchFilters } from "@/types/searchTypes";

export const SearchService = {
  searchPatients: async (filters: SearchFilters): Promise<PatientSearchResult[]> => {
    return fetchPatients(filters);
  }
};