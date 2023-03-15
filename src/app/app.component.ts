import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


/**
 * Componente principal de la aplicación.
 * 
 * NO TOCAR!!
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  /**
 * Constructor del componente
 * 
 * SE RECOMIENDA NO TOCAR 
 */
  constructor(private router: Router,
    private afAuth: AngularFireAuth, 
    ) {

       // Configuramos el observador de autenticación
 /*    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        // El usuario ha iniciado sesión, permitimos el acceso a todas las páginas
        this.router.navigate(['/home']);
      } else {
        // El usuario no ha iniciado sesión, redirigimos a la página de inicio de sesión
        this.router.navigate(['/home']);
      }
    }); */
     }
}
