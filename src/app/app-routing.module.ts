import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTaskComponent } from './page-task.component';
import { PageTaskAddComponent } from './page-task-add.component';
import { PageTopComponent } from './page-top.component';


const routes: Routes = [
  { path: '', component: PageTaskComponent },
  { path: 'add', component: PageTaskAddComponent },
  { path: 'top', component: PageTopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
