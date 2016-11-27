import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-app-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent {

  @Input() mapElementId: string;

}
