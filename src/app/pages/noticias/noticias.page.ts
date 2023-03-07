import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  usuarioLogado: Usuario;
  constructor(private authSvc: AuthService) { }

  ngOnInit() {

   

this.usuarioLogado = this.authSvc.usuarioLogado;
console.log(this.usuarioLogado);
   
  }

}
