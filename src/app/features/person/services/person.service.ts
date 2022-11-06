import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { GenerationConfig, Person } from '../models';
import { ApiService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private readonly api: ApiService) {}

  getPersons(config: GenerationConfig): Observable<Person[]> {
    return this.api.get<Person[]>('/assets/data/persons.json').pipe(
      distinctUntilChanged(),
      map(persons => this.filterData(config, persons)),
      shareReplay(1)
    );
  }

  private filterData(config: GenerationConfig, persons: Person[]): Person[] {
    return persons
      .splice(0, config.count)
      .filter(
        person =>
          (config.gender.female &&
            person.gender.toLocaleLowerCase() === 'female') ||
          (config.gender.male && person.gender.toLocaleLowerCase() === 'male')
      );
  }
}
