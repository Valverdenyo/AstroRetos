import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Error } from 'src/app/interfaces/errores';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  successMsg: string = '';
  errorMsg: Error[] = [];

  constructor(private router: Router,
    private authSrv: AuthService,
    private fBuilder: FormBuilder) { }

  ngOnInit() {
    this.registroForm = this.fBuilder.group({
      NOMBRE: new FormControl('', Validators.compose([
        Validators.required
      ])),
      EMAIL: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      PASSWORD: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  registro(value: any) {
    this.authSrv.signUp(value)
      .then((response) => {
        this.errorMsg = [];
        this.successMsg = "Usuario Creado.";
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

}
