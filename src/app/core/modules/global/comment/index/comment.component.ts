import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from 'src/app/core/modules/global/comment/shared/services/comment.service';
import { HeadTable } from 'src/app/shared/models/head-table';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CommentGeneral } from '../shared/models/comment-general.model';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-comment-index',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  items: CommentGeneral[] = [];
  heads: HeadTable[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private commentService: CommentService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers'
    };
    
    this.heads = this.commentService.getHeadTable();
    this.commentService.getData().subscribe(data => {
      this.items = data;
      this.commentService.setData(this.items);
      this.dtTrigger.next();
    });
  }

  onPost() {
    this.router.navigate(['comment/create']);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onEdit(commentGeneral: CommentGeneral){
    this.router.navigate(['comment/edit', commentGeneral.id]);
  }



}
