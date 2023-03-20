import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore/';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MenuOpts, Usuario } from '../interfaces/interfaces';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {



  usuariosCollection: AngularFirestoreCollection<Usuario>;



  constructor(private firestore: AngularFirestore, 
    private http: HttpClient,
    private authSvc: AuthService) { }

  
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

  updateUser() {

  }

  async deleteUser(id: string) {
    this.authSvc.deleteUser();
    this.firestore.collection('usuarios').doc(id).delete()
      .then(() => {
        console.log('Documento eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar documento: ', error);
      });
  }

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
