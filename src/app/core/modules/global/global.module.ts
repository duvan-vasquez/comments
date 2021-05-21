import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentRoutingModule } from './global-routing.module';
import { CommentFormComponent } from './comment/form/comment-form.component';
import { CommentComponent } from './comment/index/comment.component';
import { TablePaginatorComponent } from 'src/app/components/table-paginator/table-paginator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
//import { DataTablesModule } from "angular-datatables";



@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent,
    TablePaginatorComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class CommentsModule { }
