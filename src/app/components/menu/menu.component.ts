import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOpts } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input()  menuOpts: MenuOpts[];

  constructor(private router: Router) { }

  ngOnInit() {

  }

  navigateToPage(url: string) {
    this.router.navigate([url]);
  }

}
