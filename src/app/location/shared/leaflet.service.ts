import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AddressSearchService } from './address-search.service';
import * as L from 'leaflet';

@Injectable()
export class LeafletService {

  map: any;
  marker: any;
  markerPositionChange: ReplaySubject<string> = new ReplaySubject<string>();
  baseMaps: any;
  baseCoordinates = {latitude: 40.731253, longitude: -73.996139};

  constructor(private addressSearch: AddressSearchService) {
    this.baseMaps = {
      OpenStreetMap: L.tileLayer('//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="//www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
        'Tiles courtesy of <a href="//hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      }),
      Esri: L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, ' +
        'GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      }),
      CartoDB: L.tileLayer('//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="//www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; ' +
        '<a href="//cartodb.com/attributions">CartoDB</a>'
      })
    };
  }

  initMap(id: string) {
    return new Promise((resolve, reject) => {
      if (!this.map) {
        this.addressSearch.getCurrentLocation().subscribe(coords => {
          this.createMap(id, coords);
          resolve();
        }, () => {
          this.createMap(id, this.baseCoordinates);
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  setMarker(lat: number, lng: number) {
    if (!this.marker) {
      this.marker =  L.marker([lat, lng], {draggable: true}).addTo(this.map);
      this.map.panTo([lat, lng]);
      this.marker.on('dragend', (event) => {
        let coordinates = event.target.getLatLng();
        this.markerPositionChange.next(this.getCoordsString(coordinates));
      });
    } else {
      this.marker.setLatLng([lat, lng]);
      this.map.panTo([lat, lng]);
    }
  }

  private getCoordsString(coordinates: L.LatLng) {
    return `${coordinates.lat},${coordinates.lng}`;
  }

  private createMap(id, coords) {
    this.map = L.map(id, {
      zoomControl: false,
      center: L.latLng(coords),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.baseMaps.OpenStreetMap]
    });

    L.control.zoom({position: 'topright'}).addTo(this.map);
    L.control.layers(this.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);
  }

}
