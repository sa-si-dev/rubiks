import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';
import { ThemeService } from '../shared/theme.service';
import { DatabaseService } from '../shared/database.service';
import { I18nService } from '../shared/i18n.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  themeMenuStatus: any;
  soundMenuStatus: any;
  soundMenuIcon: any;
  i18n: any;

  constructor(
    private themeService: ThemeService,
    private db: DatabaseService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.i18n = this.i18nService.get();

    this.setThemeStatus();
    this.setSoundStatus();
  }

  setThemeStatus() {
    this.themeMenuStatus = this.themeService.get() === 'dark'? 'Disable' : 'Enable';
  }

  setSoundStatus() {
    if (this.db.get('soundStatus') === 'disabled') {
      this.soundMenuStatus = 'Enable';
      this.soundMenuIcon = 'sound-off';
    } else {
      this.soundMenuStatus = 'Disable';
      this.soundMenuIcon = 'sound-on';
    }
  }

  togglePopover(e: any) {
    Utils.togglePopover(e);
  }

  toggleTheme() {
    this.themeService.toggle();
    this.setThemeStatus();
  }

  toggleSound() {
    this.db.set('soundStatus', this.db.get('soundStatus') === 'disabled' ? 'enabled' : 'disabled');
    this.setSoundStatus();
  }
}