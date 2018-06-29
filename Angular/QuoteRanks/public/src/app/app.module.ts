import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddAuthComponent } from './add-auth/add-auth.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { QuotesComponent } from './quotes/quotes.component';
import { EditAuthComponent } from './edit-auth/edit-auth.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddAuthComponent,
    AddQuoteComponent,
    QuotesComponent,
    EditAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
