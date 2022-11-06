import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getData<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearData(): void {
    localStorage.clear();
  }
}
