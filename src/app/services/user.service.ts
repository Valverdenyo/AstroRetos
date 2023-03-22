import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore/';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MenuOpts, Usuario } from '../interfaces/interfaces';
//import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuario: Usuario;
  newRol: string;
  usuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(private firestore: AngularFirestore,
    private http: HttpClient
  ) { }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('usuarios').valueChanges({ idField: 'id' });
  }

  public getUserByEmail(email: string): Observable<Usuario> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('EMAIL', '==', email).limit(1))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(usuarios => usuarios[0])
      );
  }

  public getUserById(id: string): Observable<Usuario> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('ID', '==', id).limit(1))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(usuarios => usuarios[0])
      );
  }

  updateUser() {

  }

  updateUserRol(id: string) {
    this.getUserById(id).subscribe(usuario => {
      this.usuario = usuario;
    });

    console.log('tiene el rol', this.usuario.ROL);

    if (this.usuario.ROL == 'retador') {
      this.newRol = 'admin';
      console.log('cambio a', this.newRol);
    } else {
      this.newRol = 'retador';
      console.log('cambio a', this.newRol);
    }

    return this.firestore.collection('usuarios').doc(id).update({
      ROL: this.newRol
    });
  }

  /*   async deleteUser(id: string) {
      this.authSvc.deleteUser();
      this.firestore.collection('usuarios').doc(id).delete()
        .then(() => {
          console.log('Documento eliminado correctamente');
        })
        .catch((error) => {
          console.error('Error al eliminar documento: ', error);
        });
    }
   */
  getMenuOpts(roles: string[]) {
    return this.http.get<MenuOpts[]>('/assets/data/menu.json')
      .pipe(
        map((menuOpts: MenuOpts[]) => {
          return menuOpts.filter((menuOpt: MenuOpts) => {
            return roles.includes(menuOpt.rol);
          });
        })
      );
  }

}
