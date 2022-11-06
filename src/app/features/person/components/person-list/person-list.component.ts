import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { GenerationConfig, Person } from '../../models';
import { PersonService } from '../../services';
import { HistoryService } from '../../services/history.service';
import { HistoryGenerator } from '../../models/history-generator';

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
  dataSource: Observable<Person[]> = EMPTY;

  constructor(
    private readonly personService: PersonService,
    private readonly historyService: HistoryService
  ) {}

  generate(config: GenerationConfig) {
    this.historyService.save(this.mergeData(config));
    this.dataSource = this.personService.getPersons(config);
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
