import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { LocationComponent } from './location.component';
import { IntroComponent } from './intro/intro.component';
import { MapAreaComponent } from './map-area/map-area.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UiPanelComponent } from './ui-panel/ui-panel.component';
import { AddressSearchService } from './shared/address-search.service';
import { LeafletService } from './shared/leaflet.service';
import { UtilService } from './shared/util.service';

@NgModule({
  declarations: [
    LocationComponent,
    IntroComponent,
    MapAreaComponent,
    SearchBarComponent,
    UiPanelComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  exports: [
    LocationComponent
  ],
  providers: [
    AddressSearchService,
    LeafletService,
    UtilService
  ]
})
export class LocationModule {

}
