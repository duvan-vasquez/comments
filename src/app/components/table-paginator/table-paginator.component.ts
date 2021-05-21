import { Component, Input, OnInit } from '@angular/core';
import { HeadTable } from '../../shared/models/head-table';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnInit {

  @Input() heads: HeadTable[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
