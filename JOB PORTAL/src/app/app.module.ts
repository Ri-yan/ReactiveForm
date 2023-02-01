import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationService } from './services/registration.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { CountrystatecityComponent } from './components/registration/countrystatecity/countrystatecity.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    RegistrationComponent,
    NavigationComponent,
    HomeComponent,
    SearchFilterPipe,
    CountrystatecityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
