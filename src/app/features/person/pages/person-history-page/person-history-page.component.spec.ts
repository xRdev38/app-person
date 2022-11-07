import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHistoryPageComponent } from './person-history-page.component';

describe('PersonHistoryPageComponent', () => {
  let component: PersonHistoryPageComponent;
  let fixture: ComponentFixture<PersonHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonHistoryPageComponent],
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
