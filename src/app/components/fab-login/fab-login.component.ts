import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Error } from 'src/app/interfaces/errores';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fab-login',
  templateUrl: './fab-login.component.html',
  styleUrls: ['./fab-login.component.scss'],
})
export class FabLoginComponent implements OnInit {

  signInForm: any;
  successMsg: string = '';
  errorMsg: Error[] = [];

  constructor(private router: Router,
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.signInForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });

  }

  signIn(value: any) {
    this.auth.signIn(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = [];
        this.router.navigateByUrl('panel');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

  gAuth(){

  }



}
