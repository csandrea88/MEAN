import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AddAuthComponent } from './add-auth/add-auth.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { QuotesComponent } from './quotes/quotes.component';
import { EditAuthComponent } from './edit-auth/edit-auth.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'AddAuth', component: AddAuthComponent },
  { path: 'AddQuote/:id', component: AddQuoteComponent },
  { path: 'QuotesByAuth/:id', component: QuotesComponent },
  { path: 'EditAuth/:id', component: EditAuthComponent },
  { path: '', pathMatch: 'full', redirectTo: 'Home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
