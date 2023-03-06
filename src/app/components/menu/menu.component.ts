import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  mostrarMenuAnonimo = true;
  mostrarMenuRegistrado = false;
  mostrarMenuAdmin = false;

  constructor(
    private authSvc: AuthService) { }

  ngOnInit() {
    const rol = localStorage.getItem('rol');

    if (rol === 'unregistered') {
      this.mostrarMenuAnonimo = true;
    } else if (rol === 'registered') {
      this.mostrarMenuRegistrado = true;
    } else if (rol === 'admin') {
      this.mostrarMenuAdmin = true;
    }
  }

}
