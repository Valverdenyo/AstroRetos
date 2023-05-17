import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { take, map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { AvisosService } from './avisos.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Objeto de tipo usuario para almacenar los datos del usuario Logado
   */
  usuarioLogado: Usuario;

  /**
   * Variable para guardar el mail del usuario logado
   */
  public userEmail: string;

  /**
   * Constructor de clase
   * @param angularFireAuth Servicio de Angular Firebase con los metodos típicos de autenticacion
   * @param userSvc Servicio personalizado para operaciones con el usuario
   * @param firestore Servicio de firestore 
   * @param router Servicio de enrutamiento dentro de la aplicación
   * @param avisosSvc Servicio de avisos a través de Toasts
   */
  constructor(private angularFireAuth: AngularFireAuth,
    private userSvc: UserService,
    private firestore: AngularFirestore,
    private router: Router,
    private avisosSvc: AvisosService) {
  }

  /**
   * Método de creación de usuarios. Primero crea el usuario en Firestore y también lo crea en Auth de Firebase
   * @param usuario Datos recogidos por el Formulario
   * @returns 
   */
  signUp(usuario: Usuario) {

    const noAvatar: string = 'https://firebasestorage.googleapis.com/v0/b/astroretos-db.appspot.com/o/avatar%2Fno-avatar.png?alt=media&token=e6384116-00b8-4a34-a0f1-ee14e4ae8983';

    this.firestore.collection('usuarios').add({
      EMAIL: usuario.EMAIL,
      NOMBRE: usuario.NOMBRE,
      ROL: "Retador",
      AVATAR: noAvatar,
      ID: "",
      PUNTOS: 0

    })
      .then((docRef: any) => {
        this.firestore.doc(docRef).update({
          ID: docRef.id
        });
      })
      .catch((error: any) => {
        this.avisosSvc.presentToast('No se ha podido crear el Usuario', 'danger');
      });

    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(usuario.EMAIL, usuario.PASSWORD)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  /**
   * Método para hacer el login segun los datos recogidos en el formulario y lo guarda en el objeto tipo Usuario
   * @param value Valores recogidos por el formulario de acceso
   * @returns 
   */
  async signIn(value: any) {

    this.userSvc.getUserByEmail(value.email).subscribe(resultado => {

      this.usuarioLogado = resultado;

    });

    return this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password);

  }

  /**
   * Método de deslogado del usuario con retorno al Home
   * @returns 
   */
  signOut() {
    return new Promise<void>((resolve, reject) => {
      this.angularFireAuth.signOut();
      this.userEmail = null;
      this.router.navigateByUrl('home');
    })
  }

  /**
   * Obtiene los detalles de usuario a traves del Auth de Firebase
   * @returns 
   */
  userDetails() {

    return this.angularFireAuth.user;
  }

  /**
   * Método que activa o desactiva rutas en funcion de si existe usuarios logado o no, para personalizar el menú
   * Si no estas logado, redireccionaria al Login
   * @param next Ruta a la que se intenta acceder
   * @param state Estado del enrutador
   * @returns 
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.angularFireAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  /**
   * Comprueba si hay un usuario logado o no
   * @returns 
   */
  checkLogin(): boolean {

    return !!this.angularFireAuth.currentUser;

  }

  /**
   * Obtiene el mail del usuario en caso de estar logado
   * @returns 
   */
  public async getUserEmail(): Promise<string> {
    if (this.checkLogin()) {
      const user = await this.angularFireAuth.currentUser;
      if (user) {
        this.userEmail = user.email;
        return this.userEmail || '';
      }
    }
    return '';
  }

  public initAuthStateListener(): void {
    this.angularFireAuth.onAuthStateChanged(user => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = '';
      }
    });
  }

  /**
   * Método para cambiar la contraseña del usuario
   * @param newPass String recibido a través del formulario con la nueva contraseña
   */
  async passChange(newPass: string) {
    const user = await this.angularFireAuth.currentUser;
    await user.updatePassword(newPass);
  }

  /**
   * Metodo para eliminar un usuario concreto
   * @param userId id del usuario a eliminar pasado por parámetro
   */
  deleteUser(userId: string) {

    this.firestore.collection('usuarios').doc(userId).delete()
      .then(() => {
        this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
      })
      .catch((error) => {
        this.avisosSvc.presentToast('Error eliminando el Usuario', 'danger');
      });
  }

  async deleteAccount() {
    try {
      const user = this.angularFireAuth.currentUser;
      await (await user).delete();
      this.deleteUser(this.usuarioLogado.ID);
      this.router.navigateByUrl('home');
    } catch (error) {
      console.log('Error deleting account', error);
    }
  }

}
