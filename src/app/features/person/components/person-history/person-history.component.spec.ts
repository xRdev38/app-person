import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHistoryComponent } from './person-history.component';

describe('PersonHistoryComponent', () => {
  let component: PersonHistoryComponent;
  let fixture: ComponentFixture<PersonHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
