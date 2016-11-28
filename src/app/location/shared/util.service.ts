import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UtilService {

  mode: string;
  url: string;
  protocol: string;
  initializeValues: ReplaySubject<any> = new ReplaySubject<any>();

  initValues(mode: string, url: string, protocol: string) {
    this.mode = mode || 'GET';
    this.url = url || 'https://brownhanky.com/index.php?r=test/use-location';
    this.protocol = protocol || this.getProtocol(this.url);
    this.initializeValues.next({mode: this.mode, url: this.url, protocol: this.protocol});
  }

  private getProtocol(url: string) {
    let protocol = url.split('//')[0];
    if (protocol !== 'http:' && protocol !== 'https:') {
      protocol = window.location.protocol;
    }
    return protocol;
  }

}
