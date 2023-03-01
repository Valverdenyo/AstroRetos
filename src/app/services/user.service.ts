import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore/';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root'
})
export class UserService {

 

  usuariosCollection: AngularFirestoreCollection<Usuario>;

  
  constructor(private firestore: AngularFirestore) { }

  public getUserByEmail(email: string): Observable<Usuario> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('EMAIL', '==', email).limit(1))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(usuarios => usuarios[0])
      );
  }

 
  updateUser() {

  }

  deleteUser() {

  }
}
