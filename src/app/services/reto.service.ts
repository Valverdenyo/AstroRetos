import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Favorito, Reto } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RetoService {

  retosFavoritos: Observable<Favorito[]>;
  retoFavorito: Favorito;
  private retosCollection: AngularFirestoreCollection<Reto>;

  retos: Observable<Reto[]>;
  reto: Reto;

  private favCollection: AngularFirestoreCollection<any>;
  private usuarioDoc: AngularFirestoreDocument<any>;
  private usuarioFavoritosCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {

    //   this.favCollection = firestore.collection<any>('favoritos');
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


  getFavoritosByUserSub(idUser: string): Observable<Favorito[]> {

    return this.firestore
      .collection('usuarios')
      .doc(idUser)
      .collection<Favorito>('favoritos')
      .valueChanges();

  }

  getFavoritoByIdRetoSub(idReto: string, idUsuario: string): Observable<Favorito> {
    return this.firestore.collection('usuarios').doc(idUsuario).collection<Favorito>('favoritos', ref => ref.where('ID_RETO', '==', idReto)).snapshotChanges().pipe(
      map(actions => {
        if (actions.length > 0) {
          const data = actions[0].payload.doc.data() as Favorito;
          const id = actions[0].payload.doc.id;
          return { id, ...data };
        } else {
          return null;
        }
      })
    );
  }

  removeFavoritoSub(idFavorito: string, idUsuario: string) {
    console.log(`usuarios/${idUsuario}/favoritos/${idFavorito}`);

    this.firestore.doc(`usuarios/${idUsuario}/favoritos/${idFavorito}`).delete();

    /*  this.firestore.collection('usuarios').doc(idUsuario).collection('favoritos').doc(idFavorito).delete()
     .then(() => {
       console.log('Documento', idFavorito, 'eliminado correctamente');
     })
     .catch((error) => {
       console.error('Error al eliminar documento: ', error);
     }); */
  }

  getFavoritosByUser(): Observable<Favorito[]> {
    this.favCollection = this.firestore.collection<Favorito>('favoritos');
    this.retosFavoritos = this.favCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Favorito;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.retosFavoritos;

  }

}


