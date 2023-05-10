import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { InfoRetoComponent } from 'src/app/components/info-reto/info-reto.component';

import { Usuario, Reto, Favorito } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { AvisosService } from 'src/app/services/avisos.service';

import { MenuService } from 'src/app/services/menu.service';
import { RetoService } from 'src/app/services/reto.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  /**
   * Variable para almacenar el mail del usuario logado
   */
  public userEmail: string;

  /**
   * Id del usuario logado
   */
  idUser: string;

  /**
   * Para guardar el Id del Favorito
   */
  idFavorito: string;

  /**
   * Objeto tipo Usuario para cargar sus datos
   */
  usuario: Usuario;

  /**
   * Array de objetos de tipo Favorito
   */
  favoritos: Favorito[] = [];

  /**
   * Array de objetos de tipo Reto
   */
  retos: Reto[] = [];

  /**
   * Constructor de clase
   * Aqui cargamos el menu personalizado
   * @param menuSvc Servicio para personalizar el menu
   * @param retoSvc Servicio para el manejo de los retos
   * @param authSvc Servicio para gestionar la Autenticacion
   * @param userSvc Servicio para operaciones con el usuario
   * @param avisosSvc Servicio de avisos a traves de toast
   * @param modalCtrl Servicio que controla la carga de modales
   */
  constructor(public menuSvc: MenuService,
    private retoSvc: RetoService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private avisosSvc: AvisosService,
    private modalCtrl: ModalController) {

    this.menuSvc.setMenu();
  }

  /**
   * Metodo de inicio
   * Comprobamos el mail del usuario logado
   * Cargamos los favoritos de ese usuario
   * Almacenamos los retos por los ID de los favoritos
   */
  ngOnInit() {

    this.favoritos = [];

    this.authSvc.getUserEmail().then(email => {
      this.userEmail = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
        this.idUser = this.usuario.ID;
        console.log(this.usuario.NOMBRE);

      });

      this.retoSvc.getFavoritosByUser(this.userEmail).subscribe(favoritos => {
        this.favoritos = favoritos;
        console.log(this.favoritos.length);

      for (let index = 0; index < this.favoritos.length; index++) {
          this.retoSvc.getRetosById(this.favoritos[index].ID_RETO).subscribe(reto => {
            this.retos = [...this.retos, ...reto];
            console.log('reto', index, this.retos[index], this.favoritos[index]);
          });
        }


      });
    });

  }

  /**
   * Muestra el Modal con los detalles del reto
   * @param id Id del reto
   */
  async verDetalle(id: string) {

    const modal = await this.modalCtrl.create({
      component: InfoRetoComponent,
      componentProps: {
        id
      },
      cssClass: 'modalInfo'
    });

    modal.present();

  }

  /**
   * Quita el favorito de la lista
   * @param id Id del favorito
   */
  quitarFavorito(id: string) {

    try {
      this.retoSvc.deleteFavorito(id);
      console.log('eliminando reto', this.idFavorito, id);
      this.avisosSvc.presentToast('Favorito eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el Favorito', 'danger');
    }

  }

}
