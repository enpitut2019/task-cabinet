import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTaskComponent } from './page-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatTableModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule, MatSelectModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PageTaskEditComponent } from './page-task-edit.component';
import { MatGridListModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PageTopComponent } from './page-top.component';
import { PageSignInComponent } from './page-sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PageCreateUserComponent } from './page-create-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckPatternDirective } from './shared/check-pattern.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageTaskComponent,
    PageTaskEditComponent,
    LayoutComponent,
    PageTopComponent,
    PageSignInComponent,
    PageCreateUserComponent,
    CheckPatternDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatGridListModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
  ],
  providers: [
    DatePipe,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
