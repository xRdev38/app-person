import { Component, OnInit } from '@angular/core';
import { HistoryGenerator } from '../../models/history-generator';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-history-page',
  templateUrl: './person-history-page.component.html',
  styleUrls: ['./person-history-page.component.scss'],
})
export class PersonHistoryPageComponent implements OnInit {
  historyList$: Observable<HistoryGenerator[]>;

  constructor(private readonly historyService: NgxIndexedDBService) {}

  ngOnInit(): void {
    this.historyList$ = this.historyService.getAll('history');
  }
}
