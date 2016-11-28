import { Component, Input } from '@angular/core';

import { Location } from '../shared/location.model';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'my-app-ui-panel',
  templateUrl: './ui-panel.component.html',
  styleUrls: ['./ui-panel.component.css']
})
export class UiPanelComponent {

  @Input() location: Location;
  url: string;
  method: string;

  constructor(private util: UtilService) {
    this.util.initializeValues.subscribe(values => {
      this.url = values.url;
      this.method = values.mode;
    })
  }

  cancel() {
    window.location.href = this.url;
  }

}
