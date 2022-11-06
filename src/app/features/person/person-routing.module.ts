import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonHistoryPageComponent, PersonPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: PersonPageComponent,
  },
  {
    path: 'history',
    component: PersonHistoryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
