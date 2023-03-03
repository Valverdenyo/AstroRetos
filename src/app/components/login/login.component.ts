import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroComponent } from '../registro/registro.component';
import { Error } from 'src/app/interfaces/errores';


import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  successMsg: string = '';
  errorMsg: Error[] = [];

 usuario: Usuario;

  constructor(private authSrv: AuthService,
      private fBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private navCtrl: NavController) {

     
     }

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

  async logIn(value: any) {
    try {
      await this.authSrv.signIn(value);
      this.navCtrl.navigateRoot('/perfil');
      console.log('email ', value.email);
      
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
    }
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
 
}
