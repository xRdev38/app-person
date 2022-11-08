import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { PersonGeneratorComponent } from '../person-generator/person-generator.component';
import { PersonListComponent } from './person-list.component';
import { ApiService } from '../../../../core';
import { PersonService } from '../../services';
import {
  DBConfig,
  NgxIndexedDBModule,
  NgxIndexedDBService,
  CONFIG_TOKEN,
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

describe('PersonListComponent', () => {
  let spectator: Spectator<PersonListComponent>;
  const createComponent = createComponentFactory({
    component: PersonListComponent,
    declarations: [PersonListComponent, PersonGeneratorComponent],
    imports: [
      MatTableModule,
      MatCheckboxModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      NoopAnimationsModule,
      NgxIndexedDBModule,
    ],
    providers: [
      ApiService,
      PersonService,
      {
        provide: NgxIndexedDBService,
        useValue: jest.fn().mockReturnValue(of([])),
      },
      { provide: CONFIG_TOKEN, useValue: dbConfig },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
