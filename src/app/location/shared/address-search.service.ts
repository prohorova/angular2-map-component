import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Location } from '../shared/location.model';

@Injectable()
export class AddressSearchService {

  private baseUrl = '//maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: Http) {}

  searchByQuery(query: string) {
    let url = this.baseUrl + '?address=' + encodeURIComponent(query);
    return this.search(url);
  }

  searchByCoordinates(coordinates: string) {
    let url = this.baseUrl + '?latlng=' + coordinates;
    return this.search(url);
  }

  getCurrentLocation() {
    return this.http
      .get('http://ipv4.myexternalip.com/json')
      .map(res => res.json().ip)
      .flatMap(ip => this.http.get('http://freegeoip.net/json/' + ip))
      .map((res: Response) => res.json())
      .map(result => {
        return {latitude: result.latitude, longitude: result.longitude};
      });
  }

  private search(url: string) {
    return this.http
      .get(url)
      .map(res => res.json())
      .map(result => {
        if (result.status !== 'OK') {
          throw new Error(result.status || 'An error occurred');
        }
        if (!result['results'].length) {
          throw new Error('No addresses found');
        }
        return new Location(result['results'][0]);
      });
  }


}
