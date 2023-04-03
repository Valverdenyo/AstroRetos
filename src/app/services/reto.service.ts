import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Favorito, Reto } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class RetoService {

  retosFavoritos: Observable<any[]>;
  private retosCollection: AngularFirestoreCollection<Reto>;
  retos: Observable<Reto[]>;
  reto: Reto;

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

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

  findFavoritosByUsuario(usuario: string) {
    this.retosFavoritos = this.firestore.collection<Favorito>('favoritos', ref => ref.where('ID_USUARIO', '==', usuario)).get()
      .pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => doc.data());
        })
      );
  }

  async checkRetoActivo(id: string): Promise<boolean> {
    console.log('check', id);
    const doc = await this.firestore.collection('retos').doc(id).get().toPromise();
    return doc.exists && (doc.data() as Reto).ACTIVO;
  }

  setReto(reto: Reto) {

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

    findFavorito(email: string, fav: string) {
      
    }

  }
