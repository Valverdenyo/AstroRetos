import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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

  puntos: number;

  private favCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {

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

  getRetosById(id: string): Observable<Reto[]> {
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

  getFavoritos(): Observable<any[]> {
    return this.firestore.collection('favoritos').valueChanges({ idField: 'id' });
  }

  getFavoritosByUser(id: string) {
    this.favCollection = this.firestore.collection<Favorito>('favoritos', ref => ref.where('USER', '==', id));
    this.retosFavoritos = this.favCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Favorito;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.retosFavoritos;

  }

  checkFavorito(idReto: string, user: string): Observable<boolean> {
    return this.firestore.collection<Favorito>('favoritos', ref =>
      ref.where('ID_RETO', '==', idReto).where('USER', '==', user)
    ).get().pipe(
      map(querySnapshot => !querySnapshot.empty)
    );
  }

  addFavorito(id: string, user: string) {
    this.firestore.collection('favoritos').add({
      USER: user,
      ID_RETO: id,
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

  async deleteFavorito(id: string) {
    this.firestore.collection('favoritos').doc(id).delete()
      .then(() => {
        console.log('Favorito eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar Favorito: ', error);
      });
  }

  addRetoConseguido(id: string, user: string) {
    let nivel = '';
    this.getRetosById(id).subscribe(reto => {
      nivel = reto[0].NIVEL;
    });
    
    let puntos = 0;
    switch (nivel) {
      case 'facil':
        puntos = 1;
      case 'intermedio':
        puntos = 3;
      case 'dificil':
        puntos = 5;
      default:
        puntos = 0;
    };
console.log(nivel, puntos);
    this.firestore.collection('retosconseguidos').add({
      USER: user,
      ID_RETO: id,
      ID_RETO_CONSEGUIDO: '',
      PUNTOS: puntos
    })
      .then((docRef: any) => {
        this.firestore.doc(docRef).update({
          ID_RETO_CONSEGUIDO: docRef.id
        })
      })
      .catch((error: any) => {
        console.error('Error al agregar el reto conseguido: ', error);
      });

  }

  puntosReto(nivel: string) {

    let puntos = 0;
    if (nivel == 'facil') {
      puntos = 1;
    } else if (nivel == 'intermedio') {
      puntos = 3;
    } else {
      puntos = 5;
    }
    console.log(puntos);
    return puntos;
  }

  async deleteRetoConseguido(id: string) {

  }




}


