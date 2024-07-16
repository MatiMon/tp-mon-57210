import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Letratamanio20Directive } from './directives/letratamanio20.directive';



@NgModule({
  declarations: [
    Letratamanio20Directive
  ],
  imports: [
    CommonModule
  ],
  exports: [Letratamanio20Directive]
})
export class SharedModule { }
