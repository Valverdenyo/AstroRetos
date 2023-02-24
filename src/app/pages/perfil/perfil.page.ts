import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})


export class PerfilPage implements OnInit {

  @Input() usuario: Usuario;

  constructor(private authSrv: AuthService) { }

  

  ngOnInit() {

    
  }

  passChange() {

  }

  logOut() {
    this.authSrv.signOut();
  }

}
