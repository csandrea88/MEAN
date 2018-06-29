import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { AddrelComponent } from './addrel/addrel.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Add', component: AddComponent },
  { path: 'Edit/:id', component: EditComponent },
  { path: 'Details/:id', component: DetailsComponent },
  { path: 'Addrel/:id', component: AddrelComponent },
  { path: '', pathMatch: 'full', redirectTo: 'Home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
