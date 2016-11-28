import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  mode: string;
  url: string;
  protocol: string;

  initValues(mode: string, url: string, protocol: string) {
    this.mode = mode || 'POST';
    this.url = url || 'https://brownhanky.com/index.php?r=test/use-location';
    this.protocol = protocol || this.getProtocol(this.url);
  }

  private getProtocol(url: string) {
    let protocol = url.split('//')[0];
    if (protocol !== 'http:' && protocol !== 'https:') {
      protocol = window.location.protocol;
    }
    return protocol;
  }

}
