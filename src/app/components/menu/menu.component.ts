import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { MenuOpts } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuOpts: MenuOpts[];

  constructor(private userSvc: UserService,
    private router: Router) { }

  ngOnInit() {
    const rol = localStorage.getItem('rol');
    console.log(rol);

    if (!rol || rol === '' || rol === 'all') {
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
    }

  }

  navigateToPage(url: string) {
    this.router.navigate([url]);
  }

}
