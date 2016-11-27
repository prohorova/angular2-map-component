import { Component, OnInit, Input } from '@angular/core';

import { LeafletService } from './shared/leaflet.service';
import { AddressSearchService } from './shared/address-search.service';
import { UtilService } from './shared/util.service';
import { Location } from './shared/location.model';

@Component({
  selector: 'my-app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() mode: string;
  @Input() url: string;
  @Input() protocol: string;
  @Input() predefinedLocation: Location;

  location: Location;
  showMap = false;
  mapElementId = 'map';

  constructor(private mapService: LeafletService,
              private addressSearch: AddressSearchService,
              private util: UtilService) {}

  ngOnInit() {
    this.util.initValues(this.mode, this.url, this.protocol);
    if (this.predefinedLocation) {
      if (this.predefinedLocation.latitude && this.predefinedLocation.longitude) {
        this.addressSearch.searchByCoordinates(`${this.predefinedLocation.latitude},${this.predefinedLocation.longitude}`)
          .subscribe(location => {
            this.location = location;
          }, (err) => alert(err));
      } else if (this.predefinedLocation.address) {
        this.addressSearch.searchByQuery(this.predefinedLocation.address).subscribe(location => {
          this.location = location;
        }, (err) => alert(err));
      }
    }

    this.mapService.markerPositionChange.subscribe(coordinates => {
      this.addressSearch.searchByCoordinates(coordinates).subscribe(location => {
        this.location = location;
        this.mapService.setMarker(this.location.latitude, this.location.longitude);
      }, (err) => alert(err));
    });
  }

  onAddressFound(location: Location) {
    this.location = location;
    this.initMap();
  }

  private initMap() {
    this.showMap = true;
    this.mapService.initMap(this.mapElementId).then(() => {
      this.mapService.setMarker(this.location.latitude, this.location.longitude);
    });
  }
}
