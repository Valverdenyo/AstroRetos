import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore/';

import { Usuario } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;
  

  constructor(private angularFireAuth: AngularFireAuth, 
    private firestore: AngularFirestore, 
    private router: Router) { }

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
      return new Promise<any>((resolve, reject) => {
        this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
          .then(
            res => resolve(res),
            err => reject(err))
            
      })
      
      //busqueda por email y carga de objeto Usuario
      
    }
  
    signOut() {
      return new Promise<void>((resolve, reject) => {
        this.angularFireAuth.signOut();
        this.router.navigateByUrl('home');
      })
    }
  
    userDetails() {
      return this.angularFireAuth.user
    }
  
  
}
