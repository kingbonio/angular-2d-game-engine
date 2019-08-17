import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
