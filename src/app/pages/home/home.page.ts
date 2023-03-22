import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuOpts, Usuario } from 'src/app/interfaces/interfaces';

/**
 * Componente Home. Indica la plantilla HTML que usa y su CSS.
 * Página de inicio que muestra los retos activos.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ionFabVisible = true;
  userEmail: string | null = null;
  usuarioLogado: Usuario;
  menuOpts: MenuOpts[];
  enableFav = false;

  /**
   * Constructor del componente.
   */
  constructor(private authSvc: AuthService,
    private userSvc: UserService,
    private angularFireAuth: AngularFireAuth) {

    this.angularFireAuth.onAuthStateChanged(user => {
      if (user) {
        // El usuario está logueado

        this.ionFabVisible = false;
        this.authSvc.getUserEmail().then(email => {
          this.userEmail = email;
          this.userSvc.getUserByEmail(email).subscribe(usuario => {
            this.usuarioLogado = usuario;
            console.log('El usuario está logueado con ', this.usuarioLogado.EMAIL);
            if (this.usuarioLogado.ROL === 'admin') {
              console.log(this.usuarioLogado.ROL);
              this.userSvc.getMenuOpts(['all', 'retador', 'admin'])
                .subscribe((menuOpts: MenuOpts[]) => {
                  console.log(menuOpts);
                  this.menuOpts = menuOpts;
                });
              this.enableFav = true;
            } else {
              this.userSvc.getMenuOpts(['all', 'retador'])
                .subscribe((menuOpts: MenuOpts[]) => {
                  console.log(menuOpts);
                  this.menuOpts = menuOpts;
                });
            }
          });


        });
      } else {
        // El usuario no está logueado
        console.log('El usuario no está logueado');
        this.ionFabVisible = true;
        this.userSvc.getMenuOpts(['all'])
          .subscribe((menuOpts: MenuOpts[]) => {
            console.log(menuOpts);
            this.menuOpts = menuOpts;
          });
      }
    });

  }

  /**
   * Método de inicio.
   * Comprobamos si estamos logados. Si lo estamos, no mostramos el fab de login.
   * Si no estamos logados lo muestra para poder iniciar sesión. 
   * 
   */
  ngOnInit() {

  }

}
