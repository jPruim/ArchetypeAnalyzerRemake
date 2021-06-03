import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpPageRoutingModule } from './help-routing.module';

import { HelpPage } from './help.page';
import { HelpBoxesComponent } from 'src/app/components/help-boxes/help-boxes.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpPageRoutingModule,
  ],
  exports: [
    HelpBoxesComponent,
  ],
  declarations: [HelpPage, HelpBoxesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HelpPageModule {}
