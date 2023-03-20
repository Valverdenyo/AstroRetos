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
  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

    getRetoss(): Observable<any[]>{
      return this.firestore.collection('retos').valueChanges({ idField: 'id' });
    }
  
    getRetosActivos(){
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

  getRetosporId(id: string){
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

/*   getImagenUrl(token: string) {
    const ref = this.storage.ref(token);
    return ref.getDownloadURL();
  } */

  findFavoritosByUsuario(usuario: string) {
    this.retosFavoritos = this.firestore.collection<Favorito>('favoritos', ref => ref.where('ID_USUARIO', '==', usuario)).get()
    .pipe(
      map(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }

 
}
