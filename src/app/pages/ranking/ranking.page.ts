import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {


  usuarios: Usuario[] = [];

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.getUsuariosPorPuntos().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

  }

}
