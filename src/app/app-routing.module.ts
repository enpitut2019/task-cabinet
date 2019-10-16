import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTaskComponent } from './page-task.component';
import { PageTaskAddComponent } from './page-task-add.component';


const routes: Routes = [
  { path: '', component: PageTaskComponent },
  { path: 'add', component: PageTaskAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
