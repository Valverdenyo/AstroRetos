import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore/';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { MenuOpts, Usuario } from '../interfaces/interfaces';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEmail = new BehaviorSubject<string>('');

  /**
   * Objeto tipo Usuario para manejar su informacion
   */
  usuario: Usuario;

  /**
   * variable para guardar el nuevo rol del usuario a cambiar
   */
  newRol: string;

  /**
   * variable que almacena la URL del nuevo avatar para cambiarlo
   */
  newAvatar: string = '';

  /**
   * almacena una coleccion de Usuarios para su colsulta
   */
  usuariosCollection: AngularFirestoreCollection<Usuario>;

  /**
   * Constructor de clase
   * @param firestore Servicio de Firestore
   * @param http Servicio de http usado para peticiones json a los datos del menu
   */
  constructor(private firestore: AngularFirestore,
    private http: HttpClient
  ) { }

  setUserEmail(email: string) {
    this.userEmail.next(email);
  }

  getUserEmail() {
    return this.userEmail.asObservable();
  }

  /**
   * Obtiene un observable con todos los usuarios
   * @returns 
   */
  getUsers(): Observable<any[]> {

    return this.firestore.collection('usuarios').valueChanges({ idField: 'id' });

  }

  /**
   * Obtiene un Observable del usuario a traves de su email
   * @param email Parametro pasado para buscar al usuario
   * @returns 
   */
  public getUserByEmail(email: string): Observable<Usuario> {

    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('EMAIL', '==', email).limit(1))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(usuarios => usuarios[0])
      );

  }

  /**
   * Devuelve un observable con el usuario buscado por Id
   * @param id Id del usuario a buscar
   * @returns 
   */
  public getUserById(id: string): Observable<Usuario> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('ID', '==', id).limit(1))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(usuarios => usuarios[0])
      );
  }

  updateUserPuntos(user: string, puntos: number) {
    
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

  updateUserAvatar(id: string, avatar: string) {
    this.getUserById(id).subscribe(usuario => {
      this.usuario = usuario;
      this.newAvatar = this.usuario.AVATAR;
      console.log('avatar viejo', this.newAvatar);
      this.newAvatar = avatar;
      console.log('avatar nuevo', this.newAvatar);

    });
    return this.firestore.collection('usuarios').doc(id).update({
      AVATAR: avatar
    });
  }


  getTotalPuntosByUser(user: string): Observable<number> {
    return this.firestore.collection<any>('retosconseguidos', ref => ref.where('USER', '==', user))
      .valueChanges({ idField: 'ID' })
      .pipe(
        map(retos => retos.reduce((total, reto) => total + reto.PUNTOS, 0))
      );
  }

  getUsuariosPorPuntos(): Observable<any[]> {
    return this.firestore.collection('usuarios', ref => ref.orderBy('PUNTOS', 'desc'))
      .valueChanges({ idField: 'ID' });
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
