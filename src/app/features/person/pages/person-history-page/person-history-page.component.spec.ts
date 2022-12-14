import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHistoryPageComponent } from './person-history-page.component';
import {
  DBConfig,
  NgxIndexedDBModule,
  NgxIndexedDBService,
  CONFIG_TOKEN,
} from 'ngx-indexed-db';

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

describe('PersonHistoryPageComponent', () => {
  let component: PersonHistoryPageComponent;
  let fixture: ComponentFixture<PersonHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxIndexedDBModule],
      declarations: [PersonHistoryPageComponent],
      providers: [
        NgxIndexedDBService,
        { provide: CONFIG_TOKEN, useValue: dbConfig },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
