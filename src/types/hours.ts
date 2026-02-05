export interface Hour {
  id: string;
  horaires_base: {
    base_start: string;
    base_end: string;
    dimanche_start: string;
    dimanche_end: string;
  };
  horaires_ete: {
    ete_date_from: string;
    ete_date_to: string;
    ete_start: string;
    ete_end: string;
  };
  horaires_hiver: {
    noel_date_from: string;
    noel_date_to: string;
    fevrier_date_from: string;
    fevrier_date_to: string;
    hiver_start: string;
    hiver_end: string;
  };
  closed_dates?:
    | {
        date: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
