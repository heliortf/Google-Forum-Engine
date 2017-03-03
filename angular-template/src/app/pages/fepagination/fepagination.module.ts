import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FePagination }  from './index';

@NgModule({
  imports: [
    CommonModule  
  ],
  declarations: [
    FePagination
  ],
  providers: [
  ],
  exports : [
    FePagination
  ]
})
export class FePaginationModule {
}
