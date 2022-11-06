import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components';
import { AboutPageComponent } from './pages';

@NgModule({
  declarations: [AboutComponent, AboutPageComponent],
  imports: [CommonModule, MatButtonModule, AboutRoutingModule],
})
export class AboutModule {}
