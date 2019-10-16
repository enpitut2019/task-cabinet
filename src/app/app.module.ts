import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTaskComponent } from './page-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PageTaskAddComponent } from './page-task-add.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTaskComponent,
    PageTaskAddComponent,
    LayoutComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
