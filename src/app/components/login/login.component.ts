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

  /**
   * Declaración del Formulario de Login
   */
  loginForm: FormGroup;
  /**
   * Texto a mostrar si el acceso es correcto
   */
  successMsg: string = '';
  /**
   * Texto a mostrar si el acceso es erroneo
   */
  errorMsg: Error[] = [];
  /**
   * Objeto tipo Usuario para guardar la información que se necesite manejar
   */
  usuario: Usuario;

  /**
   * 
   * @param authSvc Servicio para el manejo de la Autenticacion con Firebase Auth
   * @param fBuilder Componente de Formulario cde Login
   * @param modalCtrl Controlador del Modal para mostrarlo/cerrarlo
   * @param navCtrl Controlador de navegación por la app
   */
  constructor(private authSvc: AuthService,
    private fBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private navCtrl: NavController) {

  }

  /**
   * Creamos el formulario con los validadores necesarios
   */
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

  /**Realiza el Login apoyandose en el Servicio Auth y redirecciona al Home
   * 
   * @param value Valores pasados por el Formulario
   */
  async logIn(value: any) {
    try {
      await this.authSvc.signIn(value);
      this.navCtrl.navigateRoot('/home');

    } catch (error) {
      console.log('Error al iniciar sesión:', error);
    }
  }

  /**
   * Autenticacion de Google (NO IMPLEMENTADO)
   */
  gAuth() {

  }

/**
 * Muestra un Modal para el Registro del usuario
 * @returns La vista del Modal
 */
  async registroModal() {
    const modal = await this.modalCtrl.create({
      component: RegistroComponent,
      cssClass: 'loginRegisterModal'
    });
    return await modal.present();
  }

  /**
   * Cierra el propio Modal
   */
  closeModal() {
    this.modalCtrl.dismiss();
  }

}
