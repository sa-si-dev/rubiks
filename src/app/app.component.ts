import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './shared/animations';
import { ThemeService } from './shared/theme.service'
import { Utils } from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    routeAnimations
  ]
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.set();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  onAppClick(e: any) {
    Utils.onAppClick(e);
  }
}
