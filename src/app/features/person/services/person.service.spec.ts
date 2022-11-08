import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import {
  createComponentFactory,
  createHttpFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { PersonService } from './person.service';
import { Person } from '../models';
import { PersonGeneratorComponent, PersonListComponent } from '../components';
import { ApiService } from '../../../core';
import {
  CONFIG_TOKEN,
  DBConfig,
  NgxIndexedDBModule,
  NgxIndexedDBService,
} from 'ngx-indexed-db';
import { of } from 'rxjs';

const dbConfig: DBConfig = {
  name: 'DbPerson',
  version: 1,
  objectStoresMeta: [
    {
      store: 'history',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'count', keypath: 'count', options: { unique: false } },
        {
          name: 'createDate',
          keypath: 'createDate',
          options: { unique: false },
        },
      ],
    },
  ],
};

const PERSONS: Person[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'REESE',
    email: 'john@reese.com',
    gender: 'Male',
  },
  {
    id: 2,
    firstName: 'Harold',
    lastName: 'FINCH',
    email: 'harold@finch.com',
    gender: 'Male',
  },
  {
    id: 3,
    firstName: 'Joss',
    lastName: 'CARTER',
    email: 'joss@carter.com',
    gender: 'Female',
  },
];

const DEFAULT_CONFIG = {
  count: 3,
  gender: {
    male: true,
    female: true,
  },
  filters: {
    name: '',
  },
};

describe('PersonListComponent', () => {
  let spectator: Spectator<PersonListComponent>;
  let spectatorHttp: SpectatorHttp<PersonService>;

  const createHttp = createHttpFactory(PersonService);
  const createComponent = createComponentFactory({
    /* eslint-disable */
    component: PersonListComponent,
    declarations: [PersonListComponent, PersonGeneratorComponent],
    providers: [
      {
        provide: ApiService,
        useValue: {
          get: jest.fn().mockReturnValue(of([])),
        },
      },
      NgxIndexedDBService,
      { provide: CONFIG_TOKEN, useValue: dbConfig },
    ],
    imports: [
      MatTableModule,
      MatCheckboxModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      NoopAnimationsModule,
      NgxIndexedDBModule,
      RouterTestingModule.withRoutes([]),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectatorHttp = createHttp();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  test('should provide a list of 3 persons', done => {
    let values: Person[] = [];
    expect(spectatorHttp.service.getPersons).toBeTruthy();

    spectatorHttp.service.getPersons(DEFAULT_CONFIG).subscribe({
      next: (element: Person[]) => {
        values = [...values, ...element];
        expect(values?.length).toBe(1);
      },
      error: () => {},
      complete: () => {
        expect(values.map(p => p.id)).toEqual([1, 2, 3]);
        done();
      },
    });
    spectatorHttp.expectOne('/assets/data/persons.json', HttpMethod.GET);

    spectatorHttp.service.getPersons(DEFAULT_CONFIG).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        done();
      },
    });
    const reqs = spectatorHttp.expectConcurrent([
      { url: '/assets/data/persons.json', method: HttpMethod.GET },
    ]);

    spectatorHttp.flushAll(reqs, [PERSONS]);
  });
});
