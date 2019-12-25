import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTaskComponent } from './page-task.component';
import { PageTaskEditComponent } from './page-task-edit.component';
import { PageTopComponent } from './page-top.component';
import { PageSignInComponent } from './page-sign-in.component';
import { PageCreateUserComponent } from './page-create-user.component';


const routes: Routes = [
  { path: 'task', component: PageTaskComponent },
  { path: 'add', component: PageTaskEditComponent },
  { path: '', component: PageTopComponent },
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageCreateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
