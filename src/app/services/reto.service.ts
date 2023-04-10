import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Favorito, Reto, Usuario } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RetoService {

  //retosFavoritos: Observable<any[]>;
  private retosCollection: AngularFirestoreCollection<Reto>;
  retos: Observable<Reto[]>;
  reto: Reto;

  private favCollection: AngularFirestoreCollection<any>;
  private usuarioDoc: AngularFirestoreDocument<any>;
  private usuarioFavoritosCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {

    this.favCollection = firestore.collection<any>('favoritos');
  }

  getRetos(): Observable<any[]> {
    return this.firestore.collection('retos').valueChanges({ idField: 'id' });
  }

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

  getRetosById(id: string) {
    this.retosCollection = this.firestore.collection<Reto>('retos', ref => ref.where('ID', '==', id));
    this.retos = this.retosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.retos;
  }

  getRetosByUser(id: string) {
    this.retosCollection = this.firestore.collection<Reto>('retos', ref => ref.where('RETADOR', '==', id));
    this.retos = this.retosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.retos;
  }

  updateEstadoReto(id: string) {
    this.getRetosById(id).subscribe(reto => {
      this.reto = reto[0];
    });

    if (this.reto.ACTIVO == true) {
      this.reto.ACTIVO = false;

    } else {
      this.reto.ACTIVO = true;

    }

    return this.firestore.collection('retos').doc(id).update({
      ACTIVO: this.reto.ACTIVO
    });
  }


  async checkRetoActivo(id: string): Promise<boolean> {
    console.log('check', id);
    const doc = await this.firestore.collection('retos').doc(id).get().toPromise();
    return doc.exists && (doc.data() as Reto).ACTIVO;
  }

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
      });
  }

  async deleteReto(id: string) {
    this.firestore.collection('retos').doc(id).delete()
      .then(() => {
        console.log('Reto eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar Reto: ', error);
      });
  }



  /*    addFavorite(reto: any) {
       const email = 'usuario@example.com'; // Reemplaza esto por el email del usuario logueado
       const id_reto = reto.ID;
       this.firestore.collection<Favorito>('favoritos').add({ EMAIL_USUARIO: email, ID_RETO: id_reto });
     }*/

  removeFavorito(idFavorito: string, idUsuario: string): Promise<void> {
    // Obtener referencia al documento de usuario que contiene la subcolección de favoritos

    console.log('quitando favorito', idFavorito, 'del usuario', idUsuario);
    this.usuarioDoc = this.firestore.doc<any>(`usuarios/${idUsuario}`);

    // Obtener referencia al documento de favorito que se desea eliminar dentro de la subcolección
    this.usuarioFavoritosCollection = this.usuarioDoc.collection<any>('favoritos');
    const favoritoDoc = this.usuarioFavoritosCollection.doc<any>(idFavorito);

    // Llamar al método delete() en la referencia al documento de favorito
    return favoritoDoc.delete();
  }

  getFavoritosByUser(id: string): Observable<Favorito[]> {
    return this.firestore
      .collection('usuarios')
      .doc(id)
      .collection<Favorito>('favoritos')
      .valueChanges();
  }

  /*   getFavoritoByIdReto(idFav: string, idUsuario: string): Observable<any> {
         const userFavoritosRef = this.firestore.doc(`usuarios/${idUsuario}/favoritos`);
      return userFavoritosRef.valueChanges().pipe(
        map(favoritos => {
          const favoritoEncontrado = favoritos.find(f => f.ID_RETO=== idReto);
          console.log('Favorito encontrado:', favoritoEncontrado);
          return favoritoEncontrado;
        })
      );
    }
   */

}


