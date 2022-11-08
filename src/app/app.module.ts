import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    CoreModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
