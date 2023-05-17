import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Favorito, Reto, RetoConseguido } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AvisosService } from './avisos.service';

@Injectable({
  providedIn: 'root'
})
export class RetoService {
  /**
   * Observable con un array de retos favoritos
   */
  retosFavoritos: Observable<Favorito[]>;
  /**
   * Objeto tipo Favorito
   */
  retoFavorito: Favorito;
  /**
   * Coleccion de firestore de 'favoritos'
   */
  private favCollection: AngularFirestoreCollection<any>;

  /**
   * Observable con un array de retos conseguidos
   */
  retosConseguidos: Observable<RetoConseguido[]>;
  /**
   * Objeto tipo Reto conseguido
   */
  retoConseguido: RetoConseguido;
  /**
   * coleccion de firestore de 'retosconseguidos'
   */
  private retosConseguidosCollection: AngularFirestoreCollection<any>;

  /**
   * Observable con un array de retos
   */
  retos: Observable<Reto[]>;
  /**
   * Objeto tipo reto
   */
  reto: Reto;
  /**
   * coleccion de firestore de 'retos'
   */
  private retosCollection: AngularFirestoreCollection<Reto>;

  /**
   * variable para guardar los puntos que se optienen al conseguir el reto
   */
  puntos: number;

  /**
   * Variable para guardar el nivel de dificultad del reto
   */
  nivel: string;

  /**
   * Constructor de clase
   * @param firestore Servicio de Angular firestore
   * @param avisosSvc Servicio de avisos via toast
   */
  constructor(private firestore: AngularFirestore,
    private avisosSvc: AvisosService) { }

  /**
   * Obtiene un Observable con todos los retos creados
   * @returns 
   */
  getRetos(): Observable<any[]> {

    return this.firestore.collection('retos').valueChanges({ idField: 'id' });

  }

  /**
   * Obtiene un array con los retos Activos, que son los que se muestran en el Home
   * @returns 
   */
  getRetosActivos() {

    this.retosCollection = this.firestore.collection<Reto>('retos', ref => ref.where('ACTIVO', '==', true));
    this.retos = this.retosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.retos;

  }

  /**
   * Obtiene un Observable tipo Reto de un reto pasado por parámetro
   * @param retoId Id del reto
   * @returns 
   */
  getRetosById(retoId: string): Observable<Reto[]> {

    this.retosCollection = this.firestore.collection<Reto>('retos', ref => ref.where('ID', '==', retoId));
    this.retos = this.retosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reto;
        const $id = a.payload.doc.id;
        return { $id, ...data };
      }))
    );
    return this.retos;

  }

  /**
   * Obtiene un array de Retos creados por un usuario pasado por parámetro
   * @param userId Id del usuario
   * @returns 
   */
  getRetosByUser(userId: string) {

    this.retosCollection = this.firestore.collection<Reto>('retos', ref => ref.where('RETADOR', '==', userId));
    this.retos = this.retosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reto;
        const $id = a.payload.doc.id;
        return { $id, ...data };
      }))
    );
    return this.retos;

  }

  /**
   * Actualiza el estado del reto: Activo <=> Inactivo
   * @param retoId Id del reto a Actualizar
   * @returns 
   */
  updateEstadoReto(retoId: string) {

    this.getRetosById(retoId).subscribe(reto => {
      this.reto = reto[0];
    });

    if (this.reto.ACTIVO == true) {
      this.reto.ACTIVO = false;

    } else {
      this.reto.ACTIVO = true;

    }

    return this.firestore.collection('retos').doc(retoId).update({
      ACTIVO: this.reto.ACTIVO
    });

  }

  /**
   * Método que comprueba si un reto está Activo o no
   * @param retoId Id del reto a revisar el estado
   * @returns 
   */
  async checkRetoActivo(retoId: string): Promise<boolean> {

    console.log('check', retoId);
    const doc = await this.firestore.collection('retos').doc(retoId).get().toPromise();
    return doc.exists && (doc.data() as Reto).ACTIVO;

  }

  /**
   * Método para crear un nuevo reto
   * @param reto Valores pasados desde el formulario
   */
  addReto(reto: Reto) {

    this.firestore.collection('retos').add({
      TITULO: reto.TITULO,
      DESCRIPCION: reto.DESCRIPCION,
      TIPO: reto.TIPO,
      NIVEL: reto.NIVEL,
      ACTIVO: reto.ACTIVO,
      DESTACADO: reto.DESTACADO,
      RETADOR: reto.RETADOR,
      IMAGEN: reto.IMAGEN,
      ID: ""

    })
      .then((docRef: any) => {
        this.firestore.doc(docRef).update({
          ID: docRef.id
        })
      })
      .catch((error: any) => {
        console.error('Error al crear el reto: ', error);
        this.avisosSvc.presentToast('No se ha podido crear el Reto', 'danger');
      });

  }

  /**
   * Método para eliminar un reto concreto
   * @param retoId Id del reto a eliminar
   */
  async deleteReto(retoId: string) {

    this.firestore.collection('retos').doc(retoId).delete()
      .then(() => {
        this.avisosSvc.presentToast('Reto eliminado correctamente', 'success');
      })
      .catch((error) => {
        this.avisosSvc.presentToast('No se ha podido eliminar el Reto', 'danger');
        console.error('Error al eliminar Reto: ', error);
      });

  }

  /**
   * Obtiene un Observable de los favoritos
   * @returns 
   */
  getFavoritos(): Observable<any[]> {

    return this.firestore.collection('favoritos').valueChanges({ idField: 'id' });

  }

  /**
   * Obtiene una lista de favoritos de un usuario concreto
   * @param userId Id del usuario para filtrar los favoritos
   * @returns 
   */
  getFavoritosByUser(userId: string) {

    this.favCollection = this.firestore.collection<Favorito>('favoritos', ref => ref.where('USER', '==', userId));
    this.retosFavoritos = this.favCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Favorito;
        const $id = a.payload.doc.id;
        return { $id, ...data };
      }))
    );
    return this.retosFavoritos;

  }

  /**
   * Comprueba si un usuario tiene un reto como Favorito
   * @param retoId Id del reto a comprobar
   * @param user Email del usuario a comprobar
   * @returns 
   */
  checkFavorito(retoId: string, user: string): Observable<boolean> {

    return this.firestore.collection('favoritos', ref => ref.where('ID_RETO', '==', retoId).where('USER', '==', user)).valueChanges().pipe(
      map(favoritos => favoritos.length > 0)
    );

  }

  /**
   * Obtiene los datos de un reto favorito concreto
   * @param retoId Reto a cargar
   * @param user email del usuario
   * @returns 
   */
  getFavorito(retoId: string, user: string) {

    this.favCollection = this.firestore.collection<Favorito>('favoritos', ref => ref.where('ID_RETO', '==', retoId).where('USER', '==', user));
    this.retosFavoritos = this.favCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Favorito;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.retosFavoritos;

  }

  /**
   * Añade un favorito al usaurio actual
   * @param retoId Id del reto
   * @param user email del usuario
   */
  addFavorito(retoId: string, user: string) {

    this.firestore.collection('favoritos').add({
      USER: user,
      ID_RETO: retoId,
      ID_FAV: ""
    })
      .then((docRef: any) => {
        this.firestore.doc(docRef).update({
          ID_FAV: docRef.id
        })
      })
      .catch((error: any) => {
        console.error('Error al agregar el Favorito: ', error);
      });

  }

  /**
   * Elimina un favorito de la lista
   * @param favId id del favorito
   */
  async deleteFavorito(favId: string) {

    this.firestore.collection('favoritos').doc(favId).delete()
      .then(() => {
        console.log('Favorito eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar Favorito: ', error);
      });

  }

  /**
   * Obtiene el nivel de dificultad de un reto concreto
   * @param retoId Id del reto
   * @returns 
   */
  getNivel(retoId): Observable<string> {

    return this.getRetosById(retoId).pipe(
      map(reto => reto[0].NIVEL)
    );

  }

  /**
   * Revisa si el reto ha sido conseguido por un usuario
   * @param retoId Id del reto
   * @param user email del usuario
   * @returns 
   */
  checkRetoConseguido(retoId: string, user: string): Observable<boolean> {

    console.log('buscando reto conseguido', retoId, 'del usuario', user);
    return this.firestore.collection('retosconseguidos', ref => ref.where('ID_RETO', '==', retoId).where('USER', '==', user)).valueChanges().pipe(
      map(favoritos => favoritos.length > 0)
    );

  }

  /**
   * Obtiene un listado de todos los retos conseguidos
   * @returns 
   */
  getRetosConseguidos(): Observable<any[]> {

    return this.firestore.collection('retosconseguidos').valueChanges({ idField: 'id' });

  }

  /**
   * Obtiene una lista de retos conseguidos por un usuario concreto
   * @param userId Id del Usuario
   * @returns 
   */
  getRetosConseguidosByUser(userId: string) {

    this.retosConseguidosCollection = this.firestore.collection<RetoConseguido>('retosconseguidos', ref => ref.where('USER', '==', userId));
    this.retosConseguidos = this.retosConseguidosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RetoConseguido;
        const $id = a.payload.doc.id;
        return { $id, ...data };
      }))
    );
    return this.retosConseguidos;

  }

  /**
   * Obtiene la informacion del reto conseguido
   * @param retoId Id del Reto
   * @param user Email del usuario
   * @returns 
   */
  getRetoConseguido(retoId: string, user: string) {

    this.retosConseguidosCollection = this.firestore.collection<RetoConseguido>('retosconseguidos', ref => ref.where('ID_RETO', '==', retoId).where('USER', '==', user));
    this.retosConseguidos = this.retosConseguidosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RetoConseguido;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.retosConseguidos;

  }

  /**
   * Crea una nueva entrada de reto conseguido. 
   * Dependiendo del nivel, obtiene los puntos para añadirlos a la tabla
   * @param retoId id del reto conseguido
   * @param user usuario que consigue el reto
   */
  addRetoConseguido(retoId: string, user: string) {

    this.getNivel(retoId).subscribe(nivel => {

      this.nivel = nivel;

      switch (this.nivel) {
        case 'facil':
          this.puntos = 1;
          break;

        case 'intermedio':
          this.puntos = 3;
          break;

        case 'dificil':
          this.puntos = 5;
          break;
      };

      this.firestore.collection('retosconseguidos').add({
        USER: user,
        ID_RETO: retoId,
        ID_RETO_CONSEGUIDO: '',
        PUNTOS: this.puntos
    }).then(async (docRef: any) => {
        await this.firestore.doc(docRef).update({
            ID_RETO_CONSEGUIDO: docRef.id
        })
    })
        .catch((error: any) => {
          console.error('Error al agregar el reto conseguido: ', error);
        });
    });
  }

  /**
   * Elimina un reto conseguido
   * @param retoId id del reto conseguido
   */
  async deleteRetoConseguido(retoId: string) {

    this.firestore.collection('retosconseguidos').doc(retoId).delete().then(() => {
      console.log("Documento eliminado correctamente");
    }).catch((error) => {
      console.error("Error al eliminar el documento: ", error);
    });

  }

}


