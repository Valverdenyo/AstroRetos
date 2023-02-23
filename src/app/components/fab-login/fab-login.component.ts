import { Component, OnInit } from '@angular/core';


import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Error } from 'src/app/interfaces/errores';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistroComponent } from '../registro/registro.component';



@Component({
  selector: 'app-fab-login',
  templateUrl: './fab-login.component.html',
  styleUrls: ['./fab-login.component.scss'],
})
export class FabLoginComponent implements OnInit {

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
        console.log(response)
        this.errorMsg = [];
        this.router.navigateByUrl('perfil');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.registroModal();
    console.log("vamos al registro");
    
  }

  gAuth(){

  }

  async registroModal() {
    const modal = await this.modalCtrl.create({
      component: RegistroComponent
    });
    return await modal.present();
  }



}
