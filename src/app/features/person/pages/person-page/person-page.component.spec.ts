import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPageComponent } from './person-page.component';
import {
  PersonGeneratorComponent,
  PersonListComponent,
} from '../../components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../../core';
import { PersonService } from '../../services';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonPageComponent', () => {
  let component: PersonPageComponent;
  let fixture: ComponentFixture<PersonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      declarations: [
        PersonPageComponent,
        PersonGeneratorComponent,
        PersonListComponent,
      ],
      providers: [
        ApiService,
        {
          provide: PersonService,
          useValue: {
            get: jest.fn().mockReturnValue(of(null)),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
