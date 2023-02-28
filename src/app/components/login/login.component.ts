import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroComponent } from '../registro/registro.component';
import { Error } from 'src/app/interfaces/errores';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  successMsg: string = '';
  errorMsg: Error[] = [];


  constructor(private router: Router,
    private authSrv: AuthService,
    private fBuilder: FormBuilder,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    this.loginForm = this.fBuilder.group({
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

  logIn(value: any) {
    this.authSrv.signIn(value)
      .then((response) => {
        console.log(value)
        this.errorMsg = [];
        this.abrirPerfil(value.email);

      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  gAuth() {

  }

  async registroModal() {
    const modal = await this.modalCtrl.create({
      component: RegistroComponent,
      cssClass: 'loginRegisterModal'
    });
    return await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async abrirPerfil(email: string) {
    const modal = await this.modalCtrl.create({
      component: PerfilComponent,
      componentProps: {
        email
      }
    });
    return await modal.present();
  }


}
