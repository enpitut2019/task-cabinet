import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTaskComponent } from './page-task.component';


const routes: Routes = [
  { path: '', component: PageTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
