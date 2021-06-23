import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRootPage } from './modal-root.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRootPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRootPageRoutingModule {}
