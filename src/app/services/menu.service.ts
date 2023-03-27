import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { MenuOpts, Usuario } from '../interfaces/interfaces';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  
  /**
 * Booleano para mostrar/ocultar el FAB de Login
 */
  ionFabVisible = true;
  /**
   * Variable para guardar el mail del usuario logado a traves del Auth
   */
  userEmail: string | null = null;
  /**
   * Variable tipo Usuario para guardar la información del usuario logado
   */
  usuarioLogado: Usuario;
  /**
   * Variable de tipo Array de Opciones de Menu, para almacenar las opciones disponibles según el usuario logado
   */
  menuOpts: MenuOpts[];
  /**
   * Booleano que habilita/deshabilita el icono de Favoritos. Si no está logado, lo deshabilita
   */
  enableFav = false;

  constructor(private angularFireAuth: AngularFireAuth,
    private authSvc: AuthService,
    private userSvc: UserService) { }

    setMenu() {
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

}
