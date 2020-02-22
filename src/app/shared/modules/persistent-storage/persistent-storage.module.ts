import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersistentStorageComponent } from './persistent-storage.component';

@NgModule({
  declarations: [
    PersistentStorageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PersistentStorageComponent
  ]
})
export class PersistentStorageModule { }
