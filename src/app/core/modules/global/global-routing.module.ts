import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentFormComponent } from './comment/form/comment-form.component';
import { CommentComponent } from './comment/index/comment.component';

const routes: Routes = [
  {
      path: '',
      component: CommentComponent
  },
  {
    path: 'edit/:id',
    component: CommentFormComponent
  },
  {
    path: 'create',
    component: CommentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
