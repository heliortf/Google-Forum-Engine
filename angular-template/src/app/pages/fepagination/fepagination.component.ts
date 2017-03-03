import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Pagination } from './../../swagger/index'

import 'style-loader!./fepagination.scss';


/**
 * The prefix "fe" means "ForumEngine"
 */
@Component({
  selector: 'fe-pagination',
  templateUrl: './fepagination.html'
})
export class FePagination implements OnInit {
  // Emitter that will tell when page changes
  protected emitter : EventEmitter<string>;

  // Pagination object received  
  protected pagination : Pagination; 

  @Input('pagination')
  set setPagination(valor){    
    this.pagination = valor;
    this.calculatePages();
  }

  // max of 3 pages to the left of current page and max of 3 pages to the right of current page
  protected offsetPages : number = 3;

  // Array of pages to iterate over
  protected pages : Array<number> = [];


  constructor() {
    this.emitter = new EventEmitter();
  }

  calculatePages(){
    if(this.pagination !== undefined && typeof this.pagination['page'] !== 'undefined'){
      // Where will begin pagination
      let begin = 1;     

      // Actual page
      let page = this.pagination.page;

      // Number of pages
      let pages = this.pagination.pages;

      // The end will be the number of pages
      let end = pages;

      // If actual page if greather than offset, we begin from first offset
      if(page > this.offsetPages) {
        begin = page - this.offsetPages;
      }

      // Calculate limite to the right
      if((page + this.offsetPages) <= pages){
        end = page + this.offsetPages;
      }

      // Reset the array of pages
      this.pages = [];
      console.log("Begin = "+begin+" end = "+end); 
      // Iterate and add pages
      for(let i = begin;i<=end;i++){
          this.pages.push(i);
      }
    }
  }

  ngOnInit(){
    
  }

  
}
