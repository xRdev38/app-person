import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { HistoryGenerator } from '../../models/history-generator';

@Component({
  selector: 'app-person-history-page',
  templateUrl: './person-history-page.component.html',
  styleUrls: ['./person-history-page.component.scss'],
})
export class PersonHistoryPageComponent implements OnInit {
  historyList: HistoryGenerator[];

  constructor(private readonly historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyList = this.historyService.getData('history');
  }
}
