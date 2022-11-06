import { Component, Input } from '@angular/core';
import { HistoryGenerator } from '../../models/history-generator';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-person-history',
  templateUrl: './person-history.component.html',
  styleUrls: ['./person-history.component.scss'],
})
export class PersonHistoryComponent {
  private readonly _historyGenerator$ = new BehaviorSubject<HistoryGenerator[]>(
    []
  );

  @Input() set historyGenerator(value: HistoryGenerator[]) {
    this._historyGenerator$.next(value);
  }

  get historyGenerator$(): Observable<HistoryGenerator[]> {
    return this._historyGenerator$.asObservable();
  }

  trackByGenerator(index: number, historyGenerator: HistoryGenerator): string {
    return `${index}-${historyGenerator.count}`;
  }
}
