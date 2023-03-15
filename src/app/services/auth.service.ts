import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { take, map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/interfaces';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogado: Usuario;

  constructor(private angularFireAuth: AngularFireAuth,
    private userSvc: UserService,
    private firestore: AngularFirestore,
    private router: Router) {
    
  }

  signUp(usuario: Usuario) {

    this.firestore.collection('usuarios').add({
      EMAIL: usuario.EMAIL,
      NOMBRE: usuario.NOMBRE,
      ROL: "Retador",
      AVATAR: "",
      ID: ""

    })
      .then((docRef: any) => {

        this.firestore.doc(docRef).update({
          ID: docRef.id
        })

      })
      .catch((error: any) => {
        console.error('Error al agregar usuario: ', error);
      });

    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(usuario.EMAIL, usuario.PASSWORD)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signIn(value: any) {

    this.userSvc.getUserByEmail(value.email).subscribe(resultado => {

      this.usuarioLogado = resultado;

    });

    return this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password);

  }

  signOut() {
    return new Promise<void>((resolve, reject) => {
      this.angularFireAuth.signOut();
      this.router.navigateByUrl('home');
    })
  }

  userDetails() {

    return this.angularFireAuth.user;
  }

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

  checkLogin(): boolean {
    return !!this.angularFireAuth.currentUser;
  }

  async getUserEmail(): Promise<string | null> {
    if (this.checkLogin()) {
      const user = await this.angularFireAuth.currentUser;
      if (user) {
       
        return user.email || null;
      }
    }
    return null;
  }

  async passChange(nuevaContraseña: string) {
    const user = await this.angularFireAuth.currentUser;
    await user.updatePassword(nuevaContraseña);
  }


}
