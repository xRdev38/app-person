import { RouterTestingModule } from '@angular/router/testing';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { PersonModule } from './features/person/person.module';
import { AboutModule } from './features/about/about.module';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent],
    imports: [
      CoreModule,
      AboutModule,
      PersonModule,
      RouterTestingModule.withRoutes([]),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  test('should render title in a h1 tag', () => {
    expect(spectator.element.querySelector('h1').textContent).toContain(
      'Test technique Angular'
    );
  });
});
