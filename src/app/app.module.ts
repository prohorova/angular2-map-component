import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import { LocationModule} from './location/location.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LocationModule
  ],
  providers: [

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
