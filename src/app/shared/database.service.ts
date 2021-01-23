import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor() {}

  get(key: string, valueType: any = 'string') {
    let value: any = localStorage.getItem(key);

    if (valueType === 'number') {
      value = value ? parseFloat(value) : 0;
    } else if (valueType === 'boolean') {
      value = value === 'true' ? true : false;
    }

    return value;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}