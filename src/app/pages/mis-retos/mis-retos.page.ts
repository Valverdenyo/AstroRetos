import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Reto, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MenuService } from '../../services/menu.service';
import { RetoService } from '../../services/reto.service';
import { AvisosService } from '../../services/avisos.service';
import { NewRetoComponent } from 'src/app/components/new-reto/new-reto.component';
import { InfoRetoComponent } from 'src/app/components/info-reto/info-reto.component';


@Component({
  selector: 'app-mis-retos',
  templateUrl: './mis-retos.page.html',
  styleUrls: ['./mis-retos.page.scss'],
})
export class MisRetosPage implements OnInit {

  /**
   * Variable para guardar el email del usuario logado
   */
  email: string;

  /**
   * Objeto para almacenar los datos del usuario logado y mostrar sus retos
   */
  usuario: Usuario;

  /**
   * array de objetos tipo Reto para guardarlos y mostrarlos
   */
  retos: Reto[] = [];

  /**
   * Constructor de Clase, asigna el menu correspondiente dependiendo del rol
   * @param menuSvc Servicio que prepara el menú
   * @param retoSvc Servicio para el manejo de los Retos
   * @param authSvc Servicio que se encarga de comprobar el usuario logado
   * @param userSvc Servicio que maneja al usuario logado para obtener el rol
   * @param avisosSvc Servicio de avisos a través del Toast
   * @param modalCtrl Controlador de carga del Modal de creación de reto.
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
   * Metodo de inicio.
   * Comprueba el usuario logado para el menú y carga sus retos.
   */
  ngOnInit() {
    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
      });
      this.retoSvc.getRetosByUser(email).subscribe(retos => {
        this.retos = retos;
      });
    });

  }

  /**
   * Carga el Modal con el formulario para crear un nuevo reto
   * @param userId Pasa como parámetro el id del usuario que creará el reto
   */
  async newReto(userId: string) {

    const modal = await this.modalCtrl.create({
      component: NewRetoComponent,
      componentProps: {
        userId
      },
      cssClass: 'modalInfo'
    });

    modal.present();

  }

  /**
   * Cambia el reto a activo/inactivo y muestra el aviso con el resultado.
   * @param retoId Id del reto a cambiar
   */
  cambiarEstado(retoId: string) {
    console.log('cambio Estado', retoId);
    try {
      this.retoSvc.updateEstadoReto(retoId);

      this.avisosSvc.presentToast('Cambio de Estado Correcto', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error en el cambio de Estado', 'danger');
    }
  }

/**
 * Elimina el reto seleccionado
 * @param retoId Id del reto a eliminar
 */
  deleteReto(retoId: string) {
    try {
      this.retoSvc.deleteReto(retoId);
      this.avisosSvc.presentToast('Reto eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el usuario', 'danger');
    }

  }

  /**
   * Carga el modal con la info detallada del reto
   * @param retoId Id del reto a mostrar
   */
  async verDetalle(retoId: string) {
    const modal = await this.modalCtrl.create({
      component: InfoRetoComponent,
      componentProps: {
        retoId
      },
      cssClass: 'modalInfo'
    });

    modal.present();
  }

}
