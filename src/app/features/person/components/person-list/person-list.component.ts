import { Component } from '@angular/core';
import { take } from 'rxjs';
import { GenerationConfig, Person } from '../../models';
import { PersonService } from '../../services';
import { HistoryService } from '../../services/history.service';
import { HistoryGenerator } from '../../models/history-generator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'gender',
    'email',
  ];
  dataSource!: MatTableDataSource<Person>;

  constructor(
    private readonly personService: PersonService,
    private readonly historyService: HistoryService
  ) {}

  generate(config: GenerationConfig) {
    this.historyService.save(this.mergeData(config));
    this.personService
      .getPersons(config)
      .pipe(take(1))
      .subscribe({
        next: value => (this.dataSource = new MatTableDataSource(value)),
      });
  }

  filters(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  private mergeData(config: GenerationConfig): HistoryGenerator[] {
    let dataFromLocal = this.historyService.getData('history');
    if (dataFromLocal === null) {
      dataFromLocal = [];
    }
    return [
      ...dataFromLocal,
      ...[
        {
          count: config.count,
          createDate: new Date(Date.now()),
        },
      ],
    ];
  }
}
