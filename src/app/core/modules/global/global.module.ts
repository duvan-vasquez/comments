import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentRoutingModule } from './global-routing.module';
import { CommentFormComponent } from './comment/form/comment-form.component';
import { CommentComponent } from './comment/index/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class CommentsModule { }
