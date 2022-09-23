import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileDragDropDirective } from './file-drag-drop.directive';
import { FileInputComponent } from './file-input/file-input.component';

@NgModule({
  declarations: [AppComponent, FileDragDropDirective, FileInputComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
