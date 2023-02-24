import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore/';

import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUserByEmail(email: string): AngularFirestoreCollection<Usuario> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('email', '==', email));
  }

 
  updateUser() {

  }

  deleteUser() {

  }
}
