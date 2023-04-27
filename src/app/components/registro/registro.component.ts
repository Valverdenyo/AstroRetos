import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { Error } from 'src/app/interfaces/errores';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  /**
   * Declaracion del Formulario de Registro
   */
  registroForm: FormGroup;

  /**
   * Mensajes de proceso correcto
   */
  successMsg: string = '';

  /**
   * Mensajes de Error declarados en Interfaces
   */
  errorMsg: Error[] = [];

  /**
   * Constructor de clase
   * @param authSrv Servicio de Autenticación personalizado
   * @param fBuilder Componente de manejo de Formulario
   * @param modalCtrl Componente de manejo del Modal
   */
  constructor(private authSrv: AuthService,
    private fBuilder: FormBuilder,
    private modalCtrl: ModalController) { }

    /**
     * Construimos el Formulario de registro asignando los valores y validando patrones de email y contraseña.
     * También marcamos los campos obligatorios.
     */
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

  /**
   * Este método envia al Servicio de Autenticacion los valores del Formulario y muestra mensaje según resultado.
   * @param value Valor recibido a través del formulario
   */
  registro(value: any) {
    this.authSrv.signUp(value)
      .then((response) => {
        this.errorMsg = [];
        this.successMsg = "Usuario Creado.";
        this.modalCtrl.dismiss();
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

}
