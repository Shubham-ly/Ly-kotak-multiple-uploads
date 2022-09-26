import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileDragDropDirective } from './file-drag-drop.directive';
import { FileInputComponent } from './file-input/file-input.component';
import { FileItemComponent } from './file-item/file-item.component';

@NgModule({
  declarations: [AppComponent, FileDragDropDirective, FileInputComponent, FileItemComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
