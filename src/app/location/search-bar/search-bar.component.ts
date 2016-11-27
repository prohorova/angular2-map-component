import { Component, EventEmitter, Output } from '@angular/core';
import { AddressSearchService } from '../shared/address-search.service';

@Component({
  selector: 'my-app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  query = '';
  @Output() addressFound: EventEmitter<any> = new EventEmitter<any>();

  constructor(private addressSearch: AddressSearchService) {}

  search() {
    if (this.query) {
      this.addressSearch.searchByQuery(this.query).subscribe(address => {
        this.addressFound.emit(address);
      }, (err) => {
        window.alert(err);
      });
    }
  }


}
