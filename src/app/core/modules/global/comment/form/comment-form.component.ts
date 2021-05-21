import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommentGeneral } from '../shared/models/comment-general.model';
import { CommentService } from '../shared/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  commentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$'), Validators.maxLength(35)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.pattern('(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*(\\?[;&a-z\\d%_.~+=-@]*)?(\\#[-a-z\\d_@]*)?$')]),
    content: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });
  item: CommentGeneral = new CommentGeneral();
  id: number = 0;

  constructor(private commentService: CommentService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.commentService.get().length == 0) {
      this.router.navigate(['/comment']);
    }
    this.id = this.route.snapshot.params.id;
    if(this.id) {
      this.commentService.getById(this.id).subscribe(data => {
        this.item = data;
        this.commentForm.setValue({
          name: this.item.name,
          email: this.item.email,
          website: this.item.website,
          content: this.item.content
        });
      });
    }
  }

  /** From validator */
  get name() : AbstractControl { return this.commentForm.controls.name }
  get email() : AbstractControl { return this.commentForm.controls.email }
  get website() : AbstractControl { return this.commentForm.controls.website }
  get content() : AbstractControl { return this.commentForm.controls.content }

  /** Send data to server post */
  onSumbit() {
    const data = {
      name:     this.commentForm.controls.name.value,
      email:    this.commentForm.controls.email.value,
      website:  this.commentForm.controls.website.value,
      content:  this.commentForm.controls.content.value
    };
    if(!this.isSaveData()) {
      alert("Ya existe el usuario de correo.");
      return;
    }
    if(this.id) {
      this.commentService.putData(this.id, data).subscribe(data => {
        this.router.navigate(['comment']);
      });
    }else{
      this.commentService.postData(data).subscribe(data => {
        this.router.navigate(['comment']);
      });
    }
  }
  isSaveData() {
    const first = this.commentService.get().find(x=>x.email===this.commentForm.controls.email.value);
    if(first && this.id != first?.id) {
      return false;
    }
    return true;
  }

}
