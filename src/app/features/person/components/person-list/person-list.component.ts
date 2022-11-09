import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription, take, tap } from 'rxjs';
import { GenerationConfig, Person } from '../../models';
import { PersonService } from '../../services';
import { MatTableDataSource } from '@angular/material/table';
import { NgxIndexedDBService, WithID } from 'ngx-indexed-db';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'gender',
    'email',
  ];
  dataSource!: MatTableDataSource<Person>;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly personService: PersonService,
    private readonly historyService: NgxIndexedDBService,
    private readonly breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe(['(min-width: 978px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.addColumn();
          } else {
            this.removeColumn();
          }
        })
    );
  }

  generate(config: GenerationConfig) {
    combineLatest([this.setDb(config), this.getPersons(config)])
      .pipe(
        take(1),
        tap(
          ([_, persons]: [
            { count: string; createDate: string } & WithID,
            Person[]
          ]) => {
            this.dataSource = new MatTableDataSource(persons);
          }
        )
      )
      .subscribe();
  }

  filters(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  private addColumn() {
    if (!this.displayedColumns.includes('id')) {
      this.displayedColumns.unshift('id');
    }

    if (!this.displayedColumns.includes('email')) {
      this.displayedColumns.push('email');
    }
  }

  private removeColumn() {
    if (!!this.displayedColumns?.length) {
      this.displayedColumns.shift();
      this.displayedColumns.pop();
    }
  }

  private setDb(
    config: GenerationConfig
  ): Observable<{ count: string; createDate: string } & WithID> {
    return this.historyService.add('history', {
      count: `${config.count}`,
      createDate: `${new Date(Date.now()).toString()}`,
    });
  }

  private getPersons(config: GenerationConfig): Observable<Person[]> {
    return this.personService.getPersons(config);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
