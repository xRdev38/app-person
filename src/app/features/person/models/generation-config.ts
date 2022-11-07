import { Filters } from './filters-config';

export interface GenerationConfig {
  count: number;
  gender: {
    male: boolean;
    female: boolean;
  };
  filters: Filters;
}
