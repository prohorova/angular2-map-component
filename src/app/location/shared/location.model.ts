export class Location {
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  city: string;
  neighbourhood: string;
  address: string;

  constructor(addressResult: any) {
    this.latitude = addressResult.geometry.location.lat;
    this.longitude = addressResult.geometry.location.lng;
    this.address = addressResult.formatted_address;

    addressResult.address_components.forEach(component => {
      if (component.types.indexOf('country') !== -1) {
        this.country = component.short_name;
      }
      if (component.types.indexOf('administrative_area_level_1') !== -1) {
        this.region = component.long_name;
      }
      if (component.types.indexOf('administrative_area_level_2') !== -1) {
        this.city = component.long_name;
      }
      if (component.types.indexOf('neighborhood') !== -1) {
        this.neighbourhood = component.long_name;
      }
    });
  }

  isFilled() {
    return !!(this.country && this.region && this.city);
  }
}
