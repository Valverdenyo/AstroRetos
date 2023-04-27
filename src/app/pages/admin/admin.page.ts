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

  usuarios: Usuario[] = [];
  usuario: Usuario;
  retos: Reto[] = [];
  segmento: string;
  retoActivo: string;
  color: string;
  puntos: number;
  email: string;

  constructor(private userSvc: UserService,
    public menuSvc: MenuService,
    private authSvc: AuthService,
    private avisosSvc: AvisosService,
    private retoSvc: RetoService) { 

      this.menuSvc.setMenu();

    }

  ngOnInit() {

    this.authSvc.getUserEmail().then(email => {
      this.email = email;
      this.userSvc.getUserByEmail(email).subscribe(usuario => {
        this.usuario = usuario;
      });

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

  cambiarEstado(id: string) {
    console.log('cambio Estado', id);
    try {
     this.retoSvc.updateEstadoReto(id);
     
      this.avisosSvc.presentToast('Cambio de Estado Correcto', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error en el cambio de Estado', 'danger');
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

  deleteReto(id: string) {
    try {
         this.retoSvc.deleteReto(id);
      this.avisosSvc.presentToast('Usuario eliminado correctamente', 'success');
    } catch (error) {
      this.avisosSvc.presentToast('Error al eliminar el usuario', 'danger');
    }

  } 
}
