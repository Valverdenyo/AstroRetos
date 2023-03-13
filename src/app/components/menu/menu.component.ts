import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { MenuOpts } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuOpts: MenuOpts[];
  userEmail: string | null = null;

  constructor(private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router,) { }

  ngOnInit() {

    this.authSvc.checkLogin();
    this.authSvc.getUserEmail().then(email => {
      this.userEmail = email;
      console.log(this.userEmail);
    });

    if (this.authSvc.checkLogin()) {
      console.log("SI logado con ");
      if (this.userEmail === 'elwe.isilra@gmail.com') {
        console.log(this.userEmail);
        this.userSvc.getMenuOpts(['all', 'retador', 'admin'])
          .subscribe((menuOpts: MenuOpts[]) => {
            console.log(menuOpts);
            this.menuOpts = menuOpts;
          });
      } else {
        this.userSvc.getMenuOpts(['all', 'retador'])
          .subscribe((menuOpts: MenuOpts[]) => {
            console.log(menuOpts);
            this.menuOpts = menuOpts;
          });
      }

    } else {
      console.log("NO logado");
      this.userSvc.getMenuOpts(['all'])
        .subscribe((menuOpts: MenuOpts[]) => {
          console.log(menuOpts);
          this.menuOpts = menuOpts;
        });

    }

    /* const usuarioLogado = localStorage.getItem('usuarioLogado');
    const rol = localStorage.getItem('rol');
    console.log(rol);

    if (usuarioLogado === 'false' || !usuarioLogado) {
      this.userSvc.getMenuOpts(['all'])
        .subscribe((menuOpts: MenuOpts[]) => {
          console.log(menuOpts);
          this.menuOpts = menuOpts;
        });
    } else if (rol === 'Retador') {
      this.userSvc.getMenuOpts(['all', 'retador'])
        .subscribe((menuOpts: MenuOpts[]) => {
          console.log(menuOpts);
          this.menuOpts = menuOpts;
        });
    } else if (rol === 'Admin') {
      this.userSvc.getMenuOpts(['all', 'retador', 'admin'])
        .subscribe((menuOpts: MenuOpts[]) => {
          console.log(menuOpts);
          this.menuOpts = menuOpts;
        });
    } */

  }

  navigateToPage(url: string) {
    this.router.navigate([url]);
  }

}
