import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit() {
  }

  passChange() {

  }

  logOut() {
    this.authSrv.signOut();
  }

}
