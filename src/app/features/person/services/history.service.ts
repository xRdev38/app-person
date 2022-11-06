import { Injectable } from '@angular/core';
import { HistoryGenerator } from '../models/history-generator';
import { LocalService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private readonly localService: LocalService) {}

  get<T>(key: string): T {
    return this.localService.getData(key);
  }

  save(data: HistoryGenerator[]): void {
    this.localService.saveData('history', JSON.stringify(data));
  }

  getData(key: string): HistoryGenerator[] {
    return this.localService.getData<HistoryGenerator[]>(key);
  }
}
