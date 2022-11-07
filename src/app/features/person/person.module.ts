import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PersonRoutingModule } from './person-routing.module';
import { PersonGeneratorComponent, PersonListComponent } from './components';
import { PersonService } from './services';
import { PersonPageComponent, PersonHistoryPageComponent } from './pages';
import { PersonHistoryComponent } from './components/person-history/person-history.component';
import { MatCardModule } from '@angular/material/card';
import { PersonGenderPipe } from './pipes/person-gender.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonGeneratorComponent,
    PersonPageComponent,
    PersonHistoryComponent,
    PersonHistoryPageComponent,
    PersonGenderPipe,
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatPaginatorModule,
  ],
  exports: [PersonListComponent, PersonGeneratorComponent, PersonPageComponent],
})
export class PersonModule {
  static forRoot(): ModuleWithProviders<PersonModule> {
    return {
      ngModule: PersonModule,
      providers: [PersonService],
    };
  }
}
