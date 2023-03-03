import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisRetosPage } from './mis-retos.page';

const routes: Routes = [
  {
    path: '',
    component: MisRetosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisRetosPageRoutingModule {}
