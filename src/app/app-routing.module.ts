import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'personnes',
    loadChildren: () =>
      import('./features/person/person.module').then(m => m.PersonModule),
  },
  {
    path: 'apropos',
    loadChildren: () =>
      import('./features/about/about.module').then(m => m.AboutModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'personnes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
