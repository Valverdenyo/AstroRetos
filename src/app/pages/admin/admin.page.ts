import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Reto, Usuario } from '../../interfaces/interfaces';
import { AvisosService } from '../../services/avisos.service';
import { RetoService } from '../../services/reto.service';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  /**
   * Array de objetos de tipo Usuario
   */
  usuarios: Usuario[] = [];

  /**
   * Objeto de tipo Usuario
   */
  usuario: Usuario;

  /**
   * Array de objetos de tipo Reto
   */
  retos: Reto[] = [];

  /**
   * Variable para manejar la pagina, que será por segmentos
   */
  segmento: string;

  /**
   * String para guardar si el reto está activo o no
   */
  retoActivo: string;

  /**
   * Variable para guardar los puntos de los usuarios
   */
  puntos: number;

  /**
   * Para guardar el mail del usuario logado
   */
  public userEmail: string;

  /**
   * Constructor de clase
   * @param userSvc Servicio para el manejo de datos de usuario
   * @param menuSvc Servicio para la personalización del Menu
   * @param authSvc Servicio para la gestion de la Autenticacion
   * @param avisosSvc Servicio para controlar avisos con el Toast
   * @param retoSvc Servicio para el manejo de los Retos
   */
  constructor(private userSvc: UserService,
    public menuSvc: MenuService,
    private authSvc: AuthService,
    private avisosSvc: AvisosService,
    private retoSvc: RetoService) {

    this.menuSvc.setMenu();

  }

  /**
   * Metodo de inicio
   * Comprueba el usuario logado para almacenar los datos de su perfil
   * Obtiene tambien la lista de todos los retos y usuarios para mostrarlos
   */
  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.userEmail = email;
      this.userSvc.getUserByEmail(this.userEmail).subscribe(usuario => {
        this.usuario = usuario;
      });

    });

    this.retoSvc.getRetos().subscribe(retos => {
      this.retos = retos;
    });

    this.userSvc.getUsers().subscribe(users => {
      this.usuarios = users;
    });

  }

  /**
   * Metodo que realiza el cambio de segmento al recibir un evento
   * @param event Evento (cambio de segmento)
   */
  segmentChanged(event: Event) {

    this.segmento = (event as CustomEvent).detail.value;

    this.retoSvc.getRetos().subscribe(retos => {
      this.retos = retos;
    });

  }

  /**
   * Método para cambiar el Rol de un usuario concreto Retador<=>Administrador
   * @param userId Id del usuario
   */
  cambiarRol(userId: string) {

    console.log('cambio rol', userId);
    try {
      this.userSvc.updateUserRol(userId);
      this.avisosSvc.presentToast('Cambio de Rol Correcto', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error en el cambio de Rol', 'danger');
    }

  }

  /**
   * Metodo que cambia el estado del reto: activo<=>inactivo
   * @param idReto Id del Reto
   */
  cambiarEstado(idReto: string) {

    console.log('cambio Estado', idReto);
    try {
      this.retoSvc.updateEstadoReto(idReto);

      this.avisosSvc.presentToast('Cambio de Estado Correcto', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error en el cambio de Estado', 'danger');
    }

  }

  /**
   * Metodo que elimina un usuaio
   * @param userId Ide del usuario a borrar
   */
  deleteUser(userId: string) {

    try {
      this.authSvc.deleteUser(userId);
      this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el usuario', 'danger');
    }

  }

  /**
   * Metodo que elimina un reto
   * @param idReto Id del Reto a eliminar
   */
  deleteReto(idReto: string) {

    try {
      this.retoSvc.deleteReto(idReto);
      this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el usuario', 'danger');
    }

  }

}
