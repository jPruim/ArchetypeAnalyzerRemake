import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRootPageRoutingModule } from './modal-root-routing.module';

import { ModalRootPage } from './modal-root.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRootPageRoutingModule
  ],
  declarations: [ModalRootPage]
})
export class ModalRootPageModule {}
