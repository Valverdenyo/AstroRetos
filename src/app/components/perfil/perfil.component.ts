import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  @Input() email: string;
  usuario: Usuario;

  constructor(private authSrv: AuthService,
              private modalCtrl: ModalController,
              private userSvc: UserService) { }

  ngOnInit() {
    console.log(this.userSvc.getUserByEmail(this.email));

  }

  passChange() {

  }

  logOut() {
    this.authSrv.signOut();
    this.modalCtrl.dismiss();

  }

}


