import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLetratamanio20]'
})
export class Letratamanio20Directive {

  constructor(private elemento: ElementRef) {
    elemento.nativeElement.style.fontSize = '20px'
   }

}
