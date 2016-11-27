import { Component, Input } from '@angular/core';
import {Http, Request, URLSearchParams} from '@angular/http';

import { Location } from '../shared/location.model';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'my-app-ui-panel',
  templateUrl: './ui-panel.component.html',
  styleUrls: ['./ui-panel.component.css']
})
export class UiPanelComponent {

  @Input() location: Location;

  constructor(private util: UtilService, private http: Http) {
  }

  use() {
    switch (this.util.mode) {
      case 'GET':
        let params: URLSearchParams = new URLSearchParams();
        params.set('lat', this.location.latitude.toString());
        params.set('lng', this.location.longitude.toString());
        params.set('country', this.location.country);
        params.set('region', this.location.region);
        params.set('city', this.location.city);
        this.http.get(this.util.url, {
          search: params
        }).subscribe(() => {
          // do something;
        });
        break;
      case 'POST':
        this.http.post(this.util.url, {
          body: {
            lat: this.location.latitude,
            lng: this.location.longitude,
            country: this.location.country,
            region: this.location.region,
            city: this.location.city,
          }
        }).subscribe(() => {
          // do something
        })
    };
  }

  cancel() {
    console.log(`mode: ${this.util.mode}, 
    url: ${this.util.url}, 
    protocol: ${this.util.protocol}, 
    location: ${JSON.stringify(this.location)}`
    );
  }

}
