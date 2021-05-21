import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router) { }

  ngOnInit(): void { }

  /** @TODO From connect to server.. [Comming soon] */
  onSumbit() {
    this.router.navigate(['/comment']);
  }
  /** From validator */
  get email() : AbstractControl { return this.loginForm.controls.email }
  get password() : AbstractControl { return this.loginForm.controls.email}
}
