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

  constructor(private userSvc: UserService,
    private avisosSvc: AvisosService,
    private retoSvc: RetoService) { }

  ngOnInit() {

    this.userSvc.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    this.retoSvc.getRetosActivos().subscribe(retos => {
      this.retos = retos;
    });
  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
  }

  setAdministrator(id: string) {

  }

  deleteUser(id: string) {

    try {
      this.userSvc.deleteUser(id);
      this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el uusuario', 'danger');

    }



  }

}
