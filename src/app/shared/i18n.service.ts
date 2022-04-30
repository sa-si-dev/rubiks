import { Injectable } from '@angular/core';

import i18nData from './i18n';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  i18n: any;

  constructor(
    private db: DatabaseService
  ) {
    this.set();
  }

  get() {
    return this.i18n;
  }

  set(language?: string) {
    if (language) {
      this.db.set('language', language);
    } else {
      language = this.db.get('language');
    }

    let result = Object.assign({}, i18nData.default);

    if (language && language !== 'default') {
      result = Object.assign(result, i18nData[language]);
    }

    this.i18n = result;
  }
}
