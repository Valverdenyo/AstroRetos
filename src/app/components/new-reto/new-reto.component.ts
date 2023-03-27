import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-reto',
  templateUrl: './new-reto.component.html',
  styleUrls: ['./new-reto.component.scss'],
})
export class NewRetoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cierreModal() {
    this.modalCtrl.dismiss();
  }

}
