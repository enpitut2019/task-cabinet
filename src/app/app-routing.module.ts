import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTaskComponent } from './page-task.component';
import { PageTaskEditComponent } from './page-task-edit.component';
import { PageTopComponent } from './page-top.component';
import { PageSignInComponent } from './page-sign-in.component';
import { PageCreateUserComponent } from './page-create-user.component';
import { AuthGuard } from './guards/auth.guard';
import { PageTaskInfoComponent } from './page-task-info.component';


const routes: Routes = [
  { path: 'task', component: PageTaskComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: PageTaskInfoComponent, canActivate: [AuthGuard] },
  { path: 'add', component: PageTaskEditComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: PageTaskEditComponent, canActivate: [AuthGuard] },
  { path: '', component: PageTopComponent },
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageCreateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
