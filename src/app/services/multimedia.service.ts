import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

/**
 * Constructor de clase
 * @param fireStorage Servidcio de almacenamiento de archivos de Firebase
 */
  constructor(private fireStorage: AngularFireStorage) { }

  /**
   * Subida de la imagen a una ruta pasada por parametro
   * @param file archivo saneado que tiene que subir a Firestorage
   * @param path ruta en la que va a alojar el archivo
   * @param nombre nombre del archivo
   * @returns 
   */
  subirImagen(file: any, path: string, nombre: string): Promise<string> {

    return new Promise(resolve => {
      const filePath = path + '/' + nombre + Date.now();
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      )
        .subscribe()
    });

  }


}
