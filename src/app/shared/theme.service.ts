import { Injectable } from '@angular/core';
import { themes } from './themes';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(
    private db: DatabaseService
  ) {}

  toggle() {
    let activeTheme = this.db.get('activeTheme');
    this.set(activeTheme === 'dark' ? 'light' : 'dark');
  }

  get() {
    return this.db.get('activeTheme');
  }

  set(name: string = '') {
    if (!name) {
      name = this.db.get('activeTheme') || 'light';
    } else {
      this.db.set('activeTheme', name);
    }

    let properties = themes[name].properties;

    Object.keys(properties).forEach(k => {
      document.documentElement.style.setProperty(k, properties[k]);
    });
  }
}