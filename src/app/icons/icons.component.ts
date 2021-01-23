import { Component, Input } from '@angular/core';

@Component({
  selector: 'icons',
  templateUrl: './icons.component.html'
})
export class IconsComponent {
  @Input() name: string = '';
}