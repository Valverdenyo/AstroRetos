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
   * almacena el total de puntos
   */
  totalPuntos: number;

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
   * @param userId Id del usuario a buscar
   * @returns 
   */
  public getUserById(userId: string): Observable<Usuario> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('ID', '==', userId).limit(1))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(usuarios => usuarios[0])
      );
  }
/**
 * Metodo que actualia el total de puntos del usuario
 * @param email Email del usuario a actualizar
 * @param puntos puntos totales del usuario
 */
  updateUserPuntos(email: string, puntos: number) {
    this.getUserByEmail(email).subscribe(user => {
      return this.firestore.collection('usuarios').doc(user.ID).update({
        PUNTOS: puntos
      });
    });
  }

  /**
   * Metodo para cambiar de rol al usuario: Retador <=> Administrador
   * @param userId Id del usuario al que cambiar el Rol
   * @returns 
   */
  updateUserRol(userId: string) {
    this.getUserById(userId).subscribe(usuario => {
      this.usuario = usuario;
    });

    if (this.usuario.ROL == 'retador') {
      this.newRol = 'admin';
      console.log('cambio a', this.newRol);
    } else {
      this.newRol = 'retador';
      console.log('cambio a', this.newRol);
    }

    return this.firestore.collection('usuarios').doc(userId).update({
      ROL: this.newRol
    });
  }

  /**
   * Metodo para cambiar el Avatar de un usuario
   * @param userId Id del usuario al que cambiar el Avatar
   * @param avatar Imagen nueva del avatar (string saneado)
   * @returns 
   */
  updateUserAvatar(userId: string, avatar: string) {

    this.getUserById(userId).subscribe(usuario => {
      this.usuario = usuario;
      this.newAvatar = this.usuario.AVATAR;
      this.newAvatar = avatar;
    });
    return this.firestore.collection('usuarios').doc(userId).update({
      AVATAR: avatar
    });

  }
  /**
   * Obtiene el total de puntos de un usuario concreto
   * @param user Usuario del que obtener los puntos
   * @returns 
   */
  getTotalPuntosByUser(user: string): Observable<number> {

    return this.firestore.collection<any>('retosconseguidos', ref => ref.where('USER', '==', user))
      .valueChanges({ idField: 'ID' })
      .pipe(
        map(retos => retos.reduce((total, reto) => total + reto.PUNTOS, 0))
      );

  }

  /**
   * Obtiene una lista ordenada de los usuarios con más puntos. El de mayor puntuacion, arriba
   * @returns 
   */
  getUsuariosPorPuntos(): Observable<any[]> {

    return this.firestore.collection('usuarios', ref => ref.orderBy('PUNTOS', 'desc'))
      .valueChanges({ idField: 'ID' });

  }

  /**
   * Obtiene del JSON de roles las opciones adecuadas dependiendo del rol del usuario logado
   * @param roles roles del usuario logado
   * @returns 
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
