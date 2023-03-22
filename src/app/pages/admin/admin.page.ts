import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Reto, Usuario } from '../../interfaces/interfaces';
import { AvisosService } from '../../services/avisos.service';
import { RetoService } from '../../services/reto.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  usuarios: Usuario[] = [];
  retos: Reto[] = [];
  segmento: string;
  retoActivo: string;

  constructor(private userSvc: UserService,
    private avisosSvc: AvisosService,
    private retoSvc: RetoService) { }

  ngOnInit() {

    this.userSvc.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    this.retoSvc.getRetos().subscribe(retos => {
      this.retos = retos;
    });
  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
  }

  cambiarRol(id: string) {
    console.log('cambio rol', id);
    try {
     this.userSvc.updateUserRol(id);
      this.avisosSvc.presentToast('Cambio de Rol Correcto', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error en el cambio de Rol', 'danger');
    }
  }

  deleteUser(id: string) {

    try {
      //   this.userSvc.deleteUser(id);
      this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el usuario', 'danger');
    }

  }

  iconoActivo(id: string) {
    console.log('reto', id);
    if (this.retoSvc.checkRetoActivo(id)) {
      this.retoActivo = 'arrow-down-outline';
      console.log('reto activo');
    } else {
      this.retoActivo = 'arrow-up-outline';
      console.log('reto inactivo');
    }
  }

}
